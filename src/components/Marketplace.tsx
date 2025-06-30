import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  TrendingUp, 
  Heart, 
  Eye, 
  Star, 
  User, 
  Building, 
  MapPin, 
  Calendar, 
  Code, 
  Github, 
  ExternalLink,
  ArrowUpRight,
  Award,
  Zap,
  Target,
  Crown,
  Flame,
  Sparkles,
  Users,
  DollarSign,
  ShoppingBag,
  Briefcase,
  Lightbulb,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  Phone,
  Wallet,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { demoProjects, developerProfiles, searchProjects, searchDevelopers, getDeveloperById, type DemoProject, type DeveloperProfile } from '../data/demoProjects';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { WalletConnect } from './WalletConnect';

interface MarketplaceProps {
  onBack: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'developers'>('projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'likes' | 'views' | 'price' | 'recent'>('likes');
  const [projects, setProjects] = useState<DemoProject[]>(demoProjects);
  const [developers, setDevelopers] = useState<DeveloperProfile[]>(developerProfiles);
  const [filteredProjects, setFilteredProjects] = useState<DemoProject[]>(demoProjects);
  const [filteredDevelopers, setFilteredDevelopers] = useState<DeveloperProfile[]>(developerProfiles);
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState<DeveloperProfile | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);
  const [investmentSuccess, setInvestmentSuccess] = useState(false);
  const [investmentError, setInvestmentError] = useState('');
  const [userPurchases, setUserPurchases] = useState<any[]>([]);

  const categories = [
    'all', 'AI/ML', 'Blockchain', 'Fintech', 'Healthtech', 'Edtech', 
    'E-commerce', 'SaaS', 'IoT', 'Cybersecurity', 'Gaming', 'Productivity'
  ];

  useEffect(() => {
    setIsLoaded(true);
    checkWalletConnection();
    if (user) {
      fetchUserPurchases();
    }
  }, [user]);

  // Check if wallet is already connected
  const checkWalletConnection = () => {
    const savedWalletState = localStorage.getItem('walletConnection');
    if (savedWalletState) {
      try {
        const { connected, address } = JSON.parse(savedWalletState);
        setWalletConnected(connected);
        setWalletAddress(address);
      } catch (error) {
        console.error('Error loading wallet state:', error);
      }
    }
  };

  // Fetch user's previous purchases
  const fetchUserPurchases = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('project_purchases')
        .select('*, marketplace_item:marketplace_item_id(*)')
        .eq('buyer_id', user.id);
      
      if (error) {
        console.error('Error fetching purchases:', error);
        return;
      }
      
      setUserPurchases(data || []);
    } catch (error) {
      console.error('Error in purchase fetch:', error);
    }
  };

  // Filter and search logic for projects
  useEffect(() => {
    let filtered = projects;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchProjects(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes_count - a.likes_count;
        case 'views':
          return b.views_count - a.views_count;
        case 'price':
          return a.price - b.price;
        case 'recent':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [searchQuery, selectedCategory, sortBy, projects]);

  // Filter developers
  useEffect(() => {
    let filtered = developers;

    // Apply search filter for developers
    if (searchQuery.trim()) {
      filtered = searchDevelopers(searchQuery);
    }

    setFilteredDevelopers(filtered);
  }, [searchQuery, developers]);

  const handleProjectClick = (project: DemoProject) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    setInvestmentAmount('');
    setInvestmentSuccess(false);
    setInvestmentError('');
  };

  const handleDeveloperClick = (developer: DeveloperProfile) => {
    setSelectedDeveloper(developer);
    setShowDeveloperModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleWalletConnection = (connected: boolean, address: string = '') => {
    setWalletConnected(connected);
    setWalletAddress(address);
    
    // Save wallet state to localStorage
    if (connected && address) {
      localStorage.setItem('walletConnection', JSON.stringify({ connected, address }));
      
      // Update user profile with wallet address if logged in
      if (user) {
        updateUserProfile(address);
      }
    } else {
      localStorage.removeItem('walletConnection');
    }
    
    setShowWalletModal(false);
  };

  const updateUserProfile = async (address: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          wallet_address: address,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error updating profile with wallet address:', error);
      } else {
        console.log('Profile updated with wallet address');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInvestment = async () => {
    if (!selectedProject) return;
    if (!user) {
      setInvestmentError('You must be signed in to invest in projects');
      return;
    }
    if (!walletConnected) {
      setShowWalletModal(true);
      return;
    }
    
    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      setInvestmentError('Please enter a valid investment amount');
      return;
    }
    
    setIsInvesting(true);
    setInvestmentError('');
    
    try {
      // Generate a mock transaction hash
      const txHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      // Record the purchase in the database
      const { data, error } = await supabase
        .from('project_purchases')
        .insert({
          buyer_id: user.id,
          marketplace_item_id: selectedProject.id,
          purchase_price: amount,
          transaction_hash: txHash,
          status: 'completed',
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString()
        })
        .select();
      
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }
      
      // Update purchase count for the marketplace item
      await supabase
        .from('marketplace_items')
        .update({ 
          purchase_count: selectedProject.purchase_count + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedProject.id);
      
      // Update local state
      setInvestmentSuccess(true);
      
      // Refresh user purchases
      fetchUserPurchases();
      
      // Update the selected project in state
      setSelectedProject({
        ...selectedProject,
        purchase_count: selectedProject.purchase_count + 1
      });
      
      // Update the projects list
      setProjects(projects.map(p => 
        p.id === selectedProject.id 
          ? { ...p, purchase_count: p.purchase_count + 1 } 
          : p
      ));
      
    } catch (error) {
      console.error('Investment error:', error);
      setInvestmentError(error instanceof Error ? error.message : 'Investment failed. Please try again.');
    } finally {
      setIsInvesting(false);
    }
  };

  const isProjectPurchased = (projectId: string) => {
    return userPurchases.some(purchase => 
      purchase.marketplace_item && purchase.marketplace_item.id === projectId
    );
  };

  const renderProjectCard = (project: DemoProject, index: number) => (
    <div 
      key={project.id} 
      className="bg-white rounded-2xl border border-light-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer card-hover stagger-item group" 
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => handleProjectClick(project)}
    >
      <div className="relative">
        <img 
          src={project.thumbnail_url} 
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
        <div className="absolute top-3 right-3">
          {project.is_featured && (
            <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <Crown size={12} />
              <span>FEATURED</span>
            </span>
          )}
          {isProjectPurchased(project.id) && (
            <span className="bg-success text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ml-2">
              <CheckCircle size={12} />
              <span>OWNED</span>
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <span className="text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Eye size={10} />
            <span>{project.views_count}</span>
          </div>
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Heart size={10} className={project.likes_count > 100 ? 'fill-current text-error' : ''} />
            <span>{project.likes_count}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="font-semibold text-lg text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
          {project.title}
        </h4>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium">{project.founder_name}</p>
            <p className="text-text-muted text-xs">{project.company_name}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Price:</span>
            <span className="font-semibold text-primary">{formatCurrency(project.price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Likes:</span>
            <span className="font-semibold text-error flex items-center space-x-1">
              <Heart size={12} className="fill-current" />
              <span>{project.likes_count}</span>
            </span>
          </div>
        </div>

        <button className="neo-btn w-full py-3 bg-secondary text-white font-medium hover:bg-secondary">
          {isProjectPurchased(project.id) ? 'View Details' : 'Invest Now'}
        </button>
      </div>
    </div>
  );

  const renderDeveloperCard = (developer: DeveloperProfile, index: number) => (
    <div 
      key={developer.id} 
      className="bg-white rounded-2xl border border-light-border p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer card-hover stagger-item group" 
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => handleDeveloperClick(developer)}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img 
            src={developer.avatar_url} 
            alt={developer.name}
            className="w-16 h-16 rounded-2xl ring-2 ring-primary/30 group-hover:scale-105 transition-transform duration-300"
          />
          {developer.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle size={12} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors duration-300">
              {developer.name}
            </h4>
            {developer.verified && (
              <CheckCircle size={16} className="text-success" />
            )}
          </div>
          <p className="text-text-secondary text-sm mb-1">@{developer.username}</p>
          <p className="text-text-muted text-xs">{developer.company} • {developer.location}</p>
        </div>
      </div>

      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{developer.bio}</p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">{developer.projects.length}</div>
          <div className="text-xs text-text-muted">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">{developer.total_likes}</div>
          <div className="text-xs text-text-muted">Total Likes</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">{developer.total_views}</div>
          <div className="text-xs text-text-muted">Total Views</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {developer.skills.slice(0, 3).map((skill, skillIndex) => (
          <span 
            key={skillIndex}
            className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {developer.skills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
            +{developer.skills.length - 3} more
          </span>
        )}
      </div>

      <button className="neo-btn w-full py-3 bg-secondary text-white font-medium hover:bg-secondary">
        View Profile
      </button>
    </div>
  );

  const renderProjectModal = () => {
    if (!selectedProject) return null;
    
    const isPurchased = isProjectPurchased(selectedProject.id);

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="neo-card bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header with Image */}
          <div className="relative h-64">
            <img 
              src={selectedProject.thumbnail_url}
              alt={selectedProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Close button */}
            <button
              onClick={() => setShowProjectModal(false)}
              className="absolute top-4 right-4 neo-btn p-2 bg-white text-text-primary hover:bg-light-hover"
            >
              ✕
            </button>
            
            {/* Category badge */}
            <div className="absolute bottom-4 left-4">
              <span className="neo-btn bg-white px-3 py-1 text-sm font-medium">
                {selectedProject.category}
              </span>
            </div>
            
            {/* Featured badge */}
            {selectedProject.is_featured && (
              <div className="absolute top-4 left-4">
                <span className="neo-btn bg-secondary text-white px-3 py-1 text-sm font-bold flex items-center space-x-1">
                  <Crown size={14} />
                  <span>FEATURED</span>
                </span>
              </div>
            )}
            
            {/* Purchased badge */}
            {isPurchased && (
              <div className="absolute top-4 left-4 ml-32">
                <span className="neo-btn bg-success text-white px-3 py-1 text-sm font-bold flex items-center space-x-1">
                  <CheckCircle size={14} />
                  <span>OWNED</span>
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">{selectedProject.title}</h2>
                <p className="text-text-secondary text-lg">{selectedProject.company_name}</p>
              </div>
              <div className="neo-card bg-accent p-6 text-center">
                <div className="text-3xl font-bold text-text-primary">{formatCurrency(selectedProject.price)}</div>
                <div className="text-text-secondary">Investment Price</div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="neo-card bg-white p-4 text-center">
                <Heart size={24} className="mx-auto mb-2 text-error" />
                <div className="text-2xl font-bold text-text-primary">{selectedProject.likes_count}</div>
                <div className="text-sm text-text-muted">Likes</div>
              </div>
              <div className="neo-card bg-white p-4 text-center">
                <Eye size={24} className="mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-text-primary">{selectedProject.views_count}</div>
                <div className="text-sm text-text-muted">Views</div>
              </div>
              <div className="neo-card bg-white p-4 text-center">
                <ShoppingBag size={24} className="mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold text-text-primary">{selectedProject.purchase_count}</div>
                <div className="text-sm text-text-muted">Purchases</div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Description */}
              <div className="neo-card bg-white p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">Description</h3>
                <p className="text-text-secondary leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="neo-card bg-white p-6">
                  <h4 className="font-semibold text-text-primary mb-4">Project Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-light-border">
                      <span className="text-text-secondary">Type:</span>
                      <span className="text-text-primary font-medium">{selectedProject.project_type}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-light-border">
                      <span className="text-text-secondary">Business Model:</span>
                      <span className="text-text-primary font-medium">{selectedProject.business_model}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-light-border">
                      <span className="text-text-secondary">Status:</span>
                      <span className="text-success font-medium">{selectedProject.status}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-light-border">
                      <span className="text-text-secondary">Created:</span>
                      <span className="text-text-primary font-medium">{formatDate(selectedProject.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="neo-card bg-white p-6">
                  <h4 className="font-semibold text-text-primary mb-4">Founder</h4>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-bold text-text-primary">{selectedProject.founder_name}</h5>
                      <p className="text-text-secondary">{selectedProject.company_name}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-light-border">
                      <span className="text-text-secondary">Experience:</span>
                      <span className="text-text-primary font-medium">5+ years</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-light-border">
                      <span className="text-text-secondary">Projects:</span>
                      <span className="text-text-primary font-medium">3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Development Team */}
              <div className="neo-card bg-white p-6">
                <h4 className="font-semibold text-text-primary mb-4">Development Team</h4>
                <p className="text-text-secondary">{selectedProject.developers}</p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                {selectedProject.demo_link && (
                  <a
                    href={selectedProject.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn flex items-center space-x-2 px-6 py-3 bg-primary text-white"
                  >
                    <Globe size={18} />
                    <span>View Demo</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                {selectedProject.presentation_video && (
                  <a
                    href={selectedProject.presentation_video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn flex items-center space-x-2 px-6 py-3 bg-accent text-primary"
                  >
                    <Eye size={18} />
                    <span>Watch Video</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              {/* Investment Section */}
              {!isPurchased ? (
                <div className="neo-card bg-white p-6">
                  <h4 className="font-semibold text-text-primary mb-4">Invest in This Project</h4>
                  
                  {!user && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-4">
                      <p className="text-text-primary">Please sign in to invest in this project.</p>
                    </div>
                  )}
                  
                  {user && !walletConnected && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-4">
                      <p className="text-text-primary mb-2">Connect your wallet to invest in this project.</p>
                      <button 
                        onClick={() => setShowWalletModal(true)}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}
                  
                  {investmentSuccess && (
                    <div className="p-4 bg-success/10 border border-success/20 rounded-xl mb-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-success" />
                        <div>
                          <p className="text-text-primary font-medium">Investment Successful!</p>
                          <p className="text-text-secondary text-sm">You have successfully invested in this project.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {investmentError && (
                    <div className="p-4 bg-error/10 border border-error/20 rounded-xl mb-4">
                      <div className="flex items-center space-x-3">
                        <AlertCircle size={20} className="text-error" />
                        <p className="text-error">{investmentError}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Investment Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted">$</span>
                        <input
                          type="number"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                          disabled={!user || !walletConnected || isInvesting || investmentSuccess}
                        />
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        Minimum investment: {formatCurrency(selectedProject.price / 10)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Available Shares:</span>
                      <span className="font-semibold text-text-primary">
                        {selectedProject.shares_available}/{selectedProject.total_shares}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleInvestment}
                      disabled={!user || !walletConnected || isInvesting || investmentSuccess || !investmentAmount}
                      className="neo-btn w-full py-4 bg-secondary text-white font-bold text-lg disabled:opacity-50"
                    >
                      {isInvesting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 size={20} className="animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : investmentSuccess ? (
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle size={20} />
                          <span>Investment Complete</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <DollarSign size={20} />
                          <span>Invest Now</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="neo-card bg-white p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle size={24} className="text-success" />
                    <h4 className="font-semibold text-text-primary">You Own This Project</h4>
                  </div>
                  
                  <p className="text-text-secondary mb-6">
                    You have successfully invested in this project. You can access all project resources and updates.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="neo-btn py-3 bg-primary text-white font-medium">
                      Access Resources
                    </button>
                    <button className="neo-btn py-3 bg-white text-text-primary font-medium">
                      Contact Developer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDeveloperModal = () => {
    if (!selectedDeveloper) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="neo-card bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-accent p-8 relative">
            <button
              onClick={() => setShowDeveloperModal(false)}
              className="absolute top-4 right-4 neo-btn p-2 bg-white text-text-primary hover:bg-light-hover"
            >
              ✕
            </button>

            <div className="flex items-start space-x-6">
              <div className="relative">
                <img 
                  src={selectedDeveloper.avatar_url}
                  alt={selectedDeveloper.name}
                  className="w-24 h-24 rounded-2xl neo-card"
                  style={{ boxShadow: '5px 5px 0 #141414' }}
                />
                {selectedDeveloper.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl font-bold text-text-primary">{selectedDeveloper.name}</h2>
                  {selectedDeveloper.verified && (
                    <CheckCircle size={24} className="text-success" />
                  )}
                </div>
                <p className="text-text-secondary text-lg mb-2">@{selectedDeveloper.username}</p>
                <div className="flex items-center space-x-4 text-text-muted mb-4">
                  <div className="flex items-center space-x-1">
                    <Building size={16} />
                    <span>{selectedDeveloper.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{selectedDeveloper.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>Joined {formatDate(selectedDeveloper.joined_date)}</span>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed">{selectedDeveloper.bio}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="neo-card bg-white p-4 text-center">
                <Code size={24} className="mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-text-primary">{selectedDeveloper.projects.length}</div>
                <div className="text-sm text-text-muted">Projects</div>
              </div>
              <div className="neo-card bg-white p-4 text-center">
                <Heart size={24} className="mx-auto mb-2 text-error" />
                <div className="text-2xl font-bold text-text-primary">{selectedDeveloper.total_likes}</div>
                <div className="text-sm text-text-muted">Total Likes</div>
              </div>
              <div className="neo-card bg-white p-4 text-center">
                <Eye size={24} className="mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-text-primary">{selectedDeveloper.total_views}</div>
                <div className="text-sm text-text-muted">Total Views</div>
              </div>
              <div className="neo-card bg-white p-4 text-center">
                <Calendar size={24} className="mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold text-text-primary">
                  {Math.floor((new Date().getTime() - new Date(selectedDeveloper.joined_date).getTime()) / (1000 * 60 * 60 * 24 * 365))}y
                </div>
                <div className="text-sm text-text-muted">Experience</div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Skills */}
              <div className="neo-card bg-white p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedDeveloper.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="neo-btn bg-white px-3 py-2 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="neo-card bg-white p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedDeveloper.projects.map((project, index) => (
                    <div 
                      key={index} 
                      className="neo-card bg-white p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeveloperModal(false);
                        const fullProject = projects.find(p => p.id === project.id);
                        if (fullProject) {
                          handleProjectClick(fullProject);
                        }
                      }}
                    >
                      <h4 className="font-semibold text-text-primary mb-2">{project.title}</h4>
                      <p className="text-text-secondary text-sm mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="neo-btn bg-white px-2 py-1 text-xs font-medium">
                          {project.category}
                        </span>
                        <div className="flex items-center space-x-3 text-sm text-text-muted">
                          <div className="flex items-center space-x-1">
                            <Heart size={12} />
                            <span>{project.likes_count}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye size={12} />
                            <span>{project.views_count}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="neo-btn flex-1 py-3 bg-primary text-white">
                  Contact Developer
                </button>
                <button className="neo-btn flex-1 py-3 bg-white">
                  View All Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWalletModal = () => {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="neo-card bg-white w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-light-border">
            <h2 className="text-xl font-bold text-text-primary">Connect Your Wallet</h2>
            <button 
              onClick={() => setShowWalletModal(false)}
              className="p-2 hover:bg-light-hover rounded-lg transition-all duration-300"
            >
              <X size={20} className="text-text-secondary" />
            </button>
          </div>
          
          <div className="p-6">
            <p className="text-text-secondary mb-6">
              Connect your wallet to invest in projects and protect your intellectual property.
            </p>
            
            <WalletConnect onWalletConnection={handleWalletConnection} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-light-bg text-text-primary transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-light-border sticky top-0 z-40 shadow-sm">
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
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">IP Marketplace</h1>
                  <p className="text-text-secondary text-lg">Discover and invest in innovative registered projects</p>
                </div>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 sm:flex-initial">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={activeTab === 'projects' ? "Search projects..." : "Search developers..."}
                  className="pl-10 sm:pl-12 pr-4 sm:pr-6 py-2 sm:py-3 bg-white border border-light-border rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted w-full sm:w-64 lg:w-80 shadow-sm"
                />
              </div>
              
              {activeTab === 'projects' && (
                <>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Filter size={16} className="sm:w-5 sm:h-5 text-text-muted flex-shrink-0" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-white border border-light-border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary flex-1 sm:min-w-[140px] shadow-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category} className="bg-white">
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'likes' | 'views' | 'price' | 'recent')}
                    className="bg-white border border-light-border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary min-w-[120px] shadow-sm"
                  >
                    <option value="likes">Most Liked</option>
                    <option value="views">Most Viewed</option>
                    <option value="price">Lowest Price</option>
                    <option value="recent">Most Recent</option>
                  </select>
                </>
              )}

              <div className="flex items-center space-x-2 bg-white border border-light-border rounded-lg sm:rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-4 font-medium text-base transition-colors duration-300 ${
                activeTab === 'projects' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Projects ({filteredProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('developers')}
              className={`px-6 py-4 font-medium text-base transition-colors duration-300 ${
                activeTab === 'developers' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Developers ({filteredDevelopers.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* My Investments Section */}
        {user && userPurchases.length > 0 && activeTab === 'projects' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-text-primary">My Investments</h2>
              <span className="text-text-secondary">{userPurchases.length} project{userPurchases.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userPurchases.map((purchase) => {
                const project = purchase.marketplace_item;
                if (!project) return null;
                
                return (
                  <div 
                    key={purchase.id} 
                    className="bg-white rounded-2xl border border-success/30 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer card-hover"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="relative">
                      <img 
                        src={project.thumbnail_url} 
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-success text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                          <CheckCircle size={12} />
                          <span>OWNED</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="font-semibold text-lg text-text-primary mb-2">
                        {project.title}
                      </h4>
                      
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className="text-text-secondary">{project.category}</span>
                        <span className="text-success font-medium">
                          {formatCurrency(purchase.purchase_price)}
                        </span>
                      </div>
                      
                      <div className="text-xs text-text-muted">
                        Purchased on {formatDate(purchase.created_at)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {activeTab === 'projects' ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProjects.map((project, index) => renderProjectCard(project, index))}
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredDevelopers.map((developer, index) => renderDeveloperCard(developer, index))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'projects' && filteredProjects.length === 0) || 
          (activeTab === 'developers' && filteredDevelopers.length === 0)) && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-light-card rounded-2xl flex items-center justify-center mx-auto mb-6">
              {activeTab === 'projects' ? (
                <ShoppingBag size={32} className="text-text-muted" />
              ) : (
                <Users size={32} className="text-text-muted" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              No {activeTab} found
            </h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `No ${activeTab} match your search criteria. Try adjusting your filters.`
                : `No ${activeTab} available at the moment. Check back later!`
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showProjectModal && renderProjectModal()}
      {showDeveloperModal && renderDeveloperModal()}
      {showWalletModal && renderWalletModal()}
    </div>
  );
};

export default Marketplace;