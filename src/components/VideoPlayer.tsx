import React, { useState, useRef, useEffect } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share, 
  MoreHorizontal,
  Bell,
  ChevronDown,
  ChevronUp,
  Upload,
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipForward,
  SkipBack,
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Heart,
  Bookmark,
  Send,
  Zap,
  Star,
  Award,
  Sparkles,
  Database,
  Globe,
  Shield,
  Clock,
  Quote,
  PieChart,
  BarChart3,
  Calculator
} from 'lucide-react';
import { Video } from '../types/Video';

interface VideoPlayerProps {
  video: Video;
  upNextVideos: Video[];
  onVideoUpload: (video: Video) => void;
  onNextVideo: () => void;
  onVideoSelect: (index: number) => void;
  currentVideoIndex: number;
  isInvestmentFocused?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  video, 
  upNextVideos, 
  onVideoUpload, 
  onNextVideo, 
  onVideoSelect, 
  currentVideoIndex,
  isInvestmentFocused = false
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  // Investment states
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedInvestmentTier, setSelectedInvestmentTier] = useState('');
  const [showInvestmentSuccess, setShowInvestmentSuccess] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Investment tiers
  const investmentTiers = [
    { name: 'Starter', min: 1000, max: 9999, benefits: ['Basic portfolio access', 'Monthly reports'], color: 'text-blue-600', icon: Star },
    { name: 'Growth', min: 10000, max: 49999, benefits: ['All Starter benefits', 'Quarterly calls', 'Priority support'], color: 'text-purple-600', icon: Award },
    { name: 'Premium', min: 50000, max: 199999, benefits: ['All Growth benefits', 'Direct advisor access', 'Custom strategies'], color: 'text-pink-600', icon: Sparkles },
    { name: 'Elite', min: 200000, max: Infinity, benefits: ['All Premium benefits', 'Exclusive deals', 'Personal portfolio manager'], color: 'text-yellow-600', icon: Zap }
  ];

  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    setCurrentTime(videoElement.currentTime);
  };

  const handleLoadedMetadata = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    setDuration(videoElement.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const time = parseFloat(e.target.value);
    videoElement.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const vol = parseFloat(e.target.value);
    videoElement.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    if (isMuted) {
      videoElement.volume = volume;
      setIsMuted(false);
    } else {
      videoElement.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = (rate: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const skipTime = (seconds: number) => {
    const videoElement = videoRef.current;
    if (!videoElement || !isFinite(videoElement.duration)) return;
    videoElement.currentTime = Math.max(0, Math.min(videoElement.duration, videoElement.currentTime + seconds));
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInvestmentTier = (amount: number) => {
    return investmentTiers.find(tier => amount >= tier.min && amount <= tier.max);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleInvestment = () => {
    const amount = parseFloat(investmentAmount);
    if (amount && amount >= 1000) {
      setInvestmentAmount('');
      setSelectedInvestmentTier('');
      setShowInvestmentSuccess(true);
      setTimeout(() => setShowInvestmentSuccess(false), 3000);
    } else {
      alert('Minimum investment amount is $1,000');
    }
  };

  return (
    <div className="py-8 fade-in bg-light-bg">
      <div className="flex flex-col xl:flex-row gap-8 px-6 sm:px-8 lg:px-12">
        {/* Main Video Section */}
        <div className="flex-1 max-w-none">
          {/* Video Player */}
          <div 
            ref={playerRef}
            className="relative bg-black rounded-2xl overflow-hidden mb-8 group shadow-2xl card-hover"
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.thumbnail}
              className="w-full aspect-video object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Investment Badge */}
            {isInvestmentFocused && video.investmentData && (
              <div className="absolute top-6 left-6 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center space-x-3">
                <DollarSign size={18} className="text-white" />
                <span className="text-white font-medium">Investment Opportunity</span>
              </div>
            )}
            
            {/* Video Controls Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* Center Play Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={togglePlay}
                    className="w-24 h-24 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 shadow-2xl pulse-glow ripple"
                  >
                    <Play size={36} className="text-white ml-1" />
                  </button>
                </div>
              )}

              {/* Bottom Controls */}
              <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-300 ${showControls ? 'controls-fade-in' : 'controls-fade-out'}`}>
                {/* Progress Bar */}
                <div className="mb-8">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <button onClick={togglePlay} className="text-white hover:text-primary transition-all duration-300 scale-hover ripple p-3 rounded-lg">
                      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                    
                    <button onClick={() => skipTime(-10)} className="text-white hover:text-primary transition-all duration-300 scale-hover ripple p-3 rounded-lg">
                      <SkipBack size={28} />
                    </button>
                    
                    <button onClick={() => skipTime(10)} className="text-white hover:text-primary transition-all duration-300 scale-hover ripple p-3 rounded-lg">
                      <SkipForward size={28} />
                    </button>

                    <div className="flex items-center space-x-4">
                      <button onClick={toggleMute} className="text-white hover:text-primary transition-all duration-300 scale-hover ripple p-3 rounded-lg">
                        {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div className="text-white text-base font-mono bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-white hover:text-primary transition-all duration-300 p-3 rounded-lg hover:bg-white/10 scale-hover"
                      >
                        <Settings size={28} />
                      </button>
                      
                      {showSettings && (
                        <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl w-64 py-4 border border-light-border bounce-in">
                          <div className="px-6 py-3 text-base font-semibold text-text-secondary">Playback Speed</div>
                          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => changePlaybackRate(rate)}
                              className={`w-full text-left px-6 py-3 hover:bg-primary/10 text-base transition-all duration-300 ripple ${
                                playbackRate === rate ? 'text-primary bg-primary/10' : 'text-text-primary'
                              }`}
                            >
                              {rate === 1 ? 'Normal' : `${rate}x`}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="mb-8 slide-in-left">
            <h1 className="text-3xl font-bold mb-6 text-text-primary">{video.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center space-x-6 text-text-secondary">
                <span className="font-medium text-lg">{video.views}</span>
                {video.category && (
                  <span className={`px-4 py-2 rounded-xl text-base font-medium ${
                    video.category === 'investment' ? 'bg-primary/10 text-primary' :
                    video.category === 'analysis' ? 'bg-secondary/10 text-secondary' :
                    video.category === 'education' ? 'bg-accent/10 text-accent' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-3 px-8 py-4 bg-white border border-light-border hover:bg-primary/10 hover:border-primary/30 rounded-xl transition-all duration-300 btn-animate ripple shadow-sm ${
                    isLiked ? 'text-primary bg-primary/10 border-primary/30' : ''
                  }`}
                >
                  <Heart size={22} className={isLiked ? 'fill-current' : ''} />
                  <span className="font-medium text-lg">{video.likes}</span>
                </button>
                
                <button 
                  onClick={handleDislike}
                  className={`flex items-center space-x-3 px-8 py-4 bg-white border border-light-border hover:bg-red-50 hover:border-red-200 rounded-xl transition-all duration-300 btn-animate ripple shadow-sm ${
                    isDisliked ? 'text-red-600 bg-red-50 border-red-200' : ''
                  }`}
                >
                  <ThumbsDown size={22} className={isDisliked ? 'fill-current' : ''} />
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-3 px-8 py-4 bg-white border border-light-border hover:bg-primary/10 hover:border-primary/30 rounded-xl transition-all duration-300 btn-animate ripple shadow-sm"
                  >
                    <Share size={22} />
                    <span className="font-medium text-lg">Share</span>
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute top-full mt-3 right-0 bg-white rounded-xl shadow-2xl w-56 py-4 border border-light-border bounce-in z-10">
                      <button className="w-full text-left px-6 py-3 hover:bg-light-hover text-base transition-all duration-300 ripple">Copy Link</button>
                      <button className="w-full text-left px-6 py-3 hover:bg-light-hover text-base transition-all duration-300 ripple">Share on Twitter</button>
                      <button className="w-full text-left px-6 py-3 hover:bg-light-hover text-base transition-all duration-300 ripple">Share on LinkedIn</button>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleSave}
                  className={`flex items-center space-x-3 px-8 py-4 bg-white border border-light-border hover:bg-secondary/10 hover:border-secondary/30 rounded-xl transition-all duration-300 btn-animate ripple shadow-sm ${
                    isSaved ? 'text-secondary bg-secondary/10 border-secondary/30' : ''
                  }`}
                >
                  <Bookmark size={22} className={isSaved ? 'fill-current' : ''} />
                  <span className="font-medium text-lg">Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Investment Data Panel */}
          {isInvestmentFocused && video.investmentData && (
            <div className="bg-white rounded-2xl p-8 mb-8 border border-light-border slide-in-right shadow-sm">
              <div className="flex items-center space-x-4 mb-8">
                <PieChart size={28} className="text-primary" />
                <h3 className="text-2xl font-semibold text-text-primary">Investment Overview</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center p-6 bg-primary/5 border border-primary/20 rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-3">{video.investmentData.returnRate}</div>
                  <div className="text-base text-text-secondary">Expected Return</div>
                </div>
                <div className="text-center p-6 bg-secondary/5 border border-secondary/20 rounded-xl">
                  <div className="text-3xl font-bold text-secondary mb-3">{video.investmentData.totalRaised}</div>
                  <div className="text-base text-text-secondary">Total Raised</div>
                </div>
                <div className="text-center p-6 bg-accent/5 border border-accent/20 rounded-xl">
                  <div className="text-3xl font-bold text-accent mb-3">{video.investmentData.investorsCount}</div>
                  <div className="text-base text-text-secondary">Investors</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-text-primary mb-4 text-lg">Fund Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Fund Name:</span>
                      <span className="text-text-primary font-medium">{video.investmentData.fundName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Risk Level:</span>
                      <span className={`font-medium ${
                        video.investmentData.riskLevel === 'Low' ? 'text-green-600' :
                        video.investmentData.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{video.investmentData.riskLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Min. Investment:</span>
                      <span className="text-text-primary font-medium">{video.investmentData.minInvestment}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-text-primary mb-4 text-lg">Quick Actions</h4>
                  <div className="space-y-4">
                    <button className="w-full px-6 py-3 bg-primary hover:bg-primary-dark rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg">
                      <Calculator size={18} />
                      <span>Calculate Returns</span>
                    </button>
                    <button className="w-full px-6 py-3 bg-white border border-primary/30 rounded-xl text-primary font-medium hover:bg-primary/10 transition-all duration-300 flex items-center justify-center space-x-3">
                      <BarChart3 size={18} />
                      <span>View Analytics</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Channel Info */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-light-border slide-in-right shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src={video.channelAvatar} 
                    alt={video.channel}
                    className="w-20 h-20 rounded-full ring-2 ring-primary/30 morph-shape"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full border-2 border-white pulse-glow"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-text-primary">{video.channel}</h3>
                  <p className="text-text-secondary text-lg">{video.subscribers} subscribers</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 btn-animate ripple text-lg shadow-lg ${
                    isSubscribed 
                      ? 'bg-white border border-light-border text-text-secondary hover:bg-light-hover' 
                      : 'bg-primary hover:bg-primary-dark text-white hover:scale-105'
                  }`}
                >
                  <Zap size={20} />
                  <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
                </button>
              </div>
            </div>
            
            {/* Description */}
            <div className="text-text-secondary">
              <p className={`leading-relaxed text-lg transition-all duration-500 ${showDescription ? '' : 'line-clamp-3'}`}>
                {video.description}
              </p>
              <button 
                onClick={() => setShowDescription(!showDescription)}
                className="flex items-center space-x-2 text-primary hover:text-primary-dark mt-4 transition-all duration-300 font-medium scale-hover text-lg"
              >
                <span>{showDescription ? 'Show less' : 'Show more'}</span>
                {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="xl:w-[480px] space-y-8 slide-in-right">
          {/* Investment Section */}
          {isInvestmentFocused && video.investmentData && (
            <div className="bg-white rounded-2xl p-8 border border-light-border relative overflow-hidden shadow-sm">
              {/* Success notification */}
              {showInvestmentSuccess && (
                <div className="absolute top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg bounce-in z-10">
                  <div className="flex items-center space-x-3">
                    <Sparkles size={18} />
                    <span className="font-medium">Investment submitted!</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center pulse-glow">
                  <DollarSign size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Invest Now</h3>
              </div>

              {/* Investment Tiers */}
              <div className="mb-8">
                <h4 className="font-semibold mb-6 text-text-primary text-lg">Investment Tiers</h4>
                <div className="space-y-4">
                  {investmentTiers.map((tier, index) => {
                    const IconComponent = tier.icon;
                    return (
                      <div 
                        key={tier.name}
                        className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 stagger-item card-hover ${
                          selectedInvestmentTier === tier.name 
                            ? 'border-secondary bg-secondary/10' 
                            : 'border-light-border hover:border-primary/50 hover:bg-primary/5'
                        }`}
                        onClick={() => setSelectedInvestmentTier(tier.name)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-3">
                            <IconComponent size={18} className={tier.color} />
                            <span className={`font-semibold text-lg ${tier.color}`}>
                              {tier.name}
                            </span>
                          </div>
                          <span className="text-text-muted font-mono">
                            {formatCurrency(tier.min)}{tier.max !== Infinity ? ` - ${formatCurrency(tier.max)}` : '+'}
                          </span>
                        </div>
                        <div className="text-sm text-text-secondary">
                          {tier.benefits.slice(0, 2).join(' • ')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Investment Input */}
              <div className="space-y-6">
                <input
                  type="number"
                  placeholder="Enter amount ($1,000 minimum)"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-light-border rounded-xl focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 text-text-primary placeholder-text-muted font-mono transition-all duration-300 text-lg shadow-sm"
                  min="1000"
                />
                {investmentAmount && getInvestmentTier(parseFloat(investmentAmount)) && (
                  <div className="text-base text-secondary font-semibold flex items-center space-x-3 bounce-in">
                    <Zap size={18} />
                    <span>{getInvestmentTier(parseFloat(investmentAmount))?.name} Tier Selected</span>
                  </div>
                )}
                <button
                  onClick={handleInvestment}
                  disabled={!investmentAmount || parseFloat(investmentAmount) < 1000}
                  className="w-full py-4 bg-secondary hover:bg-secondary-dark hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-xl font-semibold text-white transition-all duration-300 btn-animate ripple text-lg shadow-lg"
                >
                  Invest Now
                </button>
              </div>
              
              <p className="text-sm text-text-muted mt-6 text-center">
                * Investment subject to terms and conditions
              </p>
            </div>
          )}

          {/* Up Next Section */}
          <div className="bg-white rounded-2xl p-8 border border-light-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-2xl text-text-primary">Up Next</h3>
              <span className="text-base text-text-secondary">{upNextVideos.length} videos</span>
            </div>
            
            {/* Scrollable container for videos */}
            <div className={`space-y-6 ${upNextVideos.length > 3 ? 'max-h-[600px] overflow-y-auto pr-3' : ''}`}>
              {upNextVideos.map((upNextVideo, index) => (
                <div 
                  key={upNextVideo.id} 
                  className="flex space-x-4 cursor-pointer hover:bg-primary/5 p-4 rounded-xl transition-all duration-300 card-hover stagger-item border border-transparent hover:border-primary/20"
                  onClick={() => onVideoSelect(currentVideoIndex + index + 1)}
                >
                  <div className="relative flex-shrink-0">
                    <img 
                      src={upNextVideo.thumbnail} 
                      alt={upNextVideo.title}
                      className="w-48 aspect-video object-cover rounded-xl video-thumbnail"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-3 py-1 rounded-lg font-mono backdrop-blur-sm">
                      {upNextVideo.duration}
                    </div>
                    {upNextVideo.category && (
                      <div className={`absolute top-3 left-3 backdrop-blur-sm rounded-lg px-3 py-1 ${
                        upNextVideo.category === 'investment' ? 'bg-primary/90' :
                        upNextVideo.category === 'analysis' ? 'bg-secondary/90' :
                        upNextVideo.category === 'education' ? 'bg-accent/90' :
                        'bg-gray-500/90'
                      }`}>
                        <span className="text-white text-sm font-medium">
                          {upNextVideo.category.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base line-clamp-2 mb-3 text-text-primary">{upNextVideo.title}</h4>
                    <p className="text-text-secondary text-sm mb-2 font-medium">{upNextVideo.channel}</p>
                    <div className="flex items-center space-x-2 text-text-muted text-sm">
                      <span>{upNextVideo.views}</span>
                      <span>•</span>
                      <span>{upNextVideo.timestamp}</span>
                      {upNextVideo.investmentData && (
                        <>
                          <span>•</span>
                          <span className="text-primary font-medium">{upNextVideo.investmentData.returnRate}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {upNextVideos.length === 0 && (
                <div className="text-center text-text-muted py-12">
                  <TrendingUp size={56} className="mx-auto mb-6 opacity-50 float-animation" />
                  <p className="font-medium text-lg">No more videos in queue</p>
                  <p className="text-base mt-2">Explore more investment opportunities</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;