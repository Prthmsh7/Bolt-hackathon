export interface PitchData {
  title: string;
  description: string;
  file?: File;
}

export interface WalletState {
  address: string;
  connected: boolean;
  type: 'MyAlgo' | 'Pera' | null;
}

export interface IPFSResponse {
  ipfsHash: string;
  timestamp: string;
} 