import { useState } from 'react';
import { Auth } from './components/Auth';
import { useAuth } from './contexts/AuthContext';
import VideoPlayer from '../../components/video-streaming-platform/src/components/VideoPlayer';
import type { Video } from '../../components/video-streaming-platform/src/types/Video';
import {
  User,
  LogOut,
  Home,
  Compass,
  TrendingUp,
  Info,
  Menu,
  X,
  Rocket,
  BarChart3,
  Users,
  Wallet,
  Bell,
  Settings,
  Search
} from 'lucide-react';
import { WalletConnect } from './components/WalletConnect';
import { PitchForm } from './components/PitchForm';

export default function App() {
  const { user, loading, signOut } = useAuth();
  const [selectedSection, setSelectedSection] = useState<
    'dashboard' | 'discover' | 'invest' | 'stats' | 'community' | 'wallet' | 'about'
  >('dashboard');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New investment received', time: '2m ago' },
    { id: 2, text: 'Your pitch was viewed 100 times', time: '1h ago' },
  ]);

  // Mock video data for investment stream (unchanged)
  const mockVideo: Video = {
    id: '1',
    title: 'Demo Startup Pitch',
    channel: 'Demo Founder',
    views: '1.2K',
    timestamp: '2 hours ago',
    duration: '4:20',
    thumbnail: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&w=400',
    channelAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    description: 'This is a demo pitch for a revolutionary startup!',
    likes: '120',
    dislikes: '2',
    subscribers: '1.5K',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    filecoinCID: 'bafybeigdyrzt3...',
    dealInfo: {
      dealId: 'deal_123',
      provider: 'f01234',
      price: '0.005 FIL',
      status: 'active',
    },
  };
  const mockUpNext: Video[] = [
    {
      id: '2',
      title: 'Next Big Thing',
      channel: 'Innovator',
      views: '800',
      timestamp: '1 day ago',
      duration: '3:10',
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&w=400',
      channelAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      description: 'Pitch for the next big thing!',
      likes: '80',
      dislikes: '1',
      subscribers: '900',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      filecoinCID: 'bafybeigdyrzt4...',
      dealInfo: {
        dealId: 'deal_124',
        provider: 'f05678',
        price: '0.003 FIL',
        status: 'active',
      },
    },
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<Video[]>([mockVideo, ...mockUpNext]);
  const handleVideoUpload = (video: Video) => setVideos((prev) => [...prev, video]);
  const handleNextVideo = () => setCurrentVideoIndex((prev) => (prev + 1 < videos.length ? prev + 1 : prev));
  const handleVideoSelect = (index: number) => { if (index < videos.length) setCurrentVideoIndex(index); };
  const handleWalletConnection = (connected: boolean, address: string = '') => { setWalletConnected(connected); setWalletAddress(address); };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Auth />;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview of your activities' },
    { id: 'discover', label: 'Discover', icon: Compass, description: 'Find new projects' },
    { id: 'invest', label: 'Invest', icon: TrendingUp, description: 'Investment opportunities' },
    { id: 'stats', label: 'Analytics', icon: BarChart3, description: 'Performance metrics' },
    { id: 'community', label: 'Community', icon: Users, description: 'Connect with others' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, description: 'Manage your funds' },
    { id: 'about', label: 'About', icon: Info, description: 'Platform information' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <Rocket size={20} className="text-primary-foreground" />
              </div>
              <span className="font-semibold text-xl tracking-tight">Bolt</span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects, founders, or investors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-md bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-input text-sm"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id as typeof selectedSection)}
                    className={`
                      group relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${selectedSection === item.id 
                        ? 'bg-secondary text-secondary-foreground' 
                        : 'hover:bg-secondary/80 text-muted-foreground hover:text-secondary-foreground'
                      }
                    `}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                    {/* Tooltip */}
                    <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg whitespace-nowrap">
                      {item.description}
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-md hover:bg-secondary/80 text-muted-foreground hover:text-secondary-foreground">
                  <Bell size={18} />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>
              </div>

              {/* Settings */}
              <button className="p-2 rounded-md hover:bg-secondary/80 text-muted-foreground hover:text-secondary-foreground">
                <Settings size={18} />
              </button>

              {/* User Profile */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Founder</p>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={signOut}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden lg:block">Sign Out</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-secondary/80 rounded-md"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 bg-background border-b md:hidden">
          <div className="container py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-md bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                />
              </div>
            </div>

            {/* Mobile Nav Items */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedSection(item.id as typeof selectedSection);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors
                      ${selectedSection === item.id 
                        ? 'bg-secondary text-secondary-foreground' 
                        : 'hover:bg-secondary/80 text-muted-foreground hover:text-secondary-foreground'
                      }
                    `}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{item.description}</span>
                  </button>
                );
              })}
            </nav>

            <hr className="my-4 border-border" />

            {/* Mobile User Menu */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">Founder</p>
                </div>
              </div>

              <button
                onClick={signOut}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto pt-20 pb-16">
        {selectedSection === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Welcome back!</h1>
              <p className="text-lg text-muted-foreground">
                Here's what's happening with your projects and investments.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg border p-6 space-y-2">
                <h3 className="text-lg font-medium">Total Investment</h3>
                <p className="text-3xl font-bold">$24,500</p>
                <p className="text-sm text-muted-foreground">Across 12 projects</p>
              </div>
              <div className="bg-card rounded-lg border p-6 space-y-2">
                <h3 className="text-lg font-medium">Active Pitches</h3>
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">2 pending review</p>
              </div>
              <div className="bg-card rounded-lg border p-6 space-y-2">
                <h3 className="text-lg font-medium">Portfolio Growth</h3>
                <p className="text-3xl font-bold text-green-500">+15.4%</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="bg-card rounded-lg border p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Connect Wallet</h2>
                <button className="text-sm text-muted-foreground hover:text-foreground">
                  Learn more
                </button>
              </div>
              <WalletConnect onWalletConnection={handleWalletConnection} />
              {walletConnected && <PitchForm walletAddress={walletAddress} />}
            </div>
          </div>
        )}

        {selectedSection === 'discover' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Discover Projects</h2>
                <p className="text-muted-foreground">Find and support innovative startups.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-md">
                  Filter
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
                  + Add Project
                </button>
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project Cards will go here */}
            </div>
          </div>
        )}

        {selectedSection === 'invest' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Investment Opportunities</h2>
                <p className="text-muted-foreground">Watch pitch videos and invest in promising startups.</p>
              </div>
            </div>
            <VideoPlayer
              video={videos[currentVideoIndex]}
              upNextVideos={videos.slice(currentVideoIndex + 1)}
              onVideoUpload={handleVideoUpload}
              onNextVideo={handleNextVideo}
              onVideoSelect={handleVideoSelect}
              currentVideoIndex={currentVideoIndex}
            />
          </div>
        )}

        {/* Add other sections here */}
      </main>
    </div>
  );
}
