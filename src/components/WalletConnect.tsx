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

  if (error) {
    return (
      <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl">
        <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }

  if (address) {
    return (
      <div className="bg-white rounded-xl border border-light-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
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
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-300"
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
          Connect your Algorand wallet to register your intellectual property on the blockchain.
        </p>
        <button
          onClick={connectWallet}
          disabled={connecting}
          className="w-full py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
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
        <p className="text-text-muted text-xs mt-3">
          Make sure you have Pera Wallet installed and set up
        </p>
      </div>
    </div>
  );
}