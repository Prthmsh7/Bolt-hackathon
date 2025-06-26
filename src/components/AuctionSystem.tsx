import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  Clock, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Crown, 
  Zap, 
  Timer,
  Heart,
  Eye,
  Award,
  Sparkles,
  ArrowUpRight,
  Target,
  Flame
} from 'lucide-react';

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  founder_name: string;
  category: string;
  thumbnail_url: string;
  current_bid: number;
  min_bid: number;
  bid_count: number;
  time_remaining: number;
  likes_count: number;
  views_count: number;
  is_featured: boolean;
  highest_bidder?: string;
}

interface AuctionSystemProps {
  onBid: (itemId: string, amount: number) => void;
  onViewItem: (item: AuctionItem) => void;
}

const AuctionSystem: React.FC<AuctionSystemProps> = ({ onBid, onViewItem }) => {
  const [currentAuction, setCurrentAuction] = useState<AuctionItem | null>(null);
  const [upcomingAuctions, setUpcomingAuctions] = useState<AuctionItem[]>([]);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  // Mock auction data - in real app this would come from your backend
  useEffect(() => {
    const mockCurrentAuction: AuctionItem = {
      id: '1',
      title: 'AI-Powered Analytics Platform',
      description: 'Revolutionary AI platform for real-time data analytics with machine learning capabilities.',
      founder_name: 'Sarah Johnson',
      category: 'AI/ML',
      thumbnail_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
      current_bid: 75000,
      min_bid: 50000,
      bid_count: 23,
      time_remaining: 3600, // 1 hour in seconds
      likes_count: 156,
      views_count: 2340,
      is_featured: true,
      highest_bidder: 'investor_xyz'
    };

    const mockUpcoming: AuctionItem[] = [
      {
        id: '2',
        title: 'Blockchain Security Protocol',
        description: 'Next-generation security protocol for blockchain applications.',
        founder_name: 'James Park',
        category: 'Blockchain',
        thumbnail_url: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        current_bid: 0,
        min_bid: 80000,
        bid_count: 0,
        time_remaining: 86400, // 24 hours
        likes_count: 89,
        views_count: 1560,
        is_featured: false
      },
      {
        id: '3',
        title: 'FinTech Payment Solution',
        description: 'Revolutionary payment processing system for modern businesses.',
        founder_name: 'Emma Davis',
        category: 'Fintech',
        thumbnail_url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        current_bid: 0,
        min_bid: 60000,
        bid_count: 0,
        time_remaining: 172800, // 48 hours
        likes_count: 124,
        views_count: 1890,
        is_featured: true
      }
    ];

    setCurrentAuction(mockCurrentAuction);
    setUpcomingAuctions(mockUpcoming);
    setTimeLeft(mockCurrentAuction.time_remaining);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auction ended - in real app, trigger new auction
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBid = () => {
    if (!currentAuction || !bidAmount) return;
    
    const amount = parseFloat(bidAmount);
    if (amount <= currentAuction.current_bid) {
      alert('Bid must be higher than current bid');
      return;
    }

    onBid(currentAuction.id, amount);
    setBidAmount('');
  };

  const getMinimumBid = () => {
    if (!currentAuction) return 0;
    return currentAuction.current_bid > 0 
      ? currentAuction.current_bid + 1000 
      : currentAuction.min_bid;
  };

  if (!currentAuction) return null;

  return (
    <div className="space-y-8">
      {/* Current Auction - Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl border border-primary/20 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Gavel size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-text-primary">Live Auction</h2>
              <p className="text-text-secondary text-lg">Today's featured innovation share</p>
            </div>
            <div className="ml-auto flex items-center space-x-3">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>LIVE</span>
              </div>
              {currentAuction.is_featured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2">
                  <Crown size={16} />
                  <span>FEATURED</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Auction Item */}
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={currentAuction.thumbnail_url}
                  alt={currentAuction.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentAuction.category}
                </div>
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                    <Eye size={12} />
                    <span>{currentAuction.views_count}</span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                    <Heart size={12} className="fill-current text-red-400" />
                    <span>{currentAuction.likes_count}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">{currentAuction.title}</h3>
                <p className="text-text-secondary mb-4">{currentAuction.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-primary" />
                    </div>
                    <span className="text-text-primary font-medium">{currentAuction.founder_name}</span>
                  </div>
                  <button
                    onClick={() => onViewItem(currentAuction)}
                    className="text-primary hover:text-primary-dark font-medium transition-colors duration-300"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>

            {/* Bidding Section */}
            <div className="space-y-6">
              {/* Timer */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-text-primary">Time Remaining</h4>
                  <Timer className="text-red-500" size={24} />
                </div>
                <div className="text-4xl font-bold text-red-500 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.max(10, (timeLeft / currentAuction.time_remaining) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Bid */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-text-primary">Current Bid</h4>
                  <TrendingUp className="text-green-500" size={24} />
                </div>
                <div className="text-4xl font-bold text-green-500 mb-2">
                  {formatCurrency(currentAuction.current_bid)}
                </div>
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>{currentAuction.bid_count} bids</span>
                  {currentAuction.highest_bidder && (
                    <span>by {currentAuction.highest_bidder}</span>
                  )}
                </div>
              </div>

              {/* Place Bid */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-text-primary mb-4">Place Your Bid</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Bid Amount (minimum: {formatCurrency(getMinimumBid())})
                    </label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={getMinimumBid().toString()}
                      min={getMinimumBid()}
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary font-mono text-lg"
                    />
                  </div>
                  <button
                    onClick={handleBid}
                    disabled={!bidAmount || parseFloat(bidAmount) < getMinimumBid() || timeLeft <= 0}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-lg text-lg flex items-center justify-center space-x-2"
                  >
                    <Gavel size={20} />
                    <span>Place Bid</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Auctions */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary">Upcoming Auctions</h3>
              <p className="text-text-secondary">Next innovation shares to be auctioned</p>
            </div>
          </div>
          <div className="text-sm text-text-muted">
            {upcomingAuctions.length} upcoming
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingAuctions.map((item, index) => (
            <div 
              key={item.id}
              className="bg-light-card border border-light-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => onViewItem(item)}
            >
              <div className="relative mb-4">
                <img 
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Starts in {formatTime(item.time_remaining)}
                </div>
                {item.is_featured && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Crown size={10} />
                    <span>FEATURED</span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <Heart size={10} className="fill-current text-red-400" />
                    <span>{item.likes_count}</span>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-lg text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-text-secondary text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users size={12} className="text-primary" />
                  </div>
                  <span className="text-text-primary text-sm font-medium">{item.founder_name}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{formatCurrency(item.min_bid)}</div>
                  <div className="text-xs text-text-muted">Starting bid</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionSystem;