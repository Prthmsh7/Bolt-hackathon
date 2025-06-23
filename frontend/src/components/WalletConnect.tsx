import { useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';

const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true
});

interface WalletConnectProps {
  onWalletConnection: (connected: boolean, address?: string) => void;
}

export function WalletConnect({ onWalletConnection }: WalletConnectProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reconnect to Pera wallet if previously connected
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        onWalletConnection(true, accounts[0]);
      }
    }).catch(console.error);

    return () => {
      peraWallet.disconnect();
    };
  }, [onWalletConnection]);

  const connectWallet = async () => {
    try {
      setConnecting(true);
      setError(null);

      const accounts = await peraWallet.connect();
      setAddress(accounts[0]);
      onWalletConnection(true, accounts[0]);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet. Please make sure you have Pera Wallet installed.');
      onWalletConnection(false);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await peraWallet.disconnect();
      setAddress(null);
      onWalletConnection(false);
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
      setError('Failed to disconnect wallet');
    }
  };

  if (error) {
    return (
      <div style={{ color: 'red', marginBottom: '1rem' }}>
        {error}
      </div>
    );
  }

  if (address) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        justifyContent: 'center'
      }}>
        <span style={{ 
          backgroundColor: '#E0E7FF', 
          padding: '8px 16px', 
          borderRadius: '20px',
          color: '#4F46E5',
          fontSize: '0.9rem'
        }}>
          Connected: {address.slice(0, 4)}...{address.slice(-4)}
        </span>
        <button
          onClick={disconnectWallet}
          style={{
            padding: '8px 16px',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={connecting}
      style={{
        padding: '12px 24px',
        backgroundColor: connecting ? '#9CA3AF' : '#4F46E5',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        cursor: connecting ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'all 0.2s ease'
      }}
    >
      {connecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
} 