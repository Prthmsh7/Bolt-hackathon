import { useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { Wallet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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

  const simulateWallet = () => {
    // For demo purposes, generate a fake Algorand address
    const fakeAddress = 'ALGO' + Array.from({length: 54}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setAddress(fakeAddress);
    onWalletConnection(true, fakeAddress);
  };

  if (error) {
    return (
      <div className="flex items-center space-x-2 p-4 bg-error/10 border border-error/20 rounded-xl">
        <AlertCircle size={20} className="text-error flex-shrink-0" />
        <div>
          <p className="text-error text-sm font-medium">{error}</p>
          <p className="text-error/80 text-xs mt-1">
            You can use the demo wallet for testing purposes.
          </p>
          <button
            onClick={simulateWallet}
            className="mt-2 px-3 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-primary/90 transition-colors"
          >
            Use Demo Wallet
          </button>
        </div>
      </div>
    );
  }

  if (address) {
    return (
      <div className="bg-white rounded-xl border border-light-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
              <CheckCircle size={20} className="text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Wallet Connected</h3>
              <p className="text-text-secondary text-sm">
                {address.slice(0, 6)}...{address.slice(-6)}
              </p>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 text-sm font-medium text-error hover:text-error bg-error/10 hover:bg-error/20 rounded-lg transition-all duration-300"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-light-border p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Wallet size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Connect Your Wallet</h3>
        <p className="text-text-secondary mb-6">
          Connect your Algorand wallet to invest in projects and protect your intellectual property.
        </p>
        <div className="space-y-3">
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="w-full py-3 bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            {connecting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Wallet size={20} />
                <span>Connect Pera Wallet</span>
              </>
            )}
          </button>
          
          <button
            onClick={simulateWallet}
            className="w-full py-3 bg-white border border-primary text-primary rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Wallet size={20} />
            <span>Use Demo Wallet</span>
          </button>
        </div>
        <p className="text-text-muted text-xs mt-3">
          No wallet? Use the demo option for testing
        </p>
      </div>
    </div>
  );
}