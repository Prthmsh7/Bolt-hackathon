import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  DollarSign,
  Play,
  UserCheck,
  BarChart3,
  Target,
  Award,
  Heart,
  Eye,
  Crown,
  ShoppingCart,
  Network,
  Brain,
  Zap,
  Globe,
  Coins,
  Layers,
  Mountain,
  Bot
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'chainlink' | 'defi' | 'tokenization' | 'cross-chain' | 'ai-agents' | 'avalanche' | 'about') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    {
      title: 'Active Projects',
      value: '156',
      change: '+23.1%',
      trend: 'up',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-accent',
    },
    {
      title: 'Marketplace Volume',
      value: '$2.4M',
      change: '+18.7%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-primary',
      bgColor: 'bg-secondary',
    },
    {
      title: 'Total Investments',
      value: '$5.8M',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-accent',
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-secondary',
    },
  ];

  const featuredProjects = [
    { 
      name: 'AI-Powered Analytics Platform', 
      founder: 'Sarah Johnson', 
      category: 'AI/ML',
      valuation: '$2.5M',
      shares: '15%',
      price: '$50K',
      status: 'Available',
      likes: 89,
      views: 1240,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    },
    { 
      name: 'Sustainable Energy Tracker', 
      founder: 'Michael Chen', 
      category: 'Cleantech',
      valuation: '$1.8M',
      shares: '20%',
      price: '$36K',
      status: 'Available',
      likes: 67,
      views: 890,
      image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    },
    { 
      name: 'FinTech Payment Solution', 
      founder: 'Emma Davis', 
      category: 'Fintech',
      valuation: '$3.2M',
      shares: '12%',
      price: '$64K',
      status: 'Hot',
      likes: 124,
      views: 1560,
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    },
    { 
      name: 'Healthcare Data Platform', 
      founder: 'David Wilson', 
      category: 'Healthtech',
      valuation: '$2.1M',
      shares: '18%',
      price: '$42K',
      status: 'Available',
      likes: 78,
      views: 1120,
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    },
    { 
      name: 'EdTech Learning Assistant', 
      founder: 'Lisa Rodriguez', 
      category: 'Edtech',
      valuation: '$1.5M',
      shares: '25%',
      price: '$30K',
      status: 'New',
      likes: 45,
      views: 670,
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    },
    { 
      name: 'Blockchain Security Protocol', 
      founder: 'James Park', 
      category: 'Blockchain',
      valuation: '$4.0M',
      shares: '10%',
      price: '$80K',
      status: 'Premium',
      likes: 156,
      views: 2340,
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    },
  ];

  const marketplaceHighlights = [
    { title: 'New Project Listings', value: '12', description: 'This week', icon: ShoppingCart, color: 'text-primary' },
    { title: 'Active Investors', value: '2.4K', description: 'Monthly active', icon: Users, color: 'text-primary' },
    { title: 'Avg. Investment', value: '$45K', description: 'Per project', icon: DollarSign, color: 'text-primary' },
    { title: 'Success Stories', value: '89', description: 'Funded projects', icon: Award, color: 'text-primary' },
  ];

  const topLikedProjects = featuredProjects
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-light-bg text-text-primary fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3 lg:mb-4">
            Welcome to <span className="text-primary">Seedster</span>
          </h1>
          <p className="text-text-secondary text-lg lg:text-xl max-w-3xl">
            Discover innovative projects, connect with founders, and invest in the future of technology.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {stats.map((stat, index) => (
            <div key={stat.title} className={`neo-card ${stat.bgColor} p-6 lg:p-8 stagger-item`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-xl bg-white border border-light-border`}>
                  <stat.icon className={`w-6 h-6 lg:w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-2 text-sm font-semibold px-3 py-1 rounded-full ${
                  stat.trend === 'up' ? 'text-success bg-white' : 'text-error bg-white'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">{stat.value}</h3>
                <p className="text-text-secondary font-medium">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Chainlink Track */}
          <div className="neo-card bg-accent p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Network size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Chainlink</h3>
                  <p className="text-text-secondary text-sm">AI-powered oracles</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Brain size={16} className="text-primary" />
                  <span className="text-text-secondary">AI Scoring</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign size={16} className="text-primary" />
                  <span className="text-text-secondary">Dynamic Pricing</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Globe size={16} className="text-primary" />
                  <span className="text-text-secondary">Cross-Chain CCIP</span>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('chainlink')}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
              >
                Explore Chainlink
              </button>
            </div>
          </div>
          
          {/* DeFi Track */}
          <div className="neo-card bg-accent p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <Coins size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">DeFi</h3>
                  <p className="text-text-secondary text-sm">Decentralized finance</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <TrendingUp size={16} className="text-secondary" />
                  <span className="text-text-secondary">Yield Optimization</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Activity size={16} className="text-secondary" />
                  <span className="text-text-secondary">Derivatives & Perps</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Globe size={16} className="text-secondary" />
                  <span className="text-text-secondary">Cross-chain Lending</span>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('defi')}
                className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
              >
                Explore DeFi
              </button>
            </div>
          </div>
          
          {/* Tokenization Track */}
          <div className="neo-card bg-accent p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Layers size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Tokenization</h3>
                  <p className="text-text-secondary text-sm">Real-world assets</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Building size={16} className="text-primary" />
                  <span className="text-text-secondary">Real Estate</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award size={16} className="text-primary" />
                  <span className="text-text-secondary">Carbon Credits</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Gamepad size={16} className="text-primary" />
                  <span className="text-text-secondary">Game Assets</span>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('tokenization')}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
              >
                Explore Tokenization
              </button>
            </div>
          </div>
          
          {/* Cross-Chain Track */}
          <div className="neo-card bg-accent p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <Globe size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Cross-Chain</h3>
                  <p className="text-text-secondary text-sm">Multi-chain solutions</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Coins size={16} className="text-secondary" />
                  <span className="text-text-secondary">Cross-chain DeFi</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Gamepad size={16} className="text-secondary" />
                  <span className="text-text-secondary">Multi-chain Gaming</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Layers size={16} className="text-secondary" />
                  <span className="text-text-secondary">Liquid Staking</span>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('cross-chain')}
                className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
              >
                Explore Cross-Chain
              </button>
            </div>
          </div>
          
          {/* AI Agents Track */}
          <div className="neo-card bg-accent p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">AI Agents</h3>
                  <p className="text-text-secondary text-sm">ElizaOS powered</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Coins size={16} className="text-primary" />
                  <span className="text-text-secondary">DeFi Agents</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Activity size={16} className="text-primary" />
                  <span className="text-text-secondary">Productivity Agents</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users size={16} className="text-primary" />
                  <span className="text-text-secondary">Multi-agent Systems</span>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('ai-agents')}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
              >
                Explore AI Agents
              </button>
            </div>
          </div>
          
          {/* Avalanche Track */}
          <div className="neo-card bg-accent p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <Mountain size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Avalanche</h3>
                  <p className="text-text-secondary text-sm">High-performance blockchain</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Layers size={16} className="text-secondary" />
                  <span className="text-text-secondary">Single EVM Chain</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Globe size={16} className="text-secondary" />
                  <span className="text-text-secondary">Cross-Chain dApp</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Rocket size={16} className="text-secondary" />
                  <span className="text-text-secondary">Custom L1 Chain</span>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('avalanche')}
                className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
              >
                Explore Avalanche
              </button>
            </div>
          </div>
        </div>

        {/* Chainlink Integration Highlight */}
        <div className="neo-card bg-accent p-8 lg:p-10 mb-12 lg:mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="neo-btn w-16 h-16 lg:w-20 h-20 bg-primary flex items-center justify-center">
                <Network size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">Chainlink-Powered Platform</h3>
                <p className="text-text-secondary text-lg">AI scoring, dynamic pricing, automation & cross-chain investments</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('chainlink')}
              className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-primary text-white font-semibold hover:bg-primary"
            >
              <Network size={20} />
              <span>Explore Chainlink Features</span>
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Brain size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">AI Scoring</span>
              </div>
              <div className="text-sm text-text-secondary">Real-time project evaluation</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Dynamic Pricing</span>
              </div>
              <div className="text-sm text-text-secondary">Market-driven valuations</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Zap size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Automation</span>
              </div>
              <div className="text-sm text-text-secondary">Milestone-based funding</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Globe size={20} className="text-accent" />
                <span className="font-semibold text-text-primary">Cross-Chain</span>
              </div>
              <div className="text-sm text-text-secondary">Multi-blockchain support</div>
            </div>
          </div>
        </div>

        {/* Quick Access to Marketplace */}
        <div className="neo-card bg-accent p-8 lg:p-10 mb-12 lg:mb-16 relative overflow-hidden">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="neo-btn w-16 h-16 lg:w-20 h-20 bg-primary flex items-center justify-center">
                <ShoppingBag size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">IP Marketplace</h3>
                <p className="text-text-secondary text-lg">Browse and purchase innovative registered projects from talented developers</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-secondary text-white font-semibold hover:bg-secondary"
            >
              <ShoppingBag size={20} />
              <span>Browse Marketplace</span>
            </button>
          </div>
        </div>

        {/* Marketplace Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketplaceHighlights.map((highlight, index) => (
            <div key={highlight.title} className="neo-card bg-white p-6 text-center stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4 border border-light-border`}>
                <highlight.icon size={24} className={highlight.color} />
              </div>
              <div className="text-2xl font-bold text-primary mb-2">{highlight.value}</div>
              <div className="text-sm font-medium text-text-primary mb-1">{highlight.title}</div>
              <div className="text-xs text-text-muted">{highlight.description}</div>
            </div>
          ))}
        </div>

        {/* Top Liked Projects Section */}
        <div className="neo-card bg-white p-8 lg:p-10 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-10">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="neo-btn w-16 h-16 bg-error flex items-center justify-center">
                <Heart size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">Most Liked Projects</h2>
                <p className="text-text-secondary text-lg">Community favorites in the marketplace</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-secondary text-white font-semibold hover:bg-secondary"
            >
              <Crown size={20} />
              <span>View Leaderboard</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topLikedProjects.map((project, index) => (
              <div 
                key={index} 
                className="neo-card bg-white overflow-hidden cursor-pointer group stagger-item" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate('marketplace')}
              >
                {/* Rank Badge */}
                <div className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-secondary' :
                  index === 1 ? 'bg-text-muted' :
                  'bg-warning'
                }`}>
                  {index + 1}
                </div>

                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Hot' ? 'bg-error text-white' :
                      project.status === 'New' ? 'bg-success text-white' :
                      project.status === 'Premium' ? 'bg-primary text-white' :
                      'bg-accent text-text-primary'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Eye size={10} />
                      <span>{project.views}</span>
                    </div>
                    <div className="bg-error/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Heart size={10} className="fill-current" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-lg text-text-primary group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </h4>
                  <p className="text-text-secondary text-sm mb-4">by {project.founder}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Valuation:</span>
                      <span className="font-semibold text-text-primary">{project.valuation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Likes:</span>
                      <span className="font-semibold text-error flex items-center space-x-1">
                        <Heart size={12} className="fill-current" />
                        <span>{project.likes}</span>
                      </span>
                    </div>
                  </div>

                  <button className="neo-btn w-full py-3 bg-secondary text-white font-medium hover:bg-secondary">
                    View in Marketplace
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="neo-card bg-white p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-10">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="neo-btn w-16 h-16 bg-secondary flex items-center justify-center">
                <Star size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">Featured Projects</h2>
                <p className="text-text-secondary text-lg">Top-rated projects available for investment</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-secondary text-white font-semibold hover:bg-secondary"
            >
              <TrendingUp size={20} />
              <span>View All Projects</span>
            </button>
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={index} 
                className="neo-card bg-white overflow-hidden cursor-pointer group stagger-item" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate('marketplace')}
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Hot' ? 'bg-error text-white' :
                      project.status === 'New' ? 'bg-success text-white' :
                      project.status === 'Premium' ? 'bg-primary text-white' :
                      'bg-accent text-text-primary'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Eye size={10} />
                      <span>{project.views}</span>
                    </div>
                    <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Heart size={10} className={project.likes > 100 ? 'fill-current text-error' : ''} />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-lg text-text-primary mb-2">
                    {project.name}
                  </h4>
                  <p className="text-text-secondary text-sm mb-4">by {project.founder}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Valuation:</span>
                      <span className="font-semibold text-text-primary">{project.valuation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Shares:</span>
                      <span className="font-semibold text-primary">{project.shares}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Min. Investment:</span>
                      <span className="font-semibold text-secondary">{project.price}</span>
                    </div>
                  </div>

                  <button className="neo-btn w-full py-3 bg-secondary text-white font-medium hover:bg-secondary">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <button 
            onClick={() => onNavigate('user-profile')}
            className="neo-card bg-white p-8 text-left group"
          >
            <UserCheck className="w-10 h-10 text-primary mb-4" />
            <h4 className="font-semibold text-xl text-text-primary mb-3">Register Your Project</h4>
            <p className="text-text-secondary">Protect your IP and showcase your innovation to investors</p>
          </button>
          
          <button 
            onClick={() => onNavigate('marketplace')}
            className="neo-card bg-white p-8 text-left group"
          >
            <ShoppingBag className="w-10 h-10 text-secondary mb-4" />
            <h4 className="font-semibold text-xl text-text-primary mb-3">Explore Marketplace</h4>
            <p className="text-text-secondary">Discover and invest in promising registered projects</p>
          </button>
          
          <button 
            onClick={() => onNavigate('chainlink')}
            className="neo-card bg-white p-8 text-left group"
          >
            <Network className="w-10 h-10 text-primary mb-4" />
            <h4 className="font-semibold text-xl text-text-primary mb-3">Chainlink Features</h4>
            <p className="text-text-secondary">Explore AI scoring, dynamic pricing, and cross-chain investments</p>
          </button>
        </div>
      </div>
    </div>
  );
};

// Additional icons
function Building(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <path d="M9 22v-4h6v4"></path>
      <path d="M8 6h.01"></path>
      <path d="M16 6h.01"></path>
      <path d="M12 6h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M16 10h.01"></path>
      <path d="M16 14h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M8 14h.01"></path>
    </svg>
  );
}

function Gamepad(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="6" y1="12" x2="10" y2="12"></line>
      <line x1="8" y1="10" x2="8" y2="14"></line>
      <line x1="15" y1="13" x2="15.01" y2="13"></line>
      <line x1="18" y1="11" x2="18.01" y2="11"></line>
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    </svg>
  );
}

function Rocket(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
  );
}

export default Dashboard;