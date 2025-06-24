const { createClient } = require('@supabase/supabase-js');
const pinataSDK = require('@pinata/sdk');
const algosdk = require('algosdk');
const fs = require('fs');
require('dotenv').config();

class AuthService {
  constructor() {
    // Initialize Supabase client
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    // Initialize Pinata client
    this.pinata = new pinataSDK(
      process.env.PINATA_API_KEY,
      process.env.PINATA_API_SECRET
    );

    // Initialize Algorand client (TestNet)
    this.algodClient = new algosdk.Algodv2(
      '',  // No token needed for public nodes
      'https://testnet-api.algonode.cloud',
      443
    );
  }

  async uploadToIPFS(dataOrFile) {
    try {
      let result;
      
      if (typeof dataOrFile === 'string' && fs.existsSync(dataOrFile)) {
        // If it's a file path, upload the file
        const readableStreamForFile = fs.createReadStream(dataOrFile);
        result = await this.pinata.pinFileToIPFS(readableStreamForFile);
      } else if (Buffer.isBuffer(dataOrFile)) {
        // If it's a buffer (from multer), create a temp file and upload
        const tempPath = `temp-${Date.now()}.pdf`;
        fs.writeFileSync(tempPath, dataOrFile);
        const readableStreamForFile = fs.createReadStream(tempPath);
        result = await this.pinata.pinFileToIPFS(readableStreamForFile);
        // Clean up temp file
        fs.unlinkSync(tempPath);
      } else {
        // If it's JSON data, upload as JSON
        result = await this.pinata.pinJSONToIPFS(dataOrFile);
      }

      // Return IPFS gateway URL
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    } catch (error) {
      throw new Error(`Failed to upload to IPFS: ${error.message}`);
    }
  }

  async mintAlgorandNFT(ipfsUrl, walletAddress) {
    try {
      // Get suggested parameters
      const suggestedParams = await this.algodClient.getTransactionParams().do();

      // Create NFT metadata
      const metadata = {
        name: "Startup Pitch NFT",
        description: "This NFT represents a verified startup pitch",
        image: ipfsUrl,
        properties: {
          ipfsUrl,
          timestamp: new Date().toISOString()
        }
      };

      // Create ASA (Algorand Standard Asset) for NFT
      const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: walletAddress,
        total: 1,
        decimals: 0,
        assetName: `StartupPitch-${Date.now()}`,
        unitName: 'PITCH',
        assetURL: ipfsUrl,
        defaultFrozen: false,
        suggestedParams,
      });

      // Convert transaction to encoded object for wallet signing
      const encodedTxn = algosdk.encodeUnsignedTransaction(txn);
      
      // Return the encoded transaction for frontend wallet signing
      return {
        txn: encodedTxn,
        message: 'Please sign the transaction in your wallet'
      };
    } catch (error) {
      throw new Error(`Failed to prepare NFT minting: ${error.message}`);
    }
  }

  async saveToSupabase(userId, pitchId, ipfsUrl, nftTxHash) {
    try {
      const { data, error } = await this.supabase
        .from('startups')
        .insert([
          {
            user_id: userId,
            pitch_id: pitchId,
            ipfs_url: ipfsUrl,
            nft_tx_hash: nftTxHash,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Failed to save to Supabase: ${error.message}`);
    }
  }

  async registerStartup(startupData, pitchFile, walletAddress) {
    try {
      // 1. Upload pitch to IPFS via Pinata
      const ipfsUrl = await this.uploadToIPFS(pitchFile);

      // 2. Prepare NFT minting transaction
      const nftTxnData = await this.mintAlgorandNFT(ipfsUrl, walletAddress);

      // Return data for frontend to handle wallet signing
      return {
        success: true,
        data: {
          ipfsUrl,
          nftTxnData,
          startupData
        }
      };
    } catch (error) {
      console.error('Error registering startup:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Function to handle post-wallet-signing
  async finalizeRegistration(userId, pitchId, ipfsUrl, signedTxnResponse) {
    try {
      // Submit signed transaction
      const { txId } = await this.algodClient.sendRawTransaction(signedTxnResponse).do();
      await algosdk.waitForConfirmation(this.algodClient, txId, 4);

      // Save to Supabase
      await this.saveToSupabase(userId, pitchId, ipfsUrl, txId);

      return {
        success: true,
        data: {
          nftTxHash: txId
        }
      };
    } catch (error) {
      console.error('Error finalizing registration:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new AuthService(); 