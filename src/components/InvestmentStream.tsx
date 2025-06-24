import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import { Video } from '../types/Video';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Play,
  Filter,
  Search
} from 'lucide-react';

interface InvestmentStreamProps {
  onBack: () => void;
}

const InvestmentStream: React.FC<InvestmentStreamProps> = ({ onBack }) => {
  // Investment-focused video queue
  const [videoQueue, setVideoQueue] = useState<Video[]>([
    {
      id: '1',
      title: 'Revolutionary FinTech Startup - Next Unicorn Opportunity',
      channel: 'Z Combinator Ventures',
      views: '2.4M views',
      timestamp: '1 day ago',
      duration: '18:45',
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      channelAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
      description: 'Discover the next big opportunity in financial technology. This revolutionary startup is transforming how people invest, with cutting-edge AI algorithms and blockchain integration. Early investors have already seen 300% returns in just 18 months.',
      likes: '89K',
      subscribers: '1.2M',
      category: 'investment',
      investmentData: {
        fundName: 'FinTech Innovation Fund',
        returnRate: '+347%',
        riskLevel: 'High',
        minInvestment: '$25,000',
        totalRaised: '$12.5M',
        investorsCount: 156
      }
    },
    {
      id: '2',
      title: 'Green Energy Portfolio - Sustainable Investment Strategy',
      channel: 'EcoInvest Partners',
      views: '1.8M views',
      timestamp: '2 days ago',
      duration: '22:15',
      thumbnail: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      channelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
      description: 'Invest in the future of clean energy with our diversified portfolio of solar, wind, and battery technology companies. Stable returns with positive environmental impact.',
      likes: '67K',
      subscribers: '890K',
      category: 'investment',
      investmentData: {
        fundName: 'Green Energy Portfolio',
        returnRate: '+24.8%',
        riskLevel: 'Low',
        minInvestment: '$10,000',
        totalRaised: '$45.2M',
        investorsCount: 892
      }
    },
    {
      id: '3',
      title: 'AI & Machine Learning Investment Opportunities 2024',
      channel: 'TechVenture Capital',
      views: '3.1M views',
      timestamp: '3 days ago',
      duration: '16:30',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      channelAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
      description: 'Explore the most promising AI and machine learning startups of 2024. From autonomous vehicles to healthcare AI, discover where the smart money is investing.',
      likes: '124K',
      subscribers: '2.1M',
      category: 'analysis',
      investmentData: {
        fundName: 'AI Innovation Fund',
        returnRate: '+156%',
        riskLevel: 'Medium',
        minInvestment: '$50,000',
        totalRaised: '$78.9M',
        investorsCount: 234
      }
    },
    {
      id: '4',
      title: 'Crypto Market Analysis - DeFi Investment Strategies',
      channel: 'BlockChain Ventures',
      views: '1.5M views',
      timestamp: '4 days ago',
      duration: '14:20',
      thumbnail: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      channelAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      description: 'Navigate the complex world of DeFi investments with expert analysis and proven strategies. Learn about yield farming, liquidity mining, and emerging protocols.',
      likes: '78K',
      subscribers: '1.5M',
      category: 'education',
      investmentData: {
        fundName: 'DeFi Diversified Fund',
        returnRate: '+89.3%',
        riskLevel: 'High',
        minInvestment: '$15,000',
        totalRaised: '$23.7M',
        investorsCount: 445
      }
    }
  ]);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Investments', icon: TrendingUp },
    { id: 'investment', label: 'Investment Opportunities', icon: DollarSign },
    { id: 'analysis', label: 'Market Analysis', icon: Target },
    { id: 'education', label: 'Investment Education', icon: Users }
  ];

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleVideoUpload = (uploadedVideo: Video) => {
    setVideoQueue(prevQueue => [...prevQueue, uploadedVideo]);
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videoQueue.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handleVideoSelect = (videoIndex: number) => {
    setCurrentVideoIndex(videoIndex);
  };

  const filteredVideos = videoQueue.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentVideo = filteredVideos[currentVideoIndex] || videoQueue[0];
  const upNextVideos = filteredVideos.slice(currentVideoIndex + 1);

  return (
    <div className={`min-h-screen bg-light-bg text-text-primary transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      {/* Header - Responsive design */}
      <header className="bg-white border-b border-light-border sticky top-0 z-50 slide-in-left shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 h-10 lg:w-12 h-12 bg-primary rounded-lg lg:rounded-xl flex items-center justify-center pulse-glow morph-shape">
                <TrendingUp size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">Investment Stream</h1>
                <p className="text-text-secondary text-sm sm:text-base lg:text-lg">Discover investment opportunities through video content</p>
              </div>
            </div>
            
            {/* Search and Filters - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="relative flex-1 sm:flex-initial">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search investments..."
                  className="pl-10 sm:pl-12 pr-4 sm:pr-6 py-2 sm:py-3 bg-white border border-light-border rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 text-text-primary placeholder-text-muted w-full sm:w-64 lg:w-80 shadow-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Filter size={16} className="sm:w-5 sm:h-5 text-text-muted flex-shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-light-border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 text-text-primary flex-1 sm:min-w-[180px] lg:min-w-[200px] shadow-sm"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id} className="bg-white">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Video Player - Responsive container */}
      {currentVideo && (
        <div className="max-w-[1600px] mx-auto">
          <VideoPlayer 
            video={currentVideo}
            upNextVideos={upNextVideos}
            onVideoUpload={handleVideoUpload}
            onNextVideo={handleNextVideo}
            onVideoSelect={handleVideoSelect}
            currentVideoIndex={currentVideoIndex}
            isInvestmentFocused={true}
          />
        </div>
      )}
    </div>
  );
};

export default InvestmentStream;