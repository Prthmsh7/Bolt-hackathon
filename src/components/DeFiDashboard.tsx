import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Zap, 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  PieChart, 
  Percent, 
  Wallet, 
  Repeat, 
  Layers, 
  Send, 
  Plus, 
  Users, 
  Target, 
  Landmark, 
  CreditCard,
  Sparkles,
  Flame
} from 'lucide-react';
import { 
  DeFiService, 
  initializeDeFiService, 
  LendingPoolData, 
  DEXLiquidityData, 
  YieldStrategy, 
  DerivativesData 
} from '../lib/defi';

interface DeFiDashboardProps {
  onBack: () => void;
}

const DeFiDashboard: React.FC<DeFiDashboardProps> = ({ onBack }) => {
  const [defiService, setDefiService] = useState<DeFiService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'lending' | 'dex' | 'yield' | 'derivatives'>('overview');
  
  // DeFi data states
  const [lendingPoolData, setLendingPoolData] = useState<LendingPoolData | null>(null);
  const [dexLiquidityData, setDexLiquidityData] = useState<DEXLiquidityData | null>(null);
  const [yieldStrategies, setYieldStrategies] = useState<YieldStrategy[]>([]);
  const [derivativesData, setDerivativesData] = useState<DerivativesData | null>(null);
  
  // Form states
  const [depositForm, setDepositForm] = useState({
    asset: 'ETH',
    amount: ''
  });
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositResult, setDepositResult] = useState<any>(null);
  
  const [swapForm, setSwapForm] = useState({
    fromToken: 'ETH',
    toToken: 'USDC',
    amount: ''
  });
  const [swapLoading, setSwapLoading] = useState(false);
  const [swapResult, setSwapResult] = useState<any>(null);
  
  const [yieldForm, setYieldForm] = useState({
    strategy: '',
    amount: ''
  });
  const [yieldLoading, setYieldLoading] = useState(false);
  const [yieldResult, setYieldResult] = useState<any>(null);
  
  const [perpForm, setPerpForm] = useState({
    market: 'ETH-PERP',
    size: '',
    isLong: true,
    leverage: '1'
  });
  const [perpLoading, setPerpLoading] = useState(false);
  const [perpResult, setPerpResult] = useState<any>(null);

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setIsLoading(true);
      const service = await initializeDeFiService();
      setDefiService(service);
      
      // Load initial data
      await loadDeFiData(service);
      
    } catch (error) {
      console.error('Error initializing DeFi services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDeFiData = async (service: DeFiService) => {
    try {
      const [lendingData, dexData, yieldData, derivativesData] = await Promise.all([
        service.getLendingPoolData(),
        service.getDEXLiquidity(),
        service.getYieldStrategies(),
        service.getDerivativesData()
      ]);
      
      setLendingPoolData(lendingData);
      setDexLiquidityData(dexData);
      setYieldStrategies(yieldData);
      setDerivativesData(derivativesData);
      
      // Set default yield strategy if available
      if (yieldData.length > 0 && !yieldForm.strategy) {
        setYieldForm({...yieldForm, strategy: yieldData[0].name});
      }
      
    } catch (error) {
      console.error('Error loading DeFi data:', error);
    }
  };

  const refreshData = async () => {
    if (!defiService) return;
    await loadDeFiData(defiService);
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!defiService || !depositForm.amount || parseFloat(depositForm.amount) <= 0) return;
    
    try {
      setDepositLoading(true);
      setDepositResult(null);
      
      const result = await defiService.simulateDeposit(
        depositForm.asset,
        parseFloat(depositForm.amount)
      );
      
      setDepositResult(result);
    } catch (error) {
      console.error('Error making deposit:', error);
    } finally {
      setDepositLoading(false);
    }
  };

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!defiService || !swapForm.amount || parseFloat(swapForm.amount) <= 0) return;
    
    try {
      setSwapLoading(true);
      setSwapResult(null);
      
      const result = await defiService.simulateSwap(
        swapForm.fromToken,
        swapForm.toToken,
        parseFloat(swapForm.amount)
      );
      
      setSwapResult(result);
    } catch (error) {
      console.error('Error making swap:', error);
    } finally {
      setSwapLoading(false);
    }
  };

  const handleYieldInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!defiService || !yieldForm.strategy || !yieldForm.amount || parseFloat(yieldForm.amount) <= 0) return;
    
    try {
      setYieldLoading(true);
      setYieldResult(null);
      
      const result = await defiService.simulateYieldInvestment(
        yieldForm.strategy,
        parseFloat(yieldForm.amount)
      );
      
      setYieldResult(result);
    } catch (error) {
      console.error('Error making yield investment:', error);
    } finally {
      setYieldLoading(false);
    }
  };

  const handleOpenPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!defiService || !perpForm.size || parseFloat(perpForm.size) <= 0) return;
    
    try {
      setPerpLoading(true);
      setPerpResult(null);
      
      const result = await defiService.simulateOpenPosition(
        perpForm.market,
        parseFloat(perpForm.size),
        perpForm.isLong,
        parseFloat(perpForm.leverage)
      );
      
      setPerpResult(result);
    } catch (error) {
      console.error('Error opening position:', error);
    } finally {
      setPerpLoading(false);
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Coins size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing DeFi Services</h2>
          <p className="text-text-secondary">Connecting to protocols...</p>
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
              <Coins size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">DeFi Integration</h1>
              <p className="text-text-secondary text-lg">Decentralized finance protocols and services</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Landmark size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Lending</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {lendingPoolData ? formatCurrency(lendingPoolData.totalSupplied) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total supplied</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Repeat size={20} className="text-success" />
                <span className="font-semibold text-text-primary">DEX</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {dexLiquidityData ? formatCurrency(dexLiquidityData.totalLiquidity) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total liquidity</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Zap size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Yield</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {yieldStrategies.length > 0 ? formatPercentage(Math.max(...yieldStrategies.map(s => s.apy))) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Best APY</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Activity size={20} className="text-error" />
                <span className="font-semibold text-text-primary">Derivatives</span>
              </div>
              <div className="text-2xl font-bold text-error">
                {derivativesData ? formatCurrency(derivativesData.openInterest) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Open interest</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lending & Borrowing */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Landmark size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Lending & Borrowing</h2>
              <p className="text-text-secondary">Earn interest on deposits or take out loans</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('lending')}
            className="flex items-center space-x-2 text-primary font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {lendingPoolData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Supply Markets</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <DollarSign size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">USDC</div>
                      <div className="text-xs text-text-muted">USD Coin</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-text-primary">{formatPercentage(lendingPoolData.supplyAPY + 0.4)}</div>
                    <div className="text-xs text-text-muted">APY</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Coins size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">ETH</div>
                      <div className="text-xs text-text-muted">Ethereum</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-text-primary">{formatPercentage(lendingPoolData.supplyAPY)}</div>
                    <div className="text-xs text-text-muted">APY</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Coins size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">WBTC</div>
                      <div className="text-xs text-text-muted">Wrapped Bitcoin</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-text-primary">{formatPercentage(lendingPoolData.supplyAPY - 0.3)}</div>
                    <div className="text-xs text-text-muted">APY</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Borrow Markets</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                      <DollarSign size={20} className="text-error" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">USDC</div>
                      <div className="text-xs text-text-muted">USD Coin</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-text-primary">{formatPercentage(lendingPoolData.borrowAPY - 0.4)}</div>
                    <div className="text-xs text-text-muted">APY</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                      <Coins size={20} className="text-error" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">ETH</div>
                      <div className="text-xs text-text-muted">Ethereum</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-text-primary">{formatPercentage(lendingPoolData.borrowAPY)}</div>
                    <div className="text-xs text-text-muted">APY</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                      <Coins size={20} className="text-error" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">WBTC</div>
                      <div className="text-xs text-text-muted">Wrapped Bitcoin</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-text-primary">{formatPercentage(lendingPoolData.borrowAPY + 0.3)}</div>
                    <div className="text-xs text-text-muted">APY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DEX */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Repeat size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Decentralized Exchange</h2>
              <p className="text-text-secondary">Swap tokens with deep liquidity</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('dex')}
            className="flex items-center space-x-2 text-success font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {dexLiquidityData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Top Liquidity Pairs</h3>
              <div className="space-y-4">
                {dexLiquidityData.topPairs.map((pair, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Repeat size={20} className="text-success" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{pair.pair}</div>
                        <div className="text-xs text-text-muted">Volume: {formatCurrency(pair.volume24h)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-text-primary">{formatCurrency(pair.liquidity)}</div>
                      <div className="text-xs text-text-muted">Liquidity</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Quick Swap</h3>
              <form onSubmit={handleSwap} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    From
                  </label>
                  <div className="flex space-x-3">
                    <select
                      value={swapForm.fromToken}
                      onChange={(e) => setSwapForm({...swapForm, fromToken: e.target.value})}
                      className="w-1/3 px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                    >
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                      <option value="WBTC">WBTC</option>
                      <option value="LINK">LINK</option>
                    </select>
                    <input
                      type="number"
                      value={swapForm.amount}
                      onChange={(e) => setSwapForm({...swapForm, amount: e.target.value})}
                      placeholder="0.0"
                      className="w-2/3 px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <ArrowDownRight size={20} className="text-success" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    To
                  </label>
                  <select
                    value={swapForm.toToken}
                    onChange={(e) => setSwapForm({...swapForm, toToken: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                  >
                    <option value="USDC">USDC</option>
                    <option value="ETH">ETH</option>
                    <option value="WBTC">WBTC</option>
                    <option value="LINK">LINK</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={!swapForm.amount || parseFloat(swapForm.amount) <= 0 || swapForm.fromToken === swapForm.toToken || swapLoading}
                  className="w-full py-3 bg-success text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {swapLoading ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Swapping...</span>
                    </>
                  ) : (
                    <>
                      <Repeat size={18} />
                      <span>Swap</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Yield Farming */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Yield Farming</h2>
              <p className="text-text-secondary">Optimize returns across protocols</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('yield')}
            className="flex items-center space-x-2 text-secondary font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {yieldStrategies.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-light-border">
            <table className="w-full">
              <thead className="bg-light-card">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Strategy</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Protocol</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Chain</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">APY</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">TVL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Risk</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border">
                {yieldStrategies.slice(0, 5).map((strategy, index) => (
                  <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                    <td className="px-6 py-4">
                      <div className="font-medium text-text-primary">{strategy.name}</div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{strategy.protocol}</td>
                    <td className="px-6 py-4 text-text-secondary">{strategy.chain}</td>
                    <td className="px-6 py-4 font-bold text-success">{formatPercentage(strategy.apy)}</td>
                    <td className="px-6 py-4 text-text-secondary">{formatCurrency(strategy.tvl)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        strategy.risk === 'low' ? 'bg-success/20 text-success' :
                        strategy.risk === 'medium' ? 'bg-warning/20 text-warning' :
                        'bg-error/20 text-error'
                      }`}>
                        {strategy.risk.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setYieldForm({...yieldForm, strategy: strategy.name});
                          setActiveTab('yield');
                        }}
                        className="px-3 py-1 bg-secondary text-white rounded-lg text-sm hover:scale-105 transition-all duration-300"
                      >
                        Invest
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Derivatives */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-error rounded-xl flex items-center justify-center">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Derivatives</h2>
              <p className="text-text-secondary">Perpetual futures and options</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('derivatives')}
            className="flex items-center space-x-2 text-error font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {derivativesData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Market Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Open Interest:</span>
                  <span className="font-bold text-text-primary">{formatCurrency(derivativesData.openInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">24h Volume:</span>
                  <span className="font-bold text-text-primary">{formatCurrency(derivativesData.volume24h)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Long/Short Ratio:</span>
                  <span className="font-bold text-text-primary">{derivativesData.longShortRatio.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Top Markets</h3>
              <div className="space-y-4">
                {derivativesData.topMarkets.slice(0, 3).map((market, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                        <Activity size={20} className="text-error" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{market.market}</div>
                        <div className="text-xs text-text-muted">Funding: {(market.fundingRate * 100).toFixed(3)}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-text-primary">{formatCurrency(market.openInterest)}</div>
                      <div className="text-xs text-text-muted">Open Interest</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderLending = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Landmark size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Lending & Borrowing</h2>
              <p className="text-text-secondary">Earn interest on deposits or take out loans</p>
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

        {lendingPoolData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lending Pool Stats */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Lending Pool Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Supplied:</span>
                  <span className="font-bold text-text-primary">{formatCurrency(lendingPoolData.totalSupplied)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Borrowed:</span>
                  <span className="font-bold text-text-primary">{formatCurrency(lendingPoolData.totalBorrowed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Available Liquidity:</span>
                  <span className="font-bold text-text-primary">{formatCurrency(lendingPoolData.availableLiquidity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Utilization Rate:</span>
                  <span className="font-bold text-text-primary">
                    {formatPercentage((lendingPoolData.totalBorrowed / lendingPoolData.totalSupplied) * 100)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-text-secondary">Utilization</span>
                  <span className="text-sm font-medium text-text-primary">
                    {formatPercentage((lendingPoolData.totalBorrowed / lendingPoolData.totalSupplied) * 100)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${(lendingPoolData.totalBorrowed / lendingPoolData.totalSupplied) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Deposit Form */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Deposit</h3>
              <form onSubmit={handleDeposit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Asset
                  </label>
                  <select
                    value={depositForm.asset}
                    onChange={(e) => setDepositForm({...depositForm, asset: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="WBTC">WBTC</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={depositForm.amount}
                    onChange={(e) => setDepositForm({...depositForm, amount: e.target.value})}
                    placeholder="0.0"
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                    required
                  />
                </div>
                
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Supply APY:</span>
                  <span className="font-medium text-success">
                    {formatPercentage(depositForm.asset === 'USDC' ? lendingPoolData.supplyAPY + 0.4 : 
                                      depositForm.asset === 'WBTC' ? lendingPoolData.supplyAPY - 0.3 : 
                                      lendingPoolData.supplyAPY)}
                  </span>
                </div>
                
                <button
                  type="submit"
                  disabled={!depositForm.amount || parseFloat(depositForm.amount) <= 0 || depositLoading}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {depositLoading ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      <span>Deposit</span>
                    </>
                  )}
                </button>
              </form>
              
              {depositResult && (
                <div className={`mt-4 p-4 rounded-xl ${
                  depositResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {depositResult.status === 'confirmed' ? (
                      <CheckCircle size={18} className="text-success" />
                    ) : (
                      <AlertTriangle size={18} className="text-error" />
                    )}
                    <span className="font-medium">
                      {depositResult.status === 'confirmed' ? 'Deposit Successful' : 'Deposit Failed'}
                    </span>
                  </div>
                  {depositResult.status === 'confirmed' && (
                    <div className="text-sm text-text-secondary">
                      <p>Transaction Hash: {depositResult.txHash.slice(0, 10)}...{depositResult.txHash.slice(-8)}</p>
                      <p>Estimated APY: {formatPercentage(depositResult.estimatedAPY)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDEX = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Repeat size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">DEX Interface Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a full DEX interface to the platform. Check back soon!
      </p>
    </div>
  );

  const renderYield = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Zap size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">Yield Farming Interface Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a comprehensive yield farming interface to the platform. Check back soon!
      </p>
    </div>
  );

  const renderDerivatives = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Activity size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">Derivatives Interface Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a full derivatives trading interface to the platform. Check back soon!
      </p>
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
                  <Coins size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">DeFi Dashboard</h1>
                  <p className="text-text-secondary text-lg">Decentralized finance protocols and services</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Connected to DeFi</span>
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
              { id: 'lending', label: 'Lending', icon: Landmark },
              { id: 'dex', label: 'DEX', icon: Repeat },
              { id: 'yield', label: 'Yield', icon: Zap },
              { id: 'derivatives', label: 'Derivatives', icon: Activity }
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
        {activeTab === 'lending' && renderLending()}
        {activeTab === 'dex' && renderDEX()}
        {activeTab === 'yield' && renderYield()}
        {activeTab === 'derivatives' && renderDerivatives()}
      </div>
    </div>
  );
};

export default DeFiDashboard;