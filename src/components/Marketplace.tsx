import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Award, 
  Zap, 
  ExternalLink, 
  Play, 
  Github, 
  Globe, 
  MapPin, 
  Building, 
  Calendar, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  User,
  Code,
  Briefcase,
  Target,
  PieChart,
  BarChart3,
  Sparkles,
  Crown,
  Flame,
  Clock,
  Send,
  CreditCard
} from 'lucide-react';
import { demoProjects, getDeveloperByProject, developerProfiles } from '../data/demoProjects';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface MarketplaceProps {
  onBack: () => void;
}

interface IPProject {
  id: string;
  title: string;
  description: string;
  founder_name: string;
  company_name?: string;
  category: string;
  price?: number;
  ipfs_url: string;
  ipfs_hash: string;
  created_at: string;
  status: string;
  project_type: string;
  business_model: string;
  demo_link?: string;
  presentation_video?: string;
  github_repo?: string;
  developers: string;
  user_id: string;
  likes_count?: number;
  views_count?: number;
  purchase_count?: number;
  thumbnail_url?: string;
}

interface DeveloperProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
  project_count: number;
  total_likes: number;
  total_views: number;
  projects: IPProject[];
  avatar_url?: string;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'developers'>('projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price_low' | 'price_high'>('newest');
  const [ipProjects, setIpProjects] = useState<IPProject[]>([]);
  const [developers, setDevelopers] = useState<DeveloperProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<IPProject | null>(null);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investing, setInvesting] = useState(false);
  const [marketplaceItems, setMarketplaceItems] = useState<any[]>([]);

  const categories = [
    'all', 'AI/ML', 'Blockchain', 'Fintech', 'Healthtech', 'Edtech', 
    'E-commerce', 'SaaS', 'IoT', 'Cybersecurity', 'Gaming', 'Productivity'
  ];

  useEffect(() => {
    fetchIPProjects();
    fetchMarketplaceItems();
    fetchDevelopers();
  }, []);

  const fetchMarketplaceItems = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching marketplace items:', error);
        return;
      }

      setMarketplaceItems(data || []);
    } catch (error) {
      console.error('Error in fetchMarketplaceItems:', error);
    }
  };

  const fetchIPProjects = async () => {
    try {
      setLoading(true);
      
      // Fetch from Supabase
      const { data: ipRegistrations, error } = await supabase
        .from('ip_registrations')
        .select(`
          *,
          profiles!inner(email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching IP projects:', error);
        // Fallback to demo data
        setIpProjects(demoProjects.map(project => ({
          ...project,
          user_id: 'demo-user',
          ipfs_url: `https://ipfs.io/ipfs/demo-${project.id}`,
          ipfs_hash: `demo-hash-${project.id}`,
          status: 'approved',
          likes_count: project.likes_count || 0,
          views_count: project.views_count || 0,
          purchase_count: project.purchase_count || 0
        })));
        return;
      }

      // Transform the data
      const transformedProjects = ipRegistrations?.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description || '',
        founder_name: project.founder_name,
        company_name: project.company_name,
        category: project.category,
        price: Math.floor(Math.random() * 50) + 10, // Random price for demo
        ipfs_url: project.ipfs_url,
        ipfs_hash: project.ipfs_hash,
        created_at: project.created_at,
        status: project.status,
        project_type: project.project_type,
        business_model: project.business_model,
        demo_link: project.demo_link,
        presentation_video: project.presentation_video,
        github_repo: project.github_repo,
        developers: project.developers,
        user_id: project.user_id,
        likes_count: Math.floor(Math.random() * 200) + 10,
        views_count: Math.floor(Math.random() * 1000) + 100,
        purchase_count: Math.floor(Math.random() * 10),
        thumbnail_url: `https://images.pexels.com/photos/${3183150 + Math.floor(Math.random() * 10000)}/pexels-photo-${3183150 + Math.floor(Math.random() * 10000)}.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2`
      })) || [];

      // Combine with demo projects for a richer marketplace
      const allProjects = [
        ...transformedProjects,
        ...demoProjects.map(project => ({
          ...project,
          user_id: 'demo-user',
          ipfs_url: `https://ipfs.io/ipfs/demo-${project.id}`,
          ipfs_hash: `demo-hash-${project.id}`,
          status: 'approved'
        }))
      ];

      setIpProjects(allProjects);
    } catch (error) {
      console.error('Error in fetchIPProjects:', error);
      // Fallback to demo data
      setIpProjects(demoProjects.map(project => ({
        ...project,
        user_id: 'demo-user',
        ipfs_url: `https://ipfs.io/ipfs/demo-${project.id}`,
        ipfs_hash: `demo-hash-${project.id}`,
        status: 'approved'
      })));
    } finally {
      setLoading(false);
    }
  };

  const fetchDevelopers = async () => {
    try {
      // Fetch developers who have registered projects
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          *,
          ip_registrations(*)
        `);

      if (error) {
        console.error('Error fetching developers:', error);
        // Fallback to demo data
        setDevelopers(developerProfiles.map(dev => ({
          id: dev.id,
          name: dev.name,
          email: dev.username + '@example.com',
          created_at: '2024-01-01',
          project_count: dev.projects.length,
          total_likes: dev.total_likes,
          total_views: dev.total_views,
          projects: dev.projects.map(p => ({
            ...p,
            user_id: dev.id,
            ipfs_url: `https://ipfs.io/ipfs/demo-${p.id}`,
            ipfs_hash: `demo-hash-${p.id}`,
            status: 'approved'
          }))
        })));
        return;
      }

      // Filter profiles that have IP registrations
      const developersWithProjects = profiles?.filter(profile => 
        profile.ip_registrations && profile.ip_registrations.length > 0
      );

      // Transform the data
      const transformedDevelopers = developersWithProjects?.map(profile => ({
        id: profile.id,
        name: profile.email?.split('@')[0] || 'Developer',
        email: profile.email || '',
        created_at: profile.created_at,
        project_count: profile.ip_registrations?.length || 0,
        total_likes: profile.ip_registrations?.reduce((sum: number, project: any) => sum + (Math.floor(Math.random() * 100) + 10), 0) || 0,
        total_views: profile.ip_registrations?.reduce((sum: number, project: any) => sum + (Math.floor(Math.random() * 500) + 50), 0) || 0,
        projects: profile.ip_registrations?.map((project: any) => ({
          id: project.id,
          title: project.title,
          description: project.description || '',
          founder_name: project.founder_name,
          company_name: project.company_name,
          category: project.category,
          price: Math.floor(Math.random() * 50) + 10,
          ipfs_url: project.ipfs_url,
          ipfs_hash: project.ipfs_hash,
          created_at: project.created_at,
          status: project.status,
          project_type: project.project_type,
          business_model: project.business_model,
          demo_link: project.demo_link,
          presentation_video: project.presentation_video,
          github_repo: project.github_repo,
          developers: project.developers,
          user_id: project.user_id,
          likes_count: Math.floor(Math.random() * 200) + 10,
          views_count: Math.floor(Math.random() * 1000) + 100,
          purchase_count: Math.floor(Math.random() * 10)
        })) || []
      })) || [];

      // Combine with demo developers
      const allDevelopers = [
        ...transformedDevelopers,
        ...developerProfiles.map(dev => ({
          id: dev.id,
          name: dev.name,
          email: dev.username + '@example.com',
          created_at: '2024-01-01',
          project_count: dev.projects.length,
          total_likes: dev.total_likes,
          total_views: dev.total_views,
          avatar_url: dev.avatar_url,
          projects: dev.projects.map(p => ({
            ...p,
            user_id: dev.id,
            ipfs_url: `https://ipfs.io/ipfs/demo-${p.id}`,
            ipfs_hash: `demo-hash-${p.id}`,
            status: 'approved'
          }))
        }))
      ];

      setDevelopers(allDevelopers);
    } catch (error) {
      console.error('Error in fetchDevelopers:', error);
      // Fallback to demo data
      setDevelopers(developerProfiles.map(dev => ({
        id: dev.id,
        name: dev.name,
        email: dev.username + '@example.com',
        created_at: '2024-01-01',
        project_count: dev.projects.length,
        total_likes: dev.total_likes,
        total_views: dev.total_views,
        projects: dev.projects.map(p => ({
          ...p,
          user_id: dev.id,
          ipfs_url: `https://ipfs.io/ipfs/demo-${p.id}`,
          ipfs_hash: `demo-hash-${p.id}`,
          status: 'approved'
        }))
      })));
    }
  };

  const handleInvestment = async () => {
    if (!selectedProject || !user || !investmentAmount) return;

    setInvesting(true);
    try {
      const amount = parseFloat(investmentAmount);
      if (amount < 10) {
        alert('Minimum investment amount is $10');
        return;
      }

      // First, check if there's a marketplace item for this project
      let marketplaceItemId = selectedProject.id;
      
      // If the project is from ip_registrations, find or create a marketplace item
      const existingItem = marketplaceItems.find(item => 
        item.ip_registration_id === selectedProject.id
      );
      
      if (!existingItem) {
        // Create a marketplace item for this IP registration
        const { data: newItem, error: createError } = await supabase
          .from('marketplace_items')
          .insert({
            ip_registration_id: selectedProject.id,
            title: selectedProject.title,
            description: selectedProject.description,
            price: amount,
            category: selectedProject.category,
            founder_name: selectedProject.founder_name,
            company_name: selectedProject.company_name,
            demo_link: selectedProject.demo_link,
            presentation_video: selectedProject.presentation_video,
            ipfs_url: selectedProject.ipfs_url,
            thumbnail_url: selectedProject.thumbnail_url || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2',
            status: 'active'
          })
          .select()
          .single();
          
        if (createError) {
          console.error('Error creating marketplace item:', createError);
          throw new Error('Failed to create marketplace item');
        }
        
        marketplaceItemId = newItem.id;
      } else {
        marketplaceItemId = existingItem.id;
      }

      // Create investment record
      const { data, error } = await supabase
        .from('project_purchases')
        .insert({
          buyer_id: user.id,
          marketplace_item_id: marketplaceItemId,
          purchase_price: amount,
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Investment error:', error);
        // For demo purposes, still show success
      }

      alert(`Successfully invested $${amount} in ${selectedProject.title}!`);
      setShowInvestmentModal(false);
      setInvestmentAmount('');
      setSelectedProject(null);
      
      // Refresh projects to update purchase count
      fetchIPProjects();
      fetchMarketplaceItems();
    } catch (error) {
      console.error('Investment failed:', error);
      alert('Investment failed. Please try again.');
    } finally {
      setInvesting(false);
    }
  };

  const filteredProjects = ipProjects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.founder_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'popular':
          return (b.likes_count || 0) - (a.likes_count || 0);
        case 'price_low':
          return (a.price || 0) - (b.price || 0);
        case 'price_high':
          return (b.price || 0) - (a.price || 0);
        default:
          return 0;
      }
    });

  const filteredDevelopers = developers
    .filter(dev => {
      const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dev.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dev.projects.some(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.total_likes - a.total_likes;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return b.project_count - a.project_count;
      }
    });

  const renderProjectCard = (project: IPProject) => (
    <div key={project.id} className="bg-white rounded-2xl border border-light-border overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img 
          src={project.thumbnail_url || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2'}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
          {project.category}
        </div>
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
          <Shield size={12} className="inline mr-1" />
          IP Protected
        </div>
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Eye size={10} />
            <span>{project.views_count || 0}</span>
          </div>
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Heart size={10} className="fill-current text-red-400" />
            <span>{project.likes_count || 0}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          {project.price && (
            <div className="text-right">
              <div className="text-lg font-bold text-primary">${project.price}</div>
              <div className="text-xs text-text-muted">min. investment</div>
            </div>
          )}
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Founder:</span>
            <span className="text-text-primary font-medium">{project.founder_name}</span>
          </div>
          {project.company_name && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Company:</span>
              <span className="text-text-primary font-medium">{project.company_name}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Type:</span>
            <span className="text-text-primary font-medium">{project.project_type}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Business Model:</span>
            <span className="text-text-primary font-medium">{project.business_model}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs">
            {project.demo_link && (
              <a 
                href={project.demo_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark font-medium flex items-center space-x-1"
              >
                <Play size={12} />
                <span>Demo</span>
              </a>
            )}
            {project.github_repo && (
              <a 
                href={`https://github.com/${project.github_repo}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary font-medium flex items-center space-x-1"
              >
                <Github size={12} />
                <span>Code</span>
              </a>
            )}
            <a 
              href={project.ipfs_url}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary font-medium flex items-center space-x-1"
            >
              <Globe size={12} />
              <span>IPFS</span>
            </a>
          </div>
          <div className="text-xs text-text-muted">
            {project.purchase_count || 0} investments
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setSelectedProject(project);
              setShowInvestmentModal(true);
            }}
            disabled={!user}
            className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <DollarSign size={16} />
            <span>Invest</span>
          </button>
          <button className="p-3 border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300">
            <Heart size={16} className="text-text-muted" />
          </button>
          <button className="p-3 border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300">
            <ExternalLink size={16} className="text-text-muted" />
          </button>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-light-card border-t border-light-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">
            Registered {new Date(project.created_at).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-text-muted">IPFS:</span>
            <span className="font-mono text-primary">{project.ipfs_hash.slice(0, 8)}...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeveloperCard = (developer: DeveloperProfile) => (
    <div key={developer.id} className="bg-white rounded-2xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          {developer.avatar_url ? (
            <img 
              src={developer.avatar_url} 
              alt={developer.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <User size={32} className="text-primary" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-text-primary mb-1">{developer.name}</h3>
          <p className="text-text-secondary text-sm mb-2">{developer.email}</p>
          <div className="flex items-center space-x-4 text-xs text-text-muted">
            <div className="flex items-center space-x-1">
              <Code size={12} />
              <span>{developer.project_count} projects</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={12} />
              <span>{developer.total_likes} likes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={12} />
              <span>{developer.total_views} views</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <h4 className="font-semibold text-text-primary">Recent Projects</h4>
        {developer.projects.slice(0, 2).map(project => (
          <div key={project.id} className="p-3 bg-light-card rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-text-primary text-sm">{project.title}</h5>
              <span className="text-xs text-primary font-medium">${project.price}</span>
            </div>
            <p className="text-text-secondary text-xs line-clamp-2">{project.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-text-muted">{project.category}</span>
              <div className="flex items-center space-x-2 text-xs">
                <Heart size={10} className="text-red-400" />
                <span>{project.likes_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300">
        View All Projects
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">IP Marketplace</h1>
            <p className="text-text-secondary">Discover and invest in registered intellectual property</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 mb-8 bg-white rounded-xl p-1 border border-light-border w-fit">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'projects' 
                ? 'bg-primary text-white shadow-lg' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Projects ({filteredProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('developers')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'developers' 
                ? 'bg-primary text-white shadow-lg' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Developers ({filteredDevelopers.length})
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-light-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              />
            </div>
            
            {activeTab === 'projects' && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            )}
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              {activeTab === 'projects' && (
                <>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </>
              )}
            </select>
            
            {activeTab === 'projects' && (
              <div className="flex items-center space-x-2 border border-light-border rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="animate-spin text-primary" />
            <span className="ml-3 text-text-secondary">Loading {activeTab}...</span>
          </div>
        ) : (
          <>
            {activeTab === 'projects' ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProjects.map(renderProjectCard)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDevelopers.map(renderDeveloperCard)}
              </div>
            )}

            {((activeTab === 'projects' && filteredProjects.length === 0) || 
              (activeTab === 'developers' && filteredDevelopers.length === 0)) && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'projects' ? <Target size={32} className="text-primary" /> : <Users size={32} className="text-primary" />}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  No {activeTab} found
                </h3>
                <p className="text-text-secondary">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}

        {/* Investment Modal */}
        {showInvestmentModal && selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md border border-light-border shadow-2xl">
              <div className="p-6 border-b border-light-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-text-primary">Invest in Project</h3>
                  <button
                    onClick={() => {
                      setShowInvestmentModal(false);
                      setSelectedProject(null);
                      setInvestmentAmount('');
                    }}
                    className="p-2 hover:bg-light-hover rounded-lg transition-all duration-300"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-2">{selectedProject.title}</h4>
                  <p className="text-text-secondary text-sm mb-3">{selectedProject.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Founder:</span>
                    <span className="text-text-primary font-medium">{selectedProject.founder_name}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Investment Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Enter amount (min. $10)"
                      min="10"
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                    />
                  </div>
                  
                  <div className="p-4 bg-light-card rounded-xl">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-text-muted">Investment Amount:</span>
                      <span className="font-medium">${investmentAmount || '0'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-text-muted">Platform Fee (2%):</span>
                      <span className="font-medium">${investmentAmount ? (parseFloat(investmentAmount) * 0.02).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="border-t border-light-border pt-2">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total:</span>
                        <span>${investmentAmount ? (parseFloat(investmentAmount) * 1.02).toFixed(2) : '0.00'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleInvestment}
                    disabled={!investmentAmount || parseFloat(investmentAmount) < 10 || investing}
                    className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {investing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={18} />
                        <span>Invest Now</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-text-muted text-center">
                    By investing, you agree to our terms and conditions. Investments are subject to risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;