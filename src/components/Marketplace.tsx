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
  Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MarketplaceProps {
  onBack: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  founder_name: string;
  company_name: string;
  category: string;
  project_type: string;
  business_model: string;
  project_summary: string;
  developers: string;
  demo_link?: string;
  presentation_video?: string;
  ipfs_url: string;
  created_at: string;
  status: string;
  // Mock investment data
  valuation?: string;
  shares_available?: string;
  min_investment?: string;
  current_funding?: string;
  investors_count?: number;
  views?: number;
  likes?: number;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    'all',
    'Fintech',
    'Healthtech',
    'Edtech',
    'E-commerce',
    'SaaS',
    'AI/ML',
    'Blockchain',
    'IoT',
    'Cybersecurity',
    'Gaming',
    'Social Media',
    'Productivity',
    'Other'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'valuation_high', label: 'Highest Valuation' },
    { value: 'valuation_low', label: 'Lowest Valuation' },
    { value: 'popular', label: 'Most Popular' },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterAndSortProjects();
  }, [projects, searchQuery, selectedCategory, selectedSort]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ip_registrations')
        .select('*')
        .eq('status', 'approved') // Only show approved projects
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Add mock investment data to projects
      const projectsWithMockData = (data || []).map((project, index) => ({
        ...project,
        valuation: generateMockValuation(),
        shares_available: generateMockShares(),
        min_investment: generateMockMinInvestment(),
        current_funding: generateMockCurrentFunding(),
        investors_count: Math.floor(Math.random() * 50) + 5,
        views: Math.floor(Math.random() * 5000) + 100,
        likes: Math.floor(Math.random() * 200) + 10,
      }));

      setProjects(projectsWithMockData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockValuation = () => {
    const valuations = ['$500K', '$750K', '$1M', '$1.5M', '$2M', '$2.5M', '$3M', '$4M', '$5M'];
    return valuations[Math.floor(Math.random() * valuations.length)];
  };

  const generateMockShares = () => {
    const shares = ['5%', '8%', '10%', '12%', '15%', '18%', '20%', '25%'];
    return shares[Math.floor(Math.random() * shares.length)];
  };

  const generateMockMinInvestment = () => {
    const investments = ['$5K', '$10K', '$15K', '$20K', '$25K', '$30K', '$40K', '$50K'];
    return investments[Math.floor(Math.random() * investments.length)];
  };

  const generateMockCurrentFunding = () => {
    const funding = ['$25K', '$50K', '$75K', '$100K', '$150K', '$200K', '$250K', '$300K'];
    return funding[Math.floor(Math.random() * funding.length)];
  };

  const filterAndSortProjects = () => {
    let filtered = [...projects];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.founder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Sort projects
    switch (selectedSort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'valuation_high':
        filtered.sort((a, b) => {
          const aVal = parseInt((a.valuation || '0').replace(/[^0-9]/g, ''));
          const bVal = parseInt((b.valuation || '0').replace(/[^0-9]/g, ''));
          return bVal - aVal;
        });
        break;
      case 'valuation_low':
        filtered.sort((a, b) => {
          const aVal = parseInt((a.valuation || '0').replace(/[^0-9]/g, ''));
          const bVal = parseInt((b.valuation || '0').replace(/[^0-9]/g, ''));
          return aVal - bVal;
        });
        break;
    }

    setFilteredProjects(filtered);
  };

  const handleInvest = (project: Project) => {
    // This would open an investment modal or redirect to investment flow
    alert(`Investment flow for ${project.title} would open here`);
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white rounded-2xl border border-light-border overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Code size={32} className="text-primary" />
            </div>
            <p className="text-text-muted text-sm font-medium">{project.category}</p>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Available
          </span>
          {project.presentation_video && (
            <div className="bg-red-500 text-white p-2 rounded-full">
              <Video size={12} />
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
            {project.views} views
          </div>
          <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
            ❤️ {project.likes}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          <button className="text-text-muted hover:text-red-500 transition-colors duration-300">
            <Heart size={20} />
          </button>
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.project_summary}</p>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{project.founder_name}</p>
            {project.company_name && (
              <p className="text-xs text-text-muted">{project.company_name}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Valuation:</span>
            <span className="font-semibold text-text-primary">{project.valuation}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Shares:</span>
            <span className="font-semibold text-primary">{project.shares_available}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Min. Investment:</span>
            <span className="font-semibold text-secondary">{project.min_investment}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProject(project)}
            className="text-primary hover:text-primary-dark font-medium text-sm transition-colors duration-300"
          >
            View Details
          </button>
          <button
            onClick={() => handleInvest(project)}
            className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-all duration-300 text-sm shadow-lg"
          >
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );

  const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-2">{project.title}</h2>
              <p className="text-text-secondary">by {project.founder_name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors duration-300 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Project Summary</h3>
                <p className="text-text-secondary leading-relaxed">{project.project_summary}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Detailed Description</h3>
                <p className="text-text-secondary leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Business Model</h3>
                <p className="text-text-secondary">{project.business_model}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Team</h3>
                <p className="text-text-secondary">{project.developers}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.demo_link && (
                  <a
                    href={project.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    <span>View Demo</span>
                  </a>
                )}
                {project.presentation_video && (
                  <a
                    href={project.presentation_video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    <Video size={16} />
                    <span>Watch Video</span>
                  </a>
                )}
                <a
                  href={project.ipfs_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors duration-300"
                >
                  <Shield size={16} />
                  <span>View on IPFS</span>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-light-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Investment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Valuation:</span>
                    <span className="font-semibold text-text-primary">{project.valuation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Shares Available:</span>
                    <span className="font-semibold text-primary">{project.shares_available}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Min. Investment:</span>
                    <span className="font-semibold text-secondary">{project.min_investment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Current Funding:</span>
                    <span className="font-semibold text-accent">{project.current_funding}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Investors:</span>
                    <span className="font-semibold text-text-primary">{project.investors_count}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleInvest(project)}
                  className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Invest in This Project
                </button>
              </div>

              <div className="bg-light-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Project Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-text-muted" />
                    <span className="text-text-secondary">Category:</span>
                    <span className="font-medium text-text-primary">{project.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-text-muted" />
                    <span className="text-text-secondary">Type:</span>
                    <span className="font-medium text-text-primary">{project.project_type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-text-muted" />
                    <span className="text-text-secondary">Registered:</span>
                    <span className="font-medium text-text-primary">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-text-muted" />
                    <span className="text-text-secondary">Views:</span>
                    <span className="font-medium text-text-primary">{project.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
              <h1 className="text-3xl font-bold text-text-primary">Project Marketplace</h1>
              <p className="text-text-secondary text-lg">Discover and invest in innovative registered projects</p>
            </div>
          </div>

          {/* Filters and Search */}
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
                  className="px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary bg-white min-w-[150px]"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-text-secondary">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-light-border">
            <Lightbulb size={48} className="mx-auto mb-4 text-text-muted" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No Projects Found</h3>
            <p className="text-text-secondary">Try adjusting your search criteria or browse all categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Marketplace;