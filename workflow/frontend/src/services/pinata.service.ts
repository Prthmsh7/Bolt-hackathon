import axios from 'axios';

const PINATA_API_URL = 'https://api.pinata.cloud/pinning';

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export class PinataService {
  private apiKey: string;
  private apiSecret: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_PINATA_API_KEY as string;
    this.apiSecret = import.meta.env.VITE_PINATA_API_SECRET as string;

    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Pinata API credentials are not configured');
    }
  }

  private getHeaders() {
    return {
      headers: {
        'pinata_api_key': this.apiKey,
        'pinata_secret_api_key': this.apiSecret,
      }
    };
  }

  async uploadFile(file: File, metadata: Record<string, any>): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add metadata
      const metadataString = JSON.stringify({
        name: `Bolt_Pitch_${Date.now()}`,
        keyvalues: {
          ...metadata,
          timestamp: new Date().toISOString(),
        }
      });
      formData.append('pinataMetadata', metadataString);

      // Add options for better IPFS storage
      const options = JSON.stringify({
        cidVersion: 1,
        wrapWithDirectory: false
      });
      formData.append('pinataOptions', options);

      const response = await axios.post<PinataResponse>(
        `${PINATA_API_URL}/pinFileToIPFS`,
        formData,
        {
          ...this.getHeaders(),
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        }
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  async uploadJSON(content: Record<string, any>): Promise<string> {
    try {
      const response = await axios.post<PinataResponse>(
        `${PINATA_API_URL}/pinJSONToIPFS`,
        {
          pinataContent: content,
          pinataMetadata: {
            name: `Bolt_Pitch_Metadata_${Date.now()}`
          },
          pinataOptions: {
            cidVersion: 1
          }
        },
        this.getHeaders()
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading JSON to Pinata:', error);
      throw new Error('Failed to upload metadata to IPFS');
    }
  }

  async getIPFSUrl(hash: string): Promise<string> {
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }
} 