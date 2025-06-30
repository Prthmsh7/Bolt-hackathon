import React, { useState, useEffect } from 'react';
import { 
  Mountain, 
  Code, 
  Globe, 
  Server, 
  BarChart3, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Zap, 
  ArrowRight, 
  Plus, 
  Users, 
  Activity, 
  Layers, 
  Send, 
  FileText, 
  Terminal, 
  Database
} from 'lucide-react';
import { 
  AvalancheService, 
  initializeAvalancheService, 
  CChainProject, 
  CrossChainProject, 
  CustomL1Chain, 
  AVALANCHE_CHAINS 
} from '../lib/avalanche';

interface AvalancheDashboardProps {
  onBack: () => void;
}

const AvalancheDashboard: React.FC<AvalancheDashboardProps> = ({ onBack }) => {
  const [avalancheService, setAvalancheService] = useState<AvalancheService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'c-chain' | 'cross-chain' | 'custom-l1'>('overview');
  
  // Avalanche data states
  const [cChainProjects, setCChainProjects] = useState<CChainProject[]>([]);
  const [crossChainProjects, setCrossChainProjects] = useState<CrossChainProject[]>([]);
  const [customL1Chains, setCustomL1Chains] = useState<CustomL1Chain[]>([]);
  
  // Form states
  const [tokenForm, setTokenForm] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    decimals: '18'
  });
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenResult, setTokenResult] = useState<any>(null);
  
  const [messageForm, setMessageForm] = useState({
    sourceChain: 'c-chain',
    destinationChain: 'dispatch',
    message: ''
  });
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageResult, setMessageResult] = useState<any>(null);
  
  const [customL1Form, setCustomL1Form] = useState({
    name: '',
    description: '',
    validatorCount: '5',
    blockTime: '1'
  });
  const [customL1Loading, setCustomL1Loading] = useState(false);
  const [customL1Result, setCustomL1Result] = useState<any>(null);

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setIsLoading(true);
      const service = await initializeAvalancheService();
      setAvalancheService(service);
      
      // Load initial data
      await loadAvalancheData(service);
      
    } catch (error) {
      console.error('Error initializing Avalanche services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvalancheData = async (service: AvalancheService) => {
    try {
      const [cChain, crossChain, customL1] = await Promise.all([
        service.getCChainProjects(),
        service.getCrossChainProjects(),
        service.getCustomL1Chains()
      ]);
      
      setCChainProjects(cChain);
      setCrossChainProjects(crossChain);
      setCustomL1Chains(customL1);
      
    } catch (error) {
      console.error('Error loading Avalanche data:', error);
    }
  };

  const refreshData = async () => {
    if (!avalancheService) return;
    await loadAvalancheData(avalancheService);
  };

  const handleDeployToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avalancheService || !tokenForm.name || !tokenForm.symbol || !tokenForm.totalSupply) return;
    
    try {
      setTokenLoading(true);
      setTokenResult(null);
      
      const result = await avalancheService.simulateDeployToken(
        tokenForm.name,
        tokenForm.symbol,
        parseInt(tokenForm.totalSupply),
        parseInt(tokenForm.decimals)
      );
      
      setTokenResult(result);
      
      if (result.status === 'confirmed') {
        // Reset form after successful deployment
        setTokenForm({
          name: '',
          symbol: '',
          totalSupply: '',
          decimals: '18'
        });
      }
    } catch (error) {
      console.error('Error deploying token:', error);
    } finally {
      setTokenLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avalancheService || !messageForm.message) return;
    
    try {
      setMessageLoading(true);
      setMessageResult(null);
      
      const result = await avalancheService.simulateCrossChainMessage(
        messageForm.sourceChain,
        messageForm.destinationChain,
        messageForm.message
      );
      
      setMessageResult(result);
      
      if (result.status !== 'failed') {
        // Reset form after successful message
        setMessageForm({
          ...messageForm,
          message: ''
        });
      }
    } catch (error) {
      console.error('Error sending cross-chain message:', error);
    } finally {
      setMessageLoading(false);
    }
  };

  const handleCreateCustomL1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avalancheService || !customL1Form.name || !customL1Form.description) return;
    
    try {
      setCustomL1Loading(true);
      setCustomL1Result(null);
      
      const result = await avalancheService.simulateCreateCustomL1(
        customL1Form.name,
        customL1Form.description,
        parseInt(customL1Form.validatorCount),
        parseFloat(customL1Form.blockTime)
      );
      
      setCustomL1Result(result);
      
      if (result.status === 'confirmed') {
        // Reset form after successful creation
        setCustomL1Form({
          name: '',
          description: '',
          validatorCount: '5',
          blockTime: '1'
        });
      }
    } catch (error) {
      console.error('Error creating custom L1:', error);
    } finally {
      setCustomL1Loading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Mountain size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing Avalanche Services</h2>
          <p className="text-text-secondary">Connecting to Avalanche network...</p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-accent rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Mountain size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Avalanche Integration</h1>
              <p className="text-text-secondary text-lg">High-performance blockchain development</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Code size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">C-Chain Projects</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {cChainProjects.length}
              </div>
              <div className="text-sm text-text-secondary">Single EVM chain apps</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Globe size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Cross-Chain dApps</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {crossChainProjects.length}
              </div>
              <div className="text-sm text-text-secondary">Multi-chain applications</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Server size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Custom L1 Chains</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {customL1Chains.length}
              </div>
              <div className="text-sm text-text-secondary">Custom Avalanche subnets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Avalanche Chains */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Layers size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Avalanche Chains</h2>
              <p className="text-text-secondary">Connected blockchain networks</p>
            </div>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(AVALANCHE_CHAINS).map((chain, index) => (
            <div key={index} className="bg-light-card rounded-xl p-6 border border-light-border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">{chain.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-lg">{chain.name}</h3>
                  <p className="text-text-secondary text-sm">Chain ID: {chain.chainId}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">RPC URL:</span>
                  <span className="font-medium text-text-primary truncate max-w-[180px]">{chain.rpcUrl}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Explorer:</span>
                  <a 
                    href={chain.explorer} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    View Explorer
                  </a>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-success text-sm">
                <CheckCircle size={14} />
                <span>Connected</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Development Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* C-Chain Track */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Code size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Single EVM Chain</h3>
              <p className="text-text-secondary text-sm">C-Chain development</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Projects:</span>
              <span className="font-medium">{cChainProjects.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Market Cap:</span>
              <span className="font-medium">{formatCurrency(cChainProjects.reduce((sum, project) => sum + project.marketCap, 0))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Active Users:</span>
              <span className="font-medium">{cChainProjects.reduce((sum, project) => sum + project.holders, 0).toLocaleString()}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('c-chain')}
            className="flex items-center space-x-2 text-primary font-medium"
          >
            <span>View C-Chain Projects</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Cross-Chain Track */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <Globe size={24} className="text-success" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Cross-Chain dApp</h3>
              <p className="text-text-secondary text-sm">Multi-chain development</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Projects:</span>
              <span className="font-medium">{crossChainProjects.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Messages Sent:</span>
              <span className="font-medium">{crossChainProjects.reduce((sum, project) => sum + project.messagesSent, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Active Users:</span>
              <span className="font-medium">{crossChainProjects.reduce((sum, project) => sum + project.activeUsers, 0).toLocaleString()}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('cross-chain')}
            className="flex items-center space-x-2 text-success font-medium"
          >
            <span>View Cross-Chain Projects</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Custom L1 Track */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Server size={24} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Custom L1 Chain</h3>
              <p className="text-text-secondary text-sm">Subnet development</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Custom Chains:</span>
              <span className="font-medium">{customL1Chains.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Validators:</span>
              <span className="font-medium">{customL1Chains.reduce((sum, chain) => sum + chain.validatorCount, 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Transactions:</span>
              <span className="font-medium">{customL1Chains.reduce((sum, chain) => sum + chain.transactionCount, 0).toLocaleString()}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('custom-l1')}
            className="flex items-center space-x-2 text-secondary font-medium"
          >
            <span>View Custom L1 Chains</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderCChain = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Code size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">C-Chain Development</h2>
              <p className="text-text-secondary">Single EVM chain applications on Avalanche</p>
            </div>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Token Deployment Form */}
        <div className="bg-light-card rounded-xl p-6 border border-light-border mb-8">
          <h3 className="font-bold text-text-primary mb-4">Deploy Token on C-Chain</h3>
          
          <form onSubmit={handleDeployToken} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Token Name
                </label>
                <input
                  type="text"
                  value={tokenForm.name}
                  onChange={(e) => setTokenForm({...tokenForm, name: e.target.value})}
                  placeholder="e.g., My Avalanche Token"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Token Symbol
                </label>
                <input
                  type="text"
                  value={tokenForm.symbol}
                  onChange={(e) => setTokenForm({...tokenForm, symbol: e.target.value})}
                  placeholder="e.g., MAT"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Total Supply
                </label>
                <input
                  type="number"
                  value={tokenForm.totalSupply}
                  onChange={(e) => setTokenForm({...tokenForm, totalSupply: e.target.value})}
                  placeholder="e.g., 1000000"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Decimals
                </label>
                <select
                  value={tokenForm.decimals}
                  onChange={(e) => setTokenForm({...tokenForm, decimals: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                >
                  <option value="6">6 (like USDC)</option>
                  <option value="8">8 (like WBTC)</option>
                  <option value="18">18 (like most ERC20 tokens)</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!tokenForm.name || !tokenForm.symbol || !tokenForm.totalSupply || tokenLoading}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {tokenLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Deploy Token</span>
                </>
              )}
            </button>
          </form>
          
          {tokenResult && (
            <div className={`mt-4 p-4 rounded-xl ${
              tokenResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {tokenResult.status === 'confirmed' ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  <AlertTriangle size={18} className="text-error" />
                )}
                <span className="font-medium">
                  {tokenResult.status === 'confirmed' ? 'Token Deployed Successfully' : 'Deployment Failed'}
                </span>
              </div>
              {tokenResult.status === 'confirmed' && (
                <div className="text-sm text-text-secondary">
                  <p>Transaction Hash: {tokenResult.txHash.slice(0, 10)}...{tokenResult.txHash.slice(-8)}</p>
                  <p>Token Address: {tokenResult.tokenAddress}</p>
                  <p>Deployment Cost: {tokenResult.deploymentCost.toFixed(4)} AVAX</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* C-Chain Projects */}
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Token</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Market Cap</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Holders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {cChainProjects.map((project, index) => (
                <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Code size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{project.name}</div>
                        <div className="text-xs text-text-muted">{project.creator.slice(0, 6)}...{project.creator.slice(-4)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{project.tokenSymbol}</div>
                    <div className="text-xs text-text-muted">{project.tokenAddress.slice(0, 6)}...{project.tokenAddress.slice(-4)}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary">{formatCurrency(project.marketCap)}</td>
                  <td className="px-6 py-4 text-text-secondary">{project.holders.toLocaleString()}</td>
                  <td className="px-6 py-4 text-text-muted">{formatDate(project.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCrossChain = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Cross-Chain Development</h2>
              <p className="text-text-secondary">Multi-chain applications on Avalanche</p>
            </div>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-success text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Cross-Chain Message Form */}
        <div className="bg-light-card rounded-xl p-6 border border-light-border mb-8">
          <h3 className="font-bold text-text-primary mb-4">Send Cross-Chain Message</h3>
          
          <form onSubmit={handleSendMessage} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Source Chain
                </label>
                <select
                  value={messageForm.sourceChain}
                  onChange={(e) => setMessageForm({...messageForm, sourceChain: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                >
                  <option value="c-chain">C-Chain</option>
                  <option value="dispatch">Dispatch</option>
                  <option value="echo">Echo</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Destination Chain
                </label>
                <select
                  value={messageForm.destinationChain}
                  onChange={(e) => setMessageForm({...messageForm, destinationChain: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                >
                  <option value="dispatch">Dispatch</option>
                  <option value="echo">Echo</option>
                  <option value="c-chain">C-Chain</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                  placeholder="Enter your cross-chain message..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary resize-none"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!messageForm.message || messageForm.sourceChain === messageForm.destinationChain || messageLoading}
              className="w-full py-3 bg-success text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {messageLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
          
          {messageResult && (
            <div className={`mt-4 p-4 rounded-xl ${
              messageResult.status !== 'failed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {messageResult.status !== 'failed' ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  <AlertTriangle size={18} className="text-error" />
                )}
                <span className="font-medium">
                  {messageResult.status !== 'failed' ? 'Message Sent Successfully' : 'Message Failed'}
                </span>
              </div>
              {messageResult.status !== 'failed' && (
                <div className="text-sm text-text-secondary">
                  <p>Message ID: {messageResult.messageId.slice(0, 10)}...{messageResult.messageId.slice(-8)}</p>
                  <p>Transaction Hash: {messageResult.txHash.slice(0, 10)}...{messageResult.txHash.slice(-8)}</p>
                  <p>Estimated Delivery Time: {messageResult.deliveryTime} seconds</p>
                  <p>Fee: {messageResult.fee.toFixed(4)} AVAX</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cross-Chain Projects */}
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Source Chain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Destinations</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Messages</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Tokens</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Users</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {crossChainProjects.map((project, index) => (
                <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Globe size={20} className="text-success" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{project.name}</div>
                        <div className="text-xs text-text-muted line-clamp-1">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{project.sourceChain}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.destinationChains.map((chain, i) => (
                        <span key={i} className="px-2 py-1 bg-success/10 text-success rounded-lg text-xs font-medium">
                          {chain}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Send size={14} className="text-success" />
                      <span>{project.messagesSent.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-text-muted mt-1">
                      <Send size={12} className="rotate-180" />
                      <span>{project.messagesReceived.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary">{project.tokensTransferred.toLocaleString()}</td>
                  <td className="px-6 py-4 text-text-secondary">{project.activeUsers.toLocaleString()}</td>
                  <td className="px-6 py-4 text-text-muted">{formatDate(project.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCustomL1 = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <Server size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Custom L1 Development</h2>
              <p className="text-text-secondary">Create your own Avalanche subnet</p>
            </div>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Create Custom L1 Form */}
        <div className="bg-light-card rounded-xl p-6 border border-light-border mb-8">
          <h3 className="font-bold text-text-primary mb-4">Create Custom L1 Chain</h3>
          
          <form onSubmit={handleCreateCustomL1} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Chain Name
                </label>
                <input
                  type="text"
                  value={customL1Form.name}
                  onChange={(e) => setCustomL1Form({...customL1Form, name: e.target.value})}
                  placeholder="e.g., GameChain"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Validator Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={customL1Form.validatorCount}
                  onChange={(e) => setCustomL1Form({...customL1Form, validatorCount: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Block Time (seconds)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={customL1Form.blockTime}
                  onChange={(e) => setCustomL1Form({...customL1Form, blockTime: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Description
                </label>
                <textarea
                  value={customL1Form.description}
                  onChange={(e) => setCustomL1Form({...customL1Form, description: e.target.value})}
                  placeholder="Describe the purpose and features of your custom L1 chain..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary resize-none"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!customL1Form.name || !customL1Form.description || customL1Loading}
              className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {customL1Loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Server size={18} />
                  <span>Create Custom L1</span>
                </>
              )}
            </button>
          </form>
          
          {customL1Result && (
            <div className={`mt-4 p-4 rounded-xl ${
              customL1Result.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {customL1Result.status === 'confirmed' ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  <AlertTriangle size={18} className="text-error" />
                )}
                <span className="font-medium">
                  {customL1Result.status === 'confirmed' ? 'Custom L1 Created Successfully' : 'Creation Failed'}
                </span>
              </div>
              {customL1Result.status === 'confirmed' && (
                <div className="text-sm text-text-secondary">
                  <p>Transaction Hash: {customL1Result.txHash.slice(0, 10)}...{customL1Result.txHash.slice(-8)}</p>
                  <p>Chain ID: {customL1Result.chainId}</p>
                  <p>Deployment Cost: {customL1Result.deploymentCost.toFixed(4)} AVAX</p>
                  <p>Estimated Launch: {new Date(customL1Result.estimatedLaunchTime).toLocaleString()}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Custom L1 Chains */}
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Chain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Validators</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Block Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Transactions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Users</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {customL1Chains.map((chain, index) => (
                <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Server size={20} className="text-secondary" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{chain.name}</div>
                        <div className="text-xs text-text-muted">{chain.creator.slice(0, 6)}...{chain.creator.slice(-4)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary line-clamp-2 max-w-[200px]">{chain.description}</td>
                  <td className="px-6 py-4 text-text-secondary">{chain.validatorCount}</td>
                  <td className="px-6 py-4 text-text-secondary">{chain.blockTime}s</td>
                  <td className="px-6 py-4 text-text-secondary">{chain.transactionCount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-text-secondary">{chain.activeUsers.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      chain.status === 'active' ? 'bg-success/20 text-success' :
                      chain.status === 'pending' ? 'bg-warning/20 text-warning' :
                      'bg-error/20 text-error'
                    }`}>
                      {chain.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

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
                  <Mountain size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Avalanche Integration</h1>
                  <p className="text-text-secondary text-lg">High-performance blockchain development</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Avalanche Connected</span>
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
              { id: 'c-chain', label: 'C-Chain', icon: Code },
              { id: 'cross-chain', label: 'Cross-Chain', icon: Globe },
              { id: 'custom-l1', label: 'Custom L1', icon: Server }
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
        {activeTab === 'c-chain' && renderCChain()}
        {activeTab === 'cross-chain' && renderCrossChain()}
        {activeTab === 'custom-l1' && renderCustomL1()}
      </div>
    </div>
  );
};

export default AvalancheDashboard;