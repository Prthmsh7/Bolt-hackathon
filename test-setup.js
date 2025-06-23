require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const pinataSDK = require('@pinata/sdk');
const algosdk = require('algosdk');

async function testConnections() {
  try {
    // Test Supabase Connection
    console.log('Testing Supabase connection...');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
    
    // Test Supabase by inserting and reading a test record
    const { data: testData, error: testError } = await supabase
      .from('startups')
      .insert([
        {
          user_id: 'test-user',
          name: 'Test Startup',
          description: 'Test Description',
          ipfs_url: 'test-ipfs-url',
          nft_tx_hash: 'test-tx-hash'
        }
      ])
      .select();
    
    if (testError) {
      console.error('Error testing Supabase:', testError);
    } else {
      console.log('✅ Supabase connection successful');
      // Clean up test data
      await supabase
        .from('startups')
        .delete()
        .match({ user_id: 'test-user' });
    }

    // Test Pinata Connection
    console.log('\nTesting Pinata connection...');
    const pinata = new pinataSDK(
      process.env.PINATA_API_KEY,
      process.env.PINATA_API_SECRET
    );
    
    const testPinData = {
      test: 'Hello Pinata!'
    };
    
    const result = await pinata.pinJSONToIPFS(testPinData);
    console.log('✅ Pinata test successful, IPFS hash:', result.IpfsHash);

    // Test Algorand Connection
    console.log('\nTesting Algorand connection...');
    
    // Validate ALGOD_SERVER URL before using it
    const algodServer = process.env.ALGOD_SERVER || 'http://localhost';
    const algodPort = process.env.ALGOD_PORT || '4001';
    const algodToken = process.env.ALGOD_TOKEN || '';
    
    // Ensure the server URL is properly formatted
    let serverUrl;
    try {
      serverUrl = new URL(algodServer);
      console.log('Using Algorand server:', serverUrl.toString());
    } catch (urlError) {
      console.error('Invalid ALGOD_SERVER URL format:', algodServer);
      console.log('Please ensure ALGOD_SERVER is set to a valid URL (e.g., http://localhost or https://testnet-api.algonode.cloud)');
      return;
    }
    
    const algodClient = new algosdk.Algodv2(
      algodToken,
      algodServer,
      algodPort
    );

    const status = await algodClient.status().do();
    console.log('✅ Algorand connection successful, last round:', status['last-round']);

  } catch (error) {
    console.error('Error during testing:', error);
    
    // Provide helpful error messages for common issues
    if (error.code === 'ERR_INVALID_URL') {
      console.log('\n💡 Tip: Check your .env file and ensure ALGOD_SERVER is set to a valid URL');
      console.log('Examples:');
      console.log('  - For local node: ALGOD_SERVER=http://localhost');
      console.log('  - For testnet: ALGOD_SERVER=https://testnet-api.algonode.cloud');
    }
  }
}

testConnections();