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
  Zap,
  Target,
  Award,
  Heart,
  Eye,
  Crown,
  Flame,
  ShoppingCart
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'about') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    {
      title: 'Active Projects',
      value: '156',
      change: '+23.1%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Marketplace Volume',
      value: '$2.4M',
      change: '+18.7%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Total Investments',
      value: '$5.8M',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
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
    { title: 'New Project Listings', value: '12', description: 'This week', icon: ShoppingCart, color: 'text-blue-600' },
    { title: 'Active Investors', value: '2.4K', description: 'Monthly active', icon: Users, color: 'text-green-600' },
    { title: 'Avg. Investment', value: '$45K', description: 'Per project', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Success Stories', value: '89', description: 'Funded projects', icon: Award, color: 'text-orange-600' },
  ];

  const topLikedProjects = featuredProjects
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-light-bg text-text-primary fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header - Improved typography and spacing */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3 lg:mb-4">
            Welcome to <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Seedora</span>
          </h1>
          <p className="text-text-secondary text-lg lg:text-xl max-w-3xl">
            Discover innovative projects, connect with founders, and invest in the future of technology.
          </p>
        </div>

        {/* Stats Grid - Enhanced design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {stats.map((stat, index) => (
            <div key={stat.title} className={`bg-white rounded-2xl border ${stat.borderColor} p-6 lg:p-8 card-hover stagger-item shadow-sm hover:shadow-lg transition-all duration-300`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 lg:w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-2 text-sm font-semibold px-3 py-1 rounded-full ${
                  stat.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
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

        {/* Quick Access to Marketplace - Enhanced design */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl border border-primary/20 p-8 lg:p-10 mb-12 lg:mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 lg:w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">IP Marketplace</h3>
                <p className="text-text-secondary text-lg">Browse and purchase innovative registered projects from talented developers</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="flex items-center justify-center space-x-3 px-8 py-4 bg-white hover:bg-light-hover rounded-xl text-text-primary font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-light-border"
            >
              <ShoppingBag size={20} />
              <span>Browse Marketplace</span>
            </button>
          </div>
        </div>

        {/* Marketplace Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketplaceHighlights.map((highlight, index) => (
            <div key={highlight.title} className="bg-white rounded-2xl border border-light-border p-6 text-center hover:shadow-lg transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-12 h-12 ${highlight.color === 'text-blue-600' ? 'bg-blue-50' : highlight.color === 'text-green-600' ? 'bg-green-50' : highlight.color === 'text-purple-600' ? 'bg-purple-50' : 'bg-orange-50'} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <highlight.icon size={24} className={highlight.color} />
              </div>
              <div className="text-2xl font-bold text-primary mb-2">{highlight.value}</div>
              <div className="text-sm font-medium text-text-primary mb-1">{highlight.title}</div>
              <div className="text-xs text-text-muted">{highlight.description}</div>
            </div>
          ))}
        </div>

        {/* Top Liked Projects Section */}
        <div className="bg-white rounded-2xl border border-light-border p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-10">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">Most Liked Projects</h2>
                <p className="text-text-secondary text-lg">Community favorites in the marketplace</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Crown size={20} />
              <span>View Leaderboard</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topLikedProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white border border-light-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer card-hover stagger-item group relative" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate('marketplace')}
              >
                {/* Rank Badge */}
                <div className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                  'bg-gradient-to-r from-amber-600 to-amber-800'
                }`}>
                  {index + 1}
                </div>

                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Hot' ? 'bg-red-500 text-white' :
                      project.status === 'New' ? 'bg-green-500 text-white' :
                      project.status === 'Premium' ? 'bg-purple-500 text-white' :
                      'bg-blue-500 text-white'
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
                    <div className="bg-red-500/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Heart size={10} className="fill-current" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-lg text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
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
                      <span className="font-semibold text-red-500 flex items-center space-x-1">
                        <Heart size={12} className="fill-current" />
                        <span>{project.likes}</span>
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg">
                    View in Marketplace
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects - Enhanced design */}
        <div className="bg-white rounded-2xl border border-light-border p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-10">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <Star size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">Featured Projects</h2>
                <p className="text-text-secondary text-lg">Top-rated projects available for investment</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <TrendingUp size={20} />
              <span>View All Projects</span>
            </button>
          </div>
          
          {/* Project Grid - Enhanced grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white border border-light-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer card-hover stagger-item group" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate('marketplace')}
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Hot' ? 'bg-red-500 text-white' :
                      project.status === 'New' ? 'bg-green-500 text-white' :
                      project.status === 'Premium' ? 'bg-purple-500 text-white' :
                      'bg-blue-500 text-white'
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
                      <Heart size={10} className={project.likes > 100 ? 'fill-current text-red-400' : ''} />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-lg text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
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

                  <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg">
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
            className="bg-white border border-light-border rounded-2xl p-8 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 card-hover text-left group"
          >
            <UserCheck className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-semibold text-xl text-text-primary mb-3">Register Your Project</h4>
            <p className="text-text-secondary">Protect your IP and showcase your innovation to investors</p>
          </button>
          
          <button 
            onClick={() => onNavigate('marketplace')}
            className="bg-white border border-light-border rounded-2xl p-8 hover:bg-secondary/5 hover:border-secondary/30 transition-all duration-300 card-hover text-left group"
          >
            <ShoppingBag className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-semibold text-xl text-text-primary mb-3">Explore Marketplace</h4>
            <p className="text-text-secondary">Discover and invest in promising registered projects</p>
          </button>
          
          <button 
            onClick={() => onNavigate('analytics')}
            className="bg-white border border-light-border rounded-2xl p-8 hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 card-hover text-left group"
          >
            <BarChart3 className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-semibold text-xl text-text-primary mb-3">View Analytics</h4>
            <p className="text-text-secondary">Track performance and market insights</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;