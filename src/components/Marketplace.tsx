import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye, 
  Heart, 
  Share, 
  ExternalLink,
  Play,
  Calendar,
  MapPin,
  Award,
  Shield,
  Zap,
  Target,
  BarChart3,
  Globe,
  Code,
  Lightbulb,
  Building,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  Video,
  Link as LinkIcon,
  FileText,
  Sparkles,
  ShoppingCart,
  Crown,
  Flame,
  TrendingDown,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Gavel,
  Timer
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import AuctionSystem from './AuctionSystem';
import { demoProjects, getTrendingProjects, getFeaturedProjects, getProjectsByCategory, searchProjects, DemoProject } from '../data/demoProjects';

interface MarketplaceProps {
  onBack: () => void;
}

interface MarketplaceItem extends DemoProject {
  user_has_liked?: boolean;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAuctions, setShowAuctions] = useState(false);
  const [likeLoading, setLikeLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'trending' | 'auctions' | 'featured'>('marketplace');

  const categories = [
    'all',
    'AI/ML',
    'Blockchain',
    'Fintech',
    'Healthtech',
    'Edtech',
    'E-commerce',
    'SaaS',
    'IoT',
    'Cybersecurity',
    'Gaming',
    'Social Media',
    'Productivity',
    'Other'
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending (Most Liked)', icon: TrendingUp },
    { value: 'newest', label: 'Newest First', icon: Clock },
    { value: 'oldest', label: 'Oldest First', icon: Calendar },
    { value: 'price_high', label: 'Highest Price', icon: SortDesc },
    { value: 'price_low', label: 'Lowest Price', icon: SortAsc },
    { value: 'views', label: 'Most Viewed', icon: Eye },
    { value: 'featured', label: 'Featured First', icon: Crown },
    { value: 'purchases', label: 'Most Purchased', icon: ShoppingCart },
  ];

  useEffect(() => {
    fetchMarketplaceItems();
  }, [user]);

  useEffect(() => {
    filterAndSortItems();
  }, [items, searchQuery, selectedCategory, selectedSort, activeTab]);

  const fetchMarketplaceItems = async () => {
    try {
      setLoading(true);
      
      // Use demo data for now - in production this would fetch from Supabase
      let marketplaceData = [...demoProjects];

      // If user is authenticated, check which items they've liked (simulate for demo)
      if (user) {
        // Simulate some liked items for demo
        const likedItemIds = new Set(['demo-1', 'demo-3', 'demo-8']);
        marketplaceData = marketplaceData.map(item => ({
          ...item,
          user_has_liked: likedItemIds.has(item.id)
        }));
      }

      setItems(marketplaceData);
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortItems = () => {
    let filtered = [...items];

    // Apply tab-specific filtering
    switch (activeTab) {
      case 'trending':
        filtered = getTrendingProjects(10);
        break;
      case 'featured':
        filtered = getFeaturedProjects();
        break;
      case 'auctions':
        // For auctions, we'll show a different component
        return;
      case 'marketplace':
      default:
        // Use all items
        break;
    }

    // Filter by search query
    if (searchQuery) {
      filtered = searchProjects(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = getProjectsByCategory(selectedCategory);
    }

    // Apply both search and category filters if both are active
    if (searchQuery && selectedCategory !== 'all') {
      filtered = items.filter(item =>
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.founder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.company_name?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        item.category === selectedCategory
      );
    }

    // Sort items
    switch (selectedSort) {
      case 'trending':
        filtered.sort((a, b) => b.likes_count - a.likes_count);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'views':
        filtered.sort((a, b) => b.views_count - a.views_count);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'purchases':
        filtered.sort((a, b) => b.purchase_count - a.purchase_count);
        break;
      case 'featured':
        filtered.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return b.likes_count - a.likes_count;
        });
        break;
    }

    setFilteredItems(filtered);
  };

  const handleLike = async (item: MarketplaceItem) => {
    if (!user) {
      alert('Please sign in to like projects');
      return;
    }

    if (likeLoading === item.id) return;

    setLikeLoading(item.id);

    try {
      // Simulate like/unlike for demo
      const newLikedState = !item.user_has_liked;
      const likesChange = newLikedState ? 1 : -1;

      // Update local state
      setItems(prevItems =>
        prevItems.map(prevItem =>
          prevItem.id === item.id
            ? {
                ...prevItem,
                likes_count: prevItem.likes_count + likesChange,
                user_has_liked: newLikedState
              }
            : prevItem
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to update like. Please try again.');
    } finally {
      setLikeLoading(null);
    }
  };

  const handleViewItem = async (item: MarketplaceItem) => {
    // Increment view count (simulate for demo)
    setItems(prevItems =>
      prevItems.map(prevItem =>
        prevItem.id === item.id
          ? { ...prevItem, views_count: prevItem.views_count + 1 }
          : prevItem
      )
    );

    setSelectedItem(item);
  };

  const handlePurchase = (item: MarketplaceItem) => {
    if (!user) {
      alert('Please sign in to purchase projects');
      return;
    }
    
    // This would open a purchase modal or redirect to purchase flow
    alert(`Purchase flow for "${item.title}" ($${item.price.toLocaleString()}) would open here`);
  };

  const handleBid = (itemId: string, amount: number) => {
    if (!user) {
      alert('Please sign in to place bids');
      return;
    }
    
    alert(`Bid of $${amount.toLocaleString()} placed for item ${itemId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getLeaderboardItems = () => {
    return [...items]
      .sort((a, b) => b.likes_count - a.likes_count)
      .slice(0, 10);
  };

  const ProjectCard = ({ item, rank }: { item: MarketplaceItem; rank?: number }) => (
    <div className="bg-white rounded-2xl border border-light-border overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer relative">
      {/* Featured Badge */}
      {item.is_featured && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Crown size={12} />
          <span>FEATURED</span>
        </div>
      )}

      {/* Rank Badge for Leaderboard */}
      {rank !== undefined && (
        <div className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
          rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
          rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
          rank === 3 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
          'bg-gradient-to-r from-blue-500 to-blue-700'
        }`}>
          {rank}
        </div>
      )}

      <div className="relative">
        <img 
          src={item.thumbnail_url} 
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {item.category}
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Eye size={10} />
            <span>{item.views_count}</span>
          </div>
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Heart size={10} className={item.user_has_liked ? 'fill-current text-red-400' : ''} />
            <span>{item.likes_count}</span>
          </div>
          {item.purchase_count > 0 && (
            <div className="bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
              <ShoppingCart size={10} />
              <span>{item.purchase_count}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1">
            {item.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike(item);
            }}
            disabled={likeLoading === item.id}
            className={`ml-3 p-2 rounded-full transition-all duration-300 ${
              item.user_has_liked 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-text-muted hover:text-red-500 hover:bg-red-50'
            } ${likeLoading === item.id ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Heart size={18} className={item.user_has_liked ? 'fill-current' : ''} />
          </button>
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{item.founder_name}</p>
            {item.company_name && (
              <p className="text-xs text-text-muted">{item.company_name}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Price:</span>
            <span className="font-bold text-primary text-lg">{formatPrice(item.price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Likes:</span>
            <span className="font-semibold text-red-500 flex items-center space-x-1">
              <Heart size={14} className={item.user_has_liked ? 'fill-current' : ''} />
              <span>{item.likes_count}</span>
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Views:</span>
            <span className="font-semibold text-blue-500">{item.views_count}</span>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-3">
          <button
            onClick={() => handleViewItem(item)}
            className="flex-1 py-2 px-4 bg-light-card border border-light-border rounded-lg text-text-primary font-medium hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 text-sm"
          >
            View Details
          </button>
          <button
            onClick={() => handlePurchase(item)}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:scale-105 transition-all duration-300 text-sm shadow-lg flex items-center justify-center space-x-1"
          >
            <ShoppingCart size={14} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ProjectModal = ({ item, onClose }: { item: MarketplaceItem; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-3xl font-bold text-text-primary">{item.title}</h2>
                {item.is_featured && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Crown size={12} />
                    <span>FEATURED</span>
                  </div>
                )}
              </div>
              <p className="text-text-secondary">by {item.founder_name}</p>
              {item.company_name && (
                <p className="text-text-muted text-sm">{item.company_name}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors duration-300 text-2xl p-2"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Project Description</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Category</h4>
                  <p className="text-text-secondary">{item.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Project Type</h4>
                  <p className="text-text-secondary">{item.project_type}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Business Model</h4>
                  <p className="text-text-secondary">{item.business_model}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Registered</h4>
                  <p className="text-text-secondary">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">Development Team</h4>
                <p className="text-text-secondary">{item.developers}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {item.demo_link && (
                  <a
                    href={item.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    <span>View Demo</span>
                  </a>
                )}
                {item.presentation_video && (
                  <a
                    href={item.presentation_video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    <Video size={16} />
                    <span>Watch Video</span>
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-light-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Purchase Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Price:</span>
                    <span className="font-bold text-primary text-xl">{formatPrice(item.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Likes:</span>
                    <span className="font-semibold text-red-500 flex items-center space-x-1">
                      <Heart size={16} className={item.user_has_liked ? 'fill-current' : ''} />
                      <span>{item.likes_count}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Views:</span>
                    <span className="font-semibold text-blue-500">{item.views_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Purchases:</span>
                    <span className="font-semibold text-green-500">{item.purchase_count}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => handleLike(item)}
                    disabled={likeLoading === item.id}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      item.user_has_liked 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-red-50 text-red-500 hover:bg-red-100'
                    } ${likeLoading === item.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Heart size={18} className={item.user_has_liked ? 'fill-current' : ''} />
                    <span>{item.user_has_liked ? 'Liked' : 'Like'}</span>
                  </button>
                  <button
                    onClick={() => handlePurchase(item)}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={18} />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

              <div className="bg-light-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Project Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Category:</span>
                    <span className="font-medium text-text-primary">{item.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Status:</span>
                    <span className="font-medium text-green-600 capitalize">{item.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Listed:</span>
                    <span className="font-medium text-text-primary">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LeaderboardModal = ({ onClose }: { onClose: () => void }) => {
    const leaderboardItems = getLeaderboardItems();
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Crown size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">Project Leaderboard</h2>
                  <p className="text-text-secondary">Top projects ranked by community likes</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary transition-colors duration-300 text-2xl p-2"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {leaderboardItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-light-card border-light-border hover:border-primary/30'
                  }`}
                  onClick={() => {
                    onClose();
                    handleViewItem(item);
                  }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                    index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
                    'bg-gradient-to-r from-blue-500 to-blue-700'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <img 
                    src={item.thumbnail_url} 
                    alt={item.title}
                    className="w-16 h-10 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary line-clamp-1">{item.title}</h4>
                    <p className="text-text-muted text-sm">{item.founder_name}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-red-500 font-bold">
                      <Heart size={16} className="fill-current" />
                      <span>{item.likes_count}</span>
                    </div>
                    <p className="text-text-muted text-xs">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={onBack}
              className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
            >
              ←
            </button>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Innovation Marketplace</h1>
              <p className="text-text-secondary text-lg">Discover, invest in, and auction innovative registered projects</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl border border-light-border p-2 mb-6 shadow-sm">
            <div className="flex space-x-2">
              {[
                { id: 'marketplace', label: 'All Projects', icon: ShoppingCart },
                { id: 'trending', label: 'Trending', icon: TrendingUp },
                { id: 'featured', label: 'Featured', icon: Crown },
                { id: 'auctions', label: 'Live Auctions', icon: Gavel }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-text-secondary hover:text-text-primary hover:bg-light-hover'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-light-border p-4 text-center">
              <div className="text-2xl font-bold text-primary">{items.length}</div>
              <div className="text-text-muted text-sm">Total Projects</div>
            </div>
            <div className="bg-white rounded-xl border border-light-border p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{items.reduce((sum, item) => sum + item.likes_count, 0)}</div>
              <div className="text-text-muted text-sm">Total Likes</div>
            </div>
            <div className="bg-white rounded-xl border border-light-border p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{items.reduce((sum, item) => sum + item.views_count, 0)}</div>
              <div className="text-text-muted text-sm">Total Views</div>
            </div>
            <div className="bg-white rounded-xl border border-light-border p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{items.filter(item => item.is_featured).length}</div>
              <div className="text-text-muted text-sm">Featured</div>
            </div>
          </div>

          {/* Filters and Search - Only show for non-auction tabs */}
          {activeTab !== 'auctions' && (
            <div className="bg-white rounded-2xl border border-light-border p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
                    <input
                      type="text"
                      placeholder="Search projects, founders, or categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary bg-white min-w-[150px]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary bg-white min-w-[180px]"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        viewMode === 'grid' ? 'bg-primary text-white' : 'bg-light-card text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        viewMode === 'list' ? 'bg-primary text-white' : 'bg-light-card text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => setShowLeaderboard(true)}
                    className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Crown size={18} />
                    <span>Leaderboard</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'auctions' ? (
          <AuctionSystem onBid={handleBid} onViewItem={handleViewItem} />
        ) : (
          <>
            {/* Results */}
            <div className="mb-6">
              <p className="text-text-secondary">
                Showing {filteredItems.length} of {items.length} projects
                {activeTab === 'trending' && ' (most liked)'}
                {activeTab === 'featured' && ' (featured projects)'}
                {selectedSort === 'trending' && activeTab === 'marketplace' && ' (sorted by most liked)'}
              </p>
            </div>

            {/* Projects Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading marketplace...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-light-border">
                <Lightbulb size={48} className="mx-auto mb-4 text-text-muted" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Projects Found</h3>
                <p className="text-text-secondary">Try adjusting your search criteria or browse all categories</p>
              </div>
            ) : (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredItems.map((item) => (
                  <ProjectCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Project Detail Modal */}
        {selectedItem && (
          <ProjectModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}

        {/* Leaderboard Modal */}
        {showLeaderboard && (
          <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
        )}
      </div>
    </div>
  );
};

export default Marketplace;