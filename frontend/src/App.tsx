import { WalletConnect } from './components/WalletConnect';
import { PitchForm } from './components/PitchForm';
import { useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { user, loading, signOut } = useAuth();

  const handleWalletConnection = (connected: boolean, address: string = '') => {
    setWalletConnected(connected);
    setWalletAddress(address);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Auth />;
  }

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
        <div style={{ marginBottom: user ? '16px' : '0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#4B5563', fontWeight: 500 }}>{user.email}</span>
          <button onClick={signOut} style={{ padding: '6px 16px', background: '#E53E3E', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Sign Out</button>
        </div>
        <div style={{ marginBottom: walletConnected ? '40px' : '0' }}>
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
