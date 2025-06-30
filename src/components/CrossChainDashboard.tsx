import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Link, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Zap, 
  BarChart3, 
  Layers, 
  Wallet, 
  Send, 
  ArrowRightLeft, 
  Coins, 
  DollarSign, 
  Percent, 
  Users, 
  Activity
} from 'lucide-react';

interface CrossChainDashboardProps {
  onBack: () => void;
}

const CrossChainDashboard: React.FC<CrossChainDashboardProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'liquidity' | 'nft-bridge'>('overview');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-accent rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Globe size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Cross-Chain Integration</h1>
              <p className="text-text-secondary text-lg">Seamless interoperability across blockchains</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Send size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Transactions</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                24
              </div>
              <div className="text-sm text-text-secondary">Cross-chain messages</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Coins size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Liquidity</span>
              </div>
              <div className="text-2xl font-bold text-success">
                $12.5M
              </div>
              <div className="text-sm text-text-secondary">Total locked value</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Layers size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">NFT Bridge</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                12,500
              </div>
              <div className="text-sm text-text-secondary">Total NFTs bridged</div>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Chains */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Link size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Supported Chains</h2>
              <p className="text-text-secondary">Connected blockchain networks</p>
            </div>
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche'].map((chain, index) => (
            <div key={index} className="bg-light-card rounded-xl p-6 border border-light-border text-center">
              <div className="text-3xl mb-3">
                {index === 0 ? '🔷' : 
                 index === 1 ? '🟣' : 
                 index === 2 ? '🔵' : 
                 index === 3 ? '🔴' : 
                 '❄️'}
              </div>
              <h3 className="font-bold text-text-primary mb-1">{chain}</h3>
              <p className="text-text-muted text-sm">Chain ID: {index + 1}</p>
              <div className="mt-3 flex items-center justify-center space-x-2 text-success text-sm">
                <CheckCircle size={14} />
                <span>Connected</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Chain Transfer */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
            <ArrowRightLeft size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Cross-Chain Transfer</h2>
            <p className="text-text-secondary">Send tokens across different blockchains</p>
          </div>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Source Chain
              </label>
              <select
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
              >
                <option value="ethereum">🔷 Ethereum</option>
                <option value="polygon">🟣 Polygon</option>
                <option value="arbitrum">🔵 Arbitrum</option>
                <option value="optimism">🔴 Optimism</option>
                <option value="avalanche">❄️ Avalanche</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Destination Chain
              </label>
              <select
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
              >
                <option value="polygon">🟣 Polygon</option>
                <option value="ethereum">🔷 Ethereum</option>
                <option value="arbitrum">🔵 Arbitrum</option>
                <option value="optimism">🔴 Optimism</option>
                <option value="avalanche">❄️ Avalanche</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Token
              </label>
              <select
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="LINK">LINK</option>
                <option value="AVAX">AVAX</option>
                <option value="MATIC">MATIC</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Amount
              </label>
              <input
                type="number"
                placeholder="0.0"
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Receiver Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-text-secondary mb-6">
            <div>Estimated Fee: 0.015 ETH</div>
            <div>Estimated Time: 20 minutes</div>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Send size={18} />
            <span>Send USDC to Polygon</span>
          </button>
        </form>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Recent Transactions</h2>
              <p className="text-text-secondary">Latest cross-chain activity</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('transactions')}
            className="flex items-center space-x-2 text-primary font-medium"
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Source</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Destination</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Token</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {[
                { source: 'Ethereum', destination: 'Polygon', amount: 1000, token: 'USDC', status: 'completed', time: '10:30 AM' },
                { source: 'Polygon', destination: 'Arbitrum', amount: 500, token: 'LINK', status: 'completed', time: '9:15 AM' },
                { source: 'Avalanche', destination: 'Ethereum', amount: 250, token: 'AVAX', status: 'pending', time: '8:45 AM' },
                { source: 'Arbitrum', destination: 'Optimism', amount: 750, token: 'ETH', status: 'failed', time: '7:20 AM' },
                { source: 'Ethereum', destination: 'Avalanche', amount: 1500, token: 'USDC', status: 'completed', time: 'Yesterday' }
              ].map((tx, index) => (
                <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {tx.source === 'Ethereum' ? '🔷' : 
                         tx.source === 'Polygon' ? '🟣' : 
                         tx.source === 'Arbitrum' ? '🔵' : 
                         tx.source === 'Optimism' ? '🔴' : 
                         '❄️'}
                      </span>
                      <span className="font-medium text-text-primary">{tx.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {tx.destination === 'Ethereum' ? '🔷' : 
                         tx.destination === 'Polygon' ? '🟣' : 
                         tx.destination === 'Arbitrum' ? '🔵' : 
                         tx.destination === 'Optimism' ? '🔴' : 
                         '❄️'}
                      </span>
                      <span className="font-medium text-text-primary">{tx.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary">{tx.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-text-secondary">{tx.token}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'completed' ? 'bg-success/20 text-success' :
                      tx.status === 'pending' ? 'bg-warning/20 text-warning' :
                      'bg-error/20 text-error'
                    }`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted text-sm">
                    {tx.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Globe size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing Cross-Chain Services</h2>
          <p className="text-text-secondary">Connecting to multiple blockchains...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-light-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ←
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Cross-Chain Integration</h1>
                  <p className="text-text-secondary text-lg">Seamless interoperability across blockchains</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">5 Chains Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'transactions', label: 'Transactions', icon: Send },
              { id: 'liquidity', label: 'Liquidity', icon: Coins },
              { id: 'nft-bridge', label: 'NFT Bridge', icon: Layers }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-base transition-colors duration-300 ${
                  activeTab === tab.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'transactions' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Send size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Transactions View Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a detailed transactions view to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'liquidity' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Coins size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Liquidity Pools Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing cross-chain liquidity pools to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'nft-bridge' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Layers size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">NFT Bridge Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a cross-chain NFT bridge to the platform. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrossChainDashboard;