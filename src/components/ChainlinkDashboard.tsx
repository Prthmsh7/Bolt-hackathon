import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Brain, 
  Zap, 
  Globe, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  BarChart3,
  PieChart,
  Layers,
  Link,
  Sparkles,
  Award,
  Rocket,
  Shield,
  Database,
  Network,
  Bot,
  Search,
  Settings,
  Bell,
  AlertCircle
} from 'lucide-react';
import { ChainlinkService, initializeChainlinkService, ProjectScore, DynamicValuation, MilestoneStatus, CCIPTransfer } from '../lib/chainlink';

interface ChainlinkDashboardProps {
  onBack: () => void;
}

const ChainlinkDashboard: React.FC<ChainlinkDashboardProps> = ({ onBack }) => {
  const [chainlinkService, setChainlinkService] = useState<ChainlinkService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-scoring' | 'pricing' | 'automation' | 'ccip'>('overview');
  
  // Price data
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [priceLoading, setPriceLoading] = useState(false);
  
  // AI Scoring data
  const [projectScore, setProjectScore] = useState<ProjectScore | null>(null);
  const [scoringLoading, setScoringLoading] = useState(false);
  
  // Dynamic valuation data
  const [valuation, setValuation] = useState<DynamicValuation | null>(null);
  
  // Milestone tracking data
  const [milestones, setMilestones] = useState<MilestoneStatus | null>(null);
  const [milestoneLoading, setMilestoneLoading] = useState(false);
  
  // CCIP transfer data
  const [ccipTransfer, setCcipTransfer] = useState<CCIPTransfer | null>(null);
  const [ccipLoading, setCcipLoading] = useState(false);

  // Sample project data for demo
  const sampleProject = {
    title: 'AI-Powered FinTech Platform',
    description: 'Revolutionary payment processing system with AI fraud detection and cross-border capabilities',
    category: 'Fintech',
    founderName: 'Sarah Johnson',
    teamSize: 5,
    githubRepo: 'sarahjohnson/fintech-ai',
    demoLink: 'https://demo.fintech-ai.com'
  };

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setIsLoading(true);
      const service = await initializeChainlinkService();
      setChainlinkService(service);
      
      // Load initial data
      await loadPriceData(service);
      await loadAIScoring(service);
      
    } catch (error) {
      console.error('Error initializing Chainlink services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPriceData = async (service: ChainlinkService) => {
    try {
      setPriceLoading(true);
      const [ethPriceData, btcPriceData] = await Promise.all([
        service.getETHPrice(),
        service.getBTCPrice()
      ]);
      
      setEthPrice(ethPriceData);
      setBtcPrice(btcPriceData);
      
      // Calculate dynamic valuation
      const valuationData = await service.calculateDynamicValuation(
        50000, // Base value
        85, // AI score
        'Fintech'
      );
      setValuation(valuationData);
      
    } catch (error) {
      console.error('Error loading price data:', error);
      // Set fallback data
      setEthPrice(3200);
      setBtcPrice(65000);
    } finally {
      setPriceLoading(false);
    }
  };

  const loadAIScoring = async (service: ChainlinkService) => {
    try {
      setScoringLoading(true);
      const score = await service.getAIProjectScore(sampleProject);
      setProjectScore(score);
    } catch (error) {
      console.error('Error loading AI scoring:', error);
    } finally {
      setScoringLoading(false);
    }
  };

  const loadMilestones = async () => {
    if (!chainlinkService) return;
    
    try {
      setMilestoneLoading(true);
      const milestoneData = await chainlinkService.checkMilestones(
        'project-123',
        sampleProject.githubRepo
      );
      setMilestones(milestoneData);
    } catch (error) {
      console.error('Error loading milestones:', error);
    } finally {
      setMilestoneLoading(false);
    }
  };

  const simulateCCIPTransfer = async () => {
    if (!chainlinkService) return;
    
    try {
      setCcipLoading(true);
      const transfer = await chainlinkService.simulateCCIPTransfer(
        'ethereum',
        'polygon',
        10000,
        'project-123'
      );
      setCcipTransfer(transfer);
    } catch (error) {
      console.error('Error simulating CCIP transfer:', error);
    } finally {
      setCcipLoading(false);
    }
  };

  const refreshData = async () => {
    if (!chainlinkService) return;
    await loadPriceData(chainlinkService);
    await loadAIScoring(chainlinkService);
  };

  const handleRefreshClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    refreshData();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatETH = (amount: number) => {
    return `${amount.toFixed(4)} ETH`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Network size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing Chainlink Services</h2>
          <p className="text-text-secondary">Connecting to oracles and smart contracts...</p>
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
              <Network size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Chainlink-Powered Seedster</h1>
              <p className="text-text-secondary text-lg">AI-driven investment platform with real-time oracles</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Brain size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">AI Scoring</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {projectScore ? `${projectScore.score}/100` : '--'}
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Dynamic Price</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {valuation ? formatCurrency(valuation.valuation) : '--'}
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Zap size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Automation</span>
              </div>
              <div className="text-2xl font-bold text-secondary">Active</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Globe size={20} className="text-accent" />
                <span className="font-semibold text-text-primary">Cross-Chain</span>
              </div>
              <div className="text-2xl font-bold text-accent">5 Chains</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Price Feeds */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Live Price Feeds</h2>
              <p className="text-text-secondary">Real-time data from Chainlink oracles</p>
            </div>
          </div>
          <button
            onClick={handleRefreshClick}
            disabled={priceLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw size={18} className={priceLoading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">ETH/USD</h3>
                  <p className="text-text-muted text-sm">Ethereum Price</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-text-primary">
                  {formatCurrency(ethPrice)}
                </div>
                <div className="flex items-center space-x-1 text-success text-sm">
                  <ArrowUpRight size={14} />
                  <span>+2.4%</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-text-muted">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <DollarSign size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">BTC/USD</h3>
                  <p className="text-text-muted text-sm">Bitcoin Price</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-text-primary">
                  {formatCurrency(btcPrice)}
                </div>
                <div className="flex items-center space-x-1 text-error text-sm">
                  <ArrowDownRight size={14} />
                  <span>-1.2%</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-text-muted">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Chainlink Services Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-light-border p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Brain size={24} className="text-primary" />
          </div>
          <h3 className="font-bold text-text-primary mb-2">Functions</h3>
          <div className="flex items-center justify-center space-x-2 text-success">
            <CheckCircle size={16} />
            <span className="text-sm">Active</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-light-border p-6 text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={24} className="text-secondary" />
          </div>
          <h3 className="font-bold text-text-primary mb-2">Price Feeds</h3>
          <div className="flex items-center justify-center space-x-2 text-success">
            <CheckCircle size={16} />
            <span className="text-sm">Live</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-light-border p-6 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap size={24} className="text-accent" />
          </div>
          <h3 className="font-bold text-text-primary mb-2">Automation</h3>
          <div className="flex items-center justify-center space-x-2 text-success">
            <CheckCircle size={16} />
            <span className="text-sm">Running</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-light-border p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Globe size={24} className="text-primary" />
          </div>
          <h3 className="font-bold text-text-primary mb-2">CCIP</h3>
          <div className="flex items-center justify-center space-x-2 text-success">
            <CheckCircle size={16} />
            <span className="text-sm">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIScoring = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">AI Project Scoring</h2>
              <p className="text-text-secondary">Powered by Chainlink Functions + OpenAI</p>
            </div>
          </div>
          <button
            onClick={() => loadAIScoring(chainlinkService!)}
            disabled={scoringLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            <Bot size={18} className={scoringLoading ? 'animate-pulse' : ''} />
            <span>Re-analyze</span>
          </button>
        </div>

        {projectScore ? (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-accent rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text-primary">Overall AI Score</h3>
                <div className="text-4xl font-bold text-primary">{projectScore.score}/100</div>
              </div>
              <div className="w-full bg-white/50 rounded-full h-4 mb-4">
                <div 
                  className="bg-primary h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${projectScore.score}%` }}
                ></div>
              </div>
              <p className="text-text-secondary">{projectScore.reasoning}</p>
            </div>

            {/* Component Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Target size={20} className="text-primary" />
                  <h4 className="font-bold text-text-primary">Market Potential</h4>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{projectScore.marketPotential}/100</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${projectScore.marketPotential}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-5 h-5 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary text-xs font-bold">U</span>
                  </div>
                  <h4 className="font-bold text-text-primary">Team Strength</h4>
                </div>
                <div className="text-3xl font-bold text-secondary mb-2">{projectScore.teamStrength}/100</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full" 
                    style={{ width: `${projectScore.teamStrength}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles size={20} className="text-accent" />
                  <h4 className="font-bold text-text-primary">Innovation</h4>
                </div>
                <div className="text-3xl font-bold text-accent mb-2">{projectScore.technologyInnovation}/100</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full" 
                    style={{ width: `${projectScore.technologyInnovation}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-xl border border-light-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield size={20} className="text-primary" />
                <h4 className="font-bold text-text-primary">Risk Assessment</h4>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-full font-medium ${
                  projectScore.riskLevel === 'low' ? 'bg-success/20 text-success' :
                  projectScore.riskLevel === 'medium' ? 'bg-warning/20 text-warning' :
                  'bg-error/20 text-error'
                }`}>
                  {projectScore.riskLevel.toUpperCase()} RISK
                </div>
                <span className="text-text-secondary">
                  Based on market analysis, team evaluation, and technical assessment
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Brain size={48} className="mx-auto mb-4 text-text-muted opacity-50" />
            <p className="text-text-muted">Loading AI analysis...</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
            <DollarSign size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Dynamic Pricing Engine</h2>
            <p className="text-text-secondary">Real-time valuation using Chainlink Price Feeds</p>
          </div>
        </div>

        {valuation && (
          <div className="space-y-6">
            {/* Current Valuation */}
            <div className="bg-accent rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Current Valuation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">USD Value:</span>
                      <span className="font-bold text-text-primary">{formatCurrency(valuation.valuation)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">ETH Value:</span>
                      <span className="font-bold text-text-primary">{formatETH(valuation.valuationInETH)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Price Multiplier:</span>
                      <span className="font-bold text-primary">{valuation.priceMultiplier.toFixed(2)}x</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Market Data</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">ETH Price:</span>
                      <span className="font-bold text-text-primary">{formatCurrency(valuation.ethPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Market Trend:</span>
                      <span className="font-bold text-success flex items-center space-x-1">
                        <ArrowUpRight size={14} />
                        <span>Bullish</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Last Update:</span>
                      <span className="font-bold text-text-primary">{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Factors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain size={20} className="text-primary" />
                  <h4 className="font-bold text-text-primary">AI Score Impact</h4>
                </div>
                <div className="text-2xl font-bold text-primary mb-2">+70%</div>
                <p className="text-text-secondary text-sm">High AI score increases valuation</p>
              </div>

              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp size={20} className="text-secondary" />
                  <h4 className="font-bold text-text-primary">Category Bonus</h4>
                </div>
                <div className="text-2xl font-bold text-secondary mb-2">+30%</div>
                <p className="text-text-secondary text-sm">FinTech category premium</p>
              </div>

              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity size={20} className="text-accent" />
                  <h4 className="font-bold text-text-primary">Market Conditions</h4>
                </div>
                <div className="text-2xl font-bold text-accent mb-2">+20%</div>
                <p className="text-text-secondary text-sm">Bull market adjustment</p>
              </div>
            </div>

            {/* Price History Chart Placeholder */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h4 className="font-bold text-text-primary mb-4">Price History (24h)</h4>
              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 size={32} className="mx-auto mb-2 text-text-muted" />
                  <p className="text-text-muted text-sm">Price chart visualization</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Chainlink Automation</h2>
              <p className="text-text-secondary">Automated milestone tracking and fund releases</p>
            </div>
          </div>
          <button
            onClick={loadMilestones}
            disabled={milestoneLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            <Clock size={18} className={milestoneLoading ? 'animate-spin' : ''} />
            <span>Check Status</span>
          </button>
        </div>

        {milestones ? (
          <div className="space-y-6">
            {/* Milestone Progress */}
            <div className="bg-accent rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text-primary">Milestone Progress</h3>
                <div className="text-2xl font-bold text-primary">
                  {milestones.milestonesCompleted}/{milestones.totalMilestones}
                </div>
              </div>
              <div className="w-full bg-white/50 rounded-full h-4 mb-4">
                <div 
                  className="bg-primary h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${(milestones.milestonesCompleted / milestones.totalMilestones) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Next: {milestones.nextMilestone}</span>
                {milestones.shouldReleaseFunds && (
                  <div className="flex items-center space-x-2 text-success">
                    <CheckCircle size={16} />
                    <span className="font-medium">Funds Ready for Release</span>
                  </div>
                )}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Database size={20} className="text-primary" />
                  <h4 className="font-bold text-text-primary">GitHub Commits</h4>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{milestones.metrics.githubCommits}</div>
                <p className="text-text-secondary text-sm">Total commits tracked</p>
              </div>

              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity size={20} className="text-secondary" />
                  <h4 className="font-bold text-text-primary">Demo Uptime</h4>
                </div>
                <div className="text-3xl font-bold text-secondary mb-2">{milestones.metrics.demoUptime.toFixed(1)}%</div>
                <p className="text-text-secondary text-sm">Last 30 days</p>
              </div>

              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp size={20} className="text-accent" />
                  <h4 className="font-bold text-text-primary">User Growth</h4>
                </div>
                <div className="text-3xl font-bold text-accent mb-2">{Math.round(milestones.metrics.userGrowth)}</div>
                <p className="text-text-secondary text-sm">New users this month</p>
              </div>
            </div>

            {/* Automation Status */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h4 className="font-bold text-text-primary mb-4">Automation Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">GitHub Monitoring:</span>
                  <div className="flex items-center space-x-2 text-success">
                    <CheckCircle size={16} />
                    <span>Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Uptime Tracking:</span>
                  <div className="flex items-center space-x-2 text-success">
                    <CheckCircle size={16} />
                    <span>Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Fund Release:</span>
                  <div className="flex items-center space-x-2 text-warning">
                    <Clock size={16} />
                    <span>Pending Milestone</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Zap size={48} className="mx-auto mb-4 text-text-muted opacity-50" />
            <p className="text-text-muted">Loading automation status...</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCCIP = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Cross-Chain Interoperability</h2>
              <p className="text-text-secondary">Powered by Chainlink CCIP</p>
            </div>
          </div>
          <button
            onClick={simulateCCIPTransfer}
            disabled={ccipLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            <Link size={18} className={ccipLoading ? 'animate-pulse' : ''} />
            <span>Simulate Transfer</span>
          </button>
        </div>

        {/* Supported Chains */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche'].map((chain, index) => (
            <div key={chain} className="bg-light-card rounded-xl p-4 border border-light-border text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Network size={20} className="text-primary" />
              </div>
              <h4 className="font-bold text-text-primary text-sm">{chain}</h4>
              <div className="flex items-center justify-center space-x-1 text-success text-xs mt-1">
                <CheckCircle size={12} />
                <span>Connected</span>
              </div>
            </div>
          ))}
        </div>

        {ccipTransfer && (
          <div className="space-y-6">
            {/* Transfer Details */}
            <div className="bg-accent rounded-xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">Latest CCIP Transfer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Transaction Hash:</span>
                    <span className="font-mono text-text-primary text-sm">{ccipTransfer.txHash.slice(0, 10)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Estimated Time:</span>
                    <span className="font-bold text-text-primary">{ccipTransfer.estimatedTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Fees:</span>
                    <span className="font-bold text-text-primary">{ccipTransfer.fees} ETH</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Source Chain:</span>
                    <span className="font-bold text-text-primary">Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Destination:</span>
                    <span className="font-bold text-text-primary">Polygon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Status:</span>
                    <div className={`flex items-center space-x-2 ${
                      ccipTransfer.status === 'confirmed' ? 'text-success' :
                      ccipTransfer.status === 'pending' ? 'text-warning' :
                      'text-error'
                    }`}>
                      {ccipTransfer.status === 'confirmed' ? <CheckCircle size={16} /> :
                       ccipTransfer.status === 'pending' ? <Clock size={16} /> :
                       <AlertTriangle size={16} />}
                      <span className="font-bold capitalize">{ccipTransfer.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Flow Visualization */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h4 className="font-bold text-text-primary mb-4">Transfer Flow</h4>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Network size={24} className="text-white" />
                  </div>
                  <p className="font-bold text-text-primary">Ethereum</p>
                  <p className="text-text-muted text-sm">Source</p>
                </div>
                
                <div className="flex-1 mx-4">
                  <div className="relative">
                    <div className="h-1 bg-primary rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-primary rounded-full p-2">
                      <Link size={16} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-center text-text-muted text-sm mt-2">CCIP Bridge</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Network size={24} className="text-white" />
                  </div>
                  <p className="font-bold text-text-primary">Polygon</p>
                  <p className="text-text-muted text-sm">Destination</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CCIP Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-light-card rounded-xl p-6 border border-light-border text-center">
            <Shield size={32} className="mx-auto mb-4 text-primary" />
            <h4 className="font-bold text-text-primary mb-2">Secure</h4>
            <p className="text-text-secondary text-sm">Cryptographically secure cross-chain transfers</p>
          </div>
          
          <div className="bg-light-card rounded-xl p-6 border border-light-border text-center">
            <Zap size={32} className="mx-auto mb-4 text-secondary" />
            <h4 className="font-bold text-text-primary mb-2">Fast</h4>
            <p className="text-text-secondary text-sm">Optimized for speed and efficiency</p>
          </div>
          
          <div className="bg-light-card rounded-xl p-6 border border-light-border text-center">
            <Globe size={32} className="mx-auto mb-4 text-accent" />
            <h4 className="font-bold text-text-primary mb-2">Universal</h4>
            <p className="text-text-secondary text-sm">Connect any blockchain ecosystem</p>
          </div>
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
                  <Network size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Chainlink Integration</h1>
                  <p className="text-text-secondary text-lg">AI-powered investment platform with real-time oracles</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">All Services Active</span>
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
              { id: 'ai-scoring', label: 'AI Scoring', icon: Brain },
              { id: 'pricing', label: 'Dynamic Pricing', icon: DollarSign },
              { id: 'automation', label: 'Automation', icon: Zap },
              { id: 'ccip', label: 'Cross-Chain', icon: Globe }
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
        {activeTab === 'ai-scoring' && renderAIScoring()}
        {activeTab === 'pricing' && renderPricing()}
        {activeTab === 'automation' && renderAutomation()}
        {activeTab === 'ccip' && renderCCIP()}
      </div>
    </div>
  );
};

export default ChainlinkDashboard;