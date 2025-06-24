import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Zap,
  Star,
  Eye,
  MousePointer,
  Clock,
  Percent,
  LineChart,
  Database
} from 'lucide-react';

interface AnalyticsProps {
  onBack: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'investments' | 'marketplace' | 'users'>('all');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const timeframes = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
    { id: '1y', label: 'Last Year' }
  ];

  const categories = [
    { id: 'all', label: 'All Analytics', icon: BarChart3 },
    { id: 'investments', label: 'Investment Analytics', icon: TrendingUp },
    { id: 'marketplace', label: 'Marketplace Analytics', icon: DollarSign },
    { id: 'users', label: 'User Analytics', icon: Users }
  ];

  // Key Performance Indicators
  const kpis = [
    {
      title: 'Total Investment Volume',
      value: '$2.4M',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Total amount invested across all funds'
    },
    {
      title: 'Active Users',
      value: '12,450',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Monthly active users on the platform'
    },
    {
      title: 'Average Return Rate',
      value: '24.5%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Average portfolio return rate'
    },
    {
      title: 'Platform Growth',
      value: '94.2%',
      change: '+8.3%',
      trend: 'up',
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Month-over-month platform growth'
    }
  ];

  // Investment Performance Data
  const investmentPerformance = [
    { fund: 'FinTech Innovation', invested: '$450K', current: '$623K', return: '+38.4%', investors: 156 },
    { fund: 'Green Energy Portfolio', invested: '$320K', current: '$399K', return: '+24.7%', investors: 89 },
    { fund: 'AI Technology Fund', invested: '$580K', current: '$906K', return: '+56.2%', investors: 234 },
    { fund: 'Healthcare Innovation', invested: '$290K', current: '$348K', return: '+20.0%', investors: 67 },
    { fund: 'Real Estate REIT', invested: '$380K', current: '$418K', return: '+10.0%', investors: 123 }
  ];

  // User Engagement Metrics
  const userMetrics = [
    { metric: 'Daily Active Users', value: '3,245', change: '+12.3%', trend: 'up' },
    { metric: 'Session Duration', value: '8m 32s', change: '+5.7%', trend: 'up' },
    { metric: 'Page Views', value: '45.2K', change: '+18.9%', trend: 'up' },
    { metric: 'Bounce Rate', value: '23.4%', change: '-4.2%', trend: 'down' },
    { metric: 'Conversion Rate', value: '4.8%', change: '+1.1%', trend: 'up' },
    { metric: 'User Retention', value: '78.9%', change: '+3.4%', trend: 'up' }
  ];

  // Marketplace Analytics
  const marketplaceData = [
    { category: 'Software Tools', sales: '$89K', items: 45, avgPrice: '$198' },
    { category: 'Educational Content', sales: '$67K', items: 123, avgPrice: '$54' },
    { category: 'Research Reports', sales: '$134K', items: 67, avgPrice: '$200' },
    { category: 'Consulting Services', sales: '$245K', items: 23, avgPrice: '$1,065' }
  ];

  // Geographic Distribution
  const geographicData = [
    { region: 'North America', users: '45.2%', investments: '$1.2M' },
    { region: 'Europe', users: '28.7%', investments: '$680K' },
    { region: 'Asia Pacific', users: '18.3%', investments: '$420K' },
    { region: 'Latin America', users: '5.1%', investments: '$85K' },
    { region: 'Others', users: '2.7%', investments: '$35K' }
  ];

  return (
    <div className={`min-h-screen bg-light-bg text-text-primary transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-light-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ←
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Analytics Dashboard</h1>
                  <p className="text-text-secondary text-lg">Comprehensive platform insights and performance metrics</p>
                </div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-3">
                <Filter size={18} className="text-text-muted flex-shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="bg-white border border-light-border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary min-w-[200px] shadow-sm"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id} className="bg-white">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar size={18} className="text-text-muted flex-shrink-0" />
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                  className="bg-white border border-light-border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary min-w-[160px] shadow-sm"
                >
                  {timeframes.map(timeframe => (
                    <option key={timeframe.id} value={timeframe.id} className="bg-white">
                      {timeframe.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md">
                  <RefreshCw size={18} />
                  <span>Refresh</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {kpis.map((kpi, index) => (
            <div key={kpi.title} className={`bg-white rounded-2xl border ${kpi.borderColor} p-8 card-hover stagger-item shadow-sm hover:shadow-lg transition-all duration-300`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-xl ${kpi.bgColor}`}>
                  <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                </div>
                <div className={`flex items-center space-x-2 text-sm font-semibold px-3 py-1 rounded-full ${
                  kpi.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                }`}>
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{kpi.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-text-primary mb-2">{kpi.value}</h3>
                <p className="text-text-secondary font-medium mb-2">{kpi.title}</p>
                <p className="text-text-muted text-sm">{kpi.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Investment Performance */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-light-border p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary">Investment Performance</h2>
                  <p className="text-text-secondary">Fund performance and returns analysis</p>
                </div>
              </div>
              <button className="text-primary hover:text-primary-600 font-semibold px-6 py-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-all duration-300">
                View Details
              </button>
            </div>
            
            <div className="space-y-6">
              {investmentPerformance.map((fund, index) => (
                <div 
                  key={index} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-light-card border border-light-border rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 cursor-pointer card-hover stagger-item" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary text-lg mb-2">{fund.fund}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                      <span>Invested: {fund.invested}</span>
                      <span>•</span>
                      <span>Current: {fund.current}</span>
                      <span>•</span>
                      <span>{fund.investors} investors</span>
                    </div>
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <div className="text-2xl font-bold text-green-600">{fund.return}</div>
                    <div className="text-text-muted text-sm">Return</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Engagement Metrics */}
          <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-text-primary">User Engagement</h2>
                <p className="text-text-secondary">Platform usage metrics</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {userMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-light-card border border-light-border rounded-xl hover:bg-blue-50 transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div>
                    <h4 className="font-medium text-text-primary">{metric.metric}</h4>
                    <div className="text-xl font-bold text-text-primary">{metric.value}</div>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-semibold px-3 py-1 rounded-full ${
                    metric.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Marketplace Analytics */}
          <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-accent to-yellow-500 rounded-xl flex items-center justify-center">
                <DollarSign size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-text-primary">Marketplace Analytics</h2>
                <p className="text-text-secondary">Sales and product performance</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {marketplaceData.map((category, index) => (
                <div key={index} className="p-6 bg-light-card border border-light-border rounded-xl hover:bg-accent/5 transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-text-primary text-lg">{category.category}</h4>
                    <span className="text-xl font-bold text-accent">{category.sales}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
                    <div>
                      <span className="block">Items Sold</span>
                      <span className="font-medium text-text-primary">{category.items}</span>
                    </div>
                    <div>
                      <span className="block">Avg. Price</span>
                      <span className="font-medium text-text-primary">{category.avgPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Globe size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-text-primary">Geographic Distribution</h2>
                <p className="text-text-secondary">User and investment distribution</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {geographicData.map((region, index) => (
                <div key={index} className="p-6 bg-light-card border border-light-border rounded-xl hover:bg-purple-50 transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-text-primary text-lg">{region.region}</h4>
                    <span className="text-xl font-bold text-purple-600">{region.users}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Investment Volume</span>
                    <span className="font-medium text-text-primary">{region.investments}</span>
                  </div>
                  <div className="mt-3 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: region.users }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Activity size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-text-primary">Real-time Activity</h2>
                <p className="text-text-secondary">Live platform activity and transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Sessions', value: '1,234', icon: Eye, color: 'text-blue-600' },
              { label: 'New Investments', value: '$45K', icon: DollarSign, color: 'text-green-600' },
              { label: 'Page Views/min', value: '89', icon: MousePointer, color: 'text-purple-600' },
              { label: 'Avg. Session Time', value: '8m 32s', icon: Clock, color: 'text-orange-600' }
            ].map((metric, index) => (
              <div key={index} className="text-center p-6 bg-light-card border border-light-border rounded-xl hover:bg-green-50 transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-text-primary mb-1">{metric.value}</div>
                <div className="text-text-secondary text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;