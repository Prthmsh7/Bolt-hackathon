import { WalletConnect } from './components/WalletConnect';
import { PitchForm } from './components/PitchForm';
import { useState } from 'react';
import './App.css';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleWalletConnection = (connected: boolean, address: string = '') => {
    setWalletConnected(connected);
    setWalletAddress(address);
  };

  return (
    <div className="app-container" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#F9FAFB'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#1F2937',
          marginBottom: '16px'
        }}>
          Bolt Startup Pitch Portal
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#4B5563',
          marginBottom: '24px'
        }}>
          Connect your wallet and submit your startup pitch to be stored on IPFS and minted as an NFT
        </p>
        
        <div style={{
          marginBottom: walletConnected ? '40px' : '0'
        }}>
          <WalletConnect onWalletConnection={handleWalletConnection} />
        </div>
      </header>

      {walletConnected && (
        <main>
          <PitchForm walletAddress={walletAddress} />
        </main>
      )}
    </div>
  );
}
