import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Bot, 
  Users, 
  Zap, 
  BarChart3, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Coins, 
  FileText, 
  Search, 
  Filter, 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  PieChart, 
  Award, 
  Star, 
  MessageSquare, 
  Play, 
  Pause, 
  Sparkles, 
  Target, 
  Lightbulb, 
  Layers
} from 'lucide-react';

interface AIAgentsDashboardProps {
  onBack: () => void;
}

const AIAgentsDashboard: React.FC<AIAgentsDashboardProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'tasks' | 'analytics'>('overview');
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskResult, setTaskResult] = useState<any>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const executeTask = async () => {
    setTaskLoading(true);
    setTaskResult(null);
    
    // Simulate task execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTaskResult({
      taskId: `task-${Date.now()}`,
      status: 'completed',
      result: {
        marketTrend: 'bullish',
        assetAnalysis: [
          {
            asset: 'ETH',
            price: 3245.75,
            priceChange: 2.3,
            volume: 45000000,
            marketCap: 389000000000,
            sentiment: 'positive',
            recommendation: 'buy'
          },
          {
            asset: 'BTC',
            price: 65432.18,
            priceChange: 1.8,
            volume: 78000000,
            marketCap: 1250000000000,
            sentiment: 'positive',
            recommendation: 'hold'
          },
          {
            asset: 'LINK',
            price: 18.45,
            priceChange: 3.5,
            volume: 12000000,
            marketCap: 9500000000,
            sentiment: 'very positive',
            recommendation: 'strong buy'
          }
        ],
        riskAssessment: 'medium',
        summary: 'Market analysis shows a positive outlook. Institutional investors are increasing positions while retail sentiment remains mixed.'
      }
    });
    
    setTaskLoading(false);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-accent rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Brain size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">AI Agents Platform</h1>
              <p className="text-text-secondary text-lg">Powered by ElizaOS</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Bot size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Available Agents</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                7
              </div>
              <div className="text-sm text-text-secondary">Specialized AI agents</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Activity size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Tasks Completed</span>
              </div>
              <div className="text-2xl font-bold text-success">
                12,580
              </div>
              <div className="text-sm text-text-secondary">Total executions</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Award size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                98.2%
              </div>
              <div className="text-sm text-text-secondary">Task completion rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Categories */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Layers size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Agent Categories</h2>
              <p className="text-text-secondary">Specialized AI agents by domain</p>
            </div>
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DeFi Agents */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Coins size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">DeFi Agents</h3>
                <p className="text-text-secondary text-sm">Financial analysis & automation</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Available Agents:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tasks Completed:</span>
                <span className="font-medium">5,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg. Performance:</span>
                <span className="font-medium text-success">91.8%</span>
              </div>
            </div>
            
            <button 
              onClick={() => setActiveTab('agents')}
              className="flex items-center space-x-2 text-primary font-medium"
            >
              <span>View DeFi Agents</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          {/* Productivity Agents */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Zap size={24} className="text-success" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Productivity Agents</h3>
                <p className="text-text-secondary text-sm">Task & workflow automation</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Available Agents:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tasks Completed:</span>
                <span className="font-medium">6,100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg. Performance:</span>
                <span className="font-medium text-success">93.5%</span>
              </div>
            </div>
            
            <button 
              onClick={() => setActiveTab('agents')}
              className="flex items-center space-x-2 text-success font-medium"
            >
              <span>View Productivity Agents</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          {/* Multi-Agent Systems */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Multi-Agent Systems</h3>
                <p className="text-text-secondary text-sm">Collaborative agent networks</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Available Systems:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tasks Completed:</span>
                <span className="font-medium">1,280</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg. Performance:</span>
                <span className="font-medium text-success">92.2%</span>
              </div>
            </div>
            
            <button 
              onClick={() => setActiveTab('agents')}
              className="flex items-center space-x-2 text-secondary font-medium"
            >
              <span>View Multi-Agent Systems</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Agent Tasks */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Execute Agent Tasks</h2>
              <p className="text-text-secondary">Run AI agents for specific use cases</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DeFi Market Analysis */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <BarChart3 size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">DeFi Market Analysis</h3>
                <p className="text-text-secondary text-sm">Analyze market trends and assets</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Assets to Analyze
                </label>
                <select
                  multiple
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  size={3}
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="LINK">Chainlink (LINK)</option>
                  <option value="AAVE">Aave (AAVE)</option>
                  <option value="UNI">Uniswap (UNI)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Timeframe
                </label>
                <select
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                >
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                  <option value="90d">90 Days</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={executeTask}
              disabled={taskLoading}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {taskLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Run Analysis</span>
                </>
              )}
            </button>
          </div>
          
          {/* Yield Optimization */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Zap size={24} className="text-success" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Yield Optimization</h3>
                <p className="text-text-secondary text-sm">Optimize investment strategies</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Initial Amount (USD)
                </label>
                <input
                  type="number"
                  defaultValue="10000"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Risk Tolerance
                </label>
                <select
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={executeTask}
              disabled={taskLoading}
              className="w-full py-3 bg-success text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {taskLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Optimize Yield</span>
                </>
              )}
            </button>
          </div>
          
          {/* Multi-Agent Analysis */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Multi-Agent Analysis</h3>
                <p className="text-text-secondary text-sm">Collaborative project evaluation</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Analysis Type
                </label>
                <select
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                >
                  <option value="comprehensive">Comprehensive Analysis</option>
                  <option value="technical">Technical Analysis</option>
                  <option value="financial">Financial Analysis</option>
                  <option value="market">Market Analysis</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Number of Agents
                </label>
                <input
                  type="number"
                  min="3"
                  max="8"
                  defaultValue="5"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                />
              </div>
            </div>
            
            <button
              onClick={executeTask}
              disabled={taskLoading}
              className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {taskLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Run Multi-Agent Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Task Result */}
        {taskResult && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Task Result</h3>
                <p className="text-text-secondary text-sm">Task ID: {taskResult.taskId}</p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  taskResult.status === 'completed' ? 'bg-success/20 text-success' :
                  taskResult.status === 'pending' ? 'bg-warning/20 text-warning' :
                  'bg-error/20 text-error'
                }`}>
                  {taskResult.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            {taskResult.status === 'completed' && taskResult.result && (
              <div className="space-y-4">
                {/* DeFi Analysis Result */}
                {taskResult.result.marketTrend && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-text-primary">
                      <BarChart3 size={18} className="text-primary" />
                      <span className="font-medium">Market Trend: </span>
                      <span className={`font-bold ${
                        taskResult.result.marketTrend === 'bullish' ? 'text-success' : 'text-error'
                      }`}>
                        {taskResult.result.marketTrend.toUpperCase()}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Asset Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {taskResult.result.assetAnalysis.map((asset: any, index: number) => (
                          <div key={index} className="bg-light-card rounded-lg p-3 border border-light-border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-text-primary">{asset.asset}</span>
                              <span className={`font-medium ${
                                asset.priceChange > 0 ? 'text-success' : 'text-error'
                              }`}>
                                {asset.priceChange > 0 ? '+' : ''}{asset.priceChange.toFixed(2)}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-secondary">Price: ${asset.price.toLocaleString()}</span>
                              <span className="text-text-secondary">Recommendation: {asset.recommendation}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-light-card rounded-lg p-4 border border-light-border">
                      <h4 className="font-medium text-text-primary mb-2">Summary</h4>
                      <p className="text-text-secondary">{taskResult.result.summary}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing AI Agents</h2>
          <p className="text-text-secondary">Connecting to ElizaOS...</p>
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
                  <Brain size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">AI Agents Platform</h1>
                  <p className="text-text-secondary text-lg">Powered by ElizaOS</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">ElizaOS Connected</span>
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
              { id: 'agents', label: 'Agents', icon: Bot },
              { id: 'tasks', label: 'Tasks', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: Activity }
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
        {activeTab === 'agents' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Bot size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Agents Directory Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a detailed agents directory to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'tasks' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Target size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Tasks History Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a detailed tasks history view to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Activity size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Analytics Dashboard Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing detailed analytics for AI agents to the platform. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgentsDashboard;