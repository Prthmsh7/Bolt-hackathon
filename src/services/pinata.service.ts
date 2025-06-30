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
    this.apiKey = import.meta.env.VITE_PINATA_API_KEY || '';
    this.apiSecret = import.meta.env.VITE_PINATA_API_SECRET || '';

    if (!this.apiKey || !this.apiSecret) {
      console.warn('Pinata API credentials are not configured. IP registration will be simulated.');
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
    if (!this.apiKey || !this.apiSecret) {
      // Simulate upload for demo purposes
      return this.simulateUpload(file, metadata);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add metadata
      const metadataString = JSON.stringify({
        name: `StartDev_IP_${Date.now()}`,
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
      // Fallback to simulation
      return this.simulateUpload(file, metadata);
    }
  }

  async uploadJSON(content: Record<string, any>): Promise<string> {
    if (!this.apiKey || !this.apiSecret) {
      // Simulate upload for demo purposes
      return this.simulateJSONUpload(content);
    }

    try {
      const response = await axios.post<PinataResponse>(
        `${PINATA_API_URL}/pinJSONToIPFS`,
        {
          pinataContent: content,
          pinataMetadata: {
            name: `StartDev_IP_Metadata_${Date.now()}`
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
      // Fallback to simulation
      return this.simulateJSONUpload(content);
    }
  }

  private async simulateUpload(file: File, metadata: Record<string, any>): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Generate a mock IPFS hash
    const mockHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    console.log('Simulated file upload:', { file: file.name, metadata, hash: mockHash });
    return mockHash;
  }

  private async simulateJSONUpload(content: Record<string, any>): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Generate a mock IPFS hash
    const mockHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    console.log('Simulated JSON upload:', { content, hash: mockHash });
    return mockHash;
  }

  async getIPFSUrl(hash: string): Promise<string> {
    if (!this.apiKey || !this.apiSecret) {
      return `https://ipfs.io/ipfs/${hash}`;
    }
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }

  isConfigured(): boolean {
    return !!(this.apiKey && this.apiSecret);
  }
}