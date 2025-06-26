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
  Phone
} from 'lucide-react';
import { demoProjects, developerProfiles, searchProjects, searchDevelopers, getDeveloperById, type DemoProject, type DeveloperProfile } from '../data/demoProjects';

interface MarketplaceProps {
  onBack: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'developers'>('projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'likes' | 'views' | 'price' | 'recent'>('likes');
  const [projects, setProjects] = useState<DemoProject[]>(demoProjects);
  const [developers, setDevelopers] = useState<DeveloperProfile[]>(developerProfiles); // Fixed typo here
  const [filteredProjects, setFilteredProjects] = useState<DemoProject[]>(demoProjects);
  const [filteredDevelopers, setFilteredDevelopers] = useState<DeveloperProfile[]>(developerProfiles);
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState<DeveloperProfile | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);

  const categories = [
    'all', 'AI/ML', 'Blockchain', 'Fintech', 'Healthtech', 'Edtech', 
    'E-commerce', 'SaaS', 'IoT', 'Cybersecurity', 'Gaming', 'Productivity'
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <Crown size={12} />
              <span>FEATURED</span>
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
            <Heart size={10} className={project.likes_count > 100 ? 'fill-current text-red-400' : ''} />
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
            <span className="font-semibold text-red-500 flex items-center space-x-1">
              <Heart size={12} className="fill-current" />
              <span>{project.likes_count}</span>
            </span>
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg">
          View Details
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
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
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
              <CheckCircle size={16} className="text-green-500" />
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

      <button className="w-full py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg">
        View Profile
      </button>
    </div>
  );

  const renderProjectModal = () => {
    if (!selectedProject) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-light-border shadow-2xl">
          <div className="relative">
            <img 
              src={selectedProject.thumbnail_url}
              alt={selectedProject.title}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={() => setShowProjectModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {selectedProject.category}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">{selectedProject.title}</h2>
                <p className="text-text-secondary text-lg">{selectedProject.company_name}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{formatCurrency(selectedProject.price)}</div>
                <div className="text-text-muted">Investment Price</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-light-card rounded-xl">
                <Heart size={24} className="mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold text-text-primary">{selectedProject.likes_count}</div>
                <div className="text-sm text-text-muted">Likes</div>
              </div>
              <div className="text-center p-4 bg-light-card rounded-xl">
                <Eye size={24} className="mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-text-primary">{selectedProject.views_count}</div>
                <div className="text-sm text-text-muted">Views</div>
              </div>
              <div className="text-center p-4 bg-light-card rounded-xl">
                <ShoppingBag size={24} className="mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-text-primary">{selectedProject.purchase_count}</div>
                <div className="text-sm text-text-muted">Purchases</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Description</h3>
                <p className="text-text-secondary leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Type:</span>
                      <span className="text-text-primary">{selectedProject.project_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Business Model:</span>
                      <span className="text-text-primary">{selectedProject.business_model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Status:</span>
                      <span className="text-green-600 font-medium">{selectedProject.status}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Founder</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Name:</span>
                      <span className="text-text-primary">{selectedProject.founder_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Company:</span>
                      <span className="text-text-primary">{selectedProject.company_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Created:</span>
                      <span className="text-text-primary">{formatDate(selectedProject.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">Development Team</h4>
                <p className="text-text-secondary text-sm">{selectedProject.developers}</p>
              </div>

              <div className="flex space-x-4">
                {selectedProject.demo_link && (
                  <a
                    href={selectedProject.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
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
                    className="flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
                  >
                    <Eye size={18} />
                    <span>Watch Video</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
                Invest in This Project
              </button>
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
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-light-border shadow-2xl">
          <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
            <button
              onClick={() => setShowDeveloperModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-text-primary hover:bg-white/30 transition-all duration-300"
            >
              ✕
            </button>

            <div className="flex items-start space-x-6">
              <div className="relative">
                <img 
                  src={selectedDeveloper.avatar_url}
                  alt={selectedDeveloper.name}
                  className="w-24 h-24 rounded-2xl ring-4 ring-white/30"
                />
                {selectedDeveloper.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl font-bold text-text-primary">{selectedDeveloper.name}</h2>
                  {selectedDeveloper.verified && (
                    <CheckCircle size={24} className="text-green-500" />
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-light-card rounded-xl">
                <Code size={24} className="mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-text-primary">{selectedDeveloper.projects.length}</div>
                <div className="text-sm text-text-muted">Projects</div>
              </div>
              <div className="text-center p-4 bg-light-card rounded-xl">
                <Heart size={24} className="mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold text-text-primary">{selectedDeveloper.total_likes}</div>
                <div className="text-sm text-text-muted">Total Likes</div>
              </div>
              <div className="text-center p-4 bg-light-card rounded-xl">
                <Eye size={24} className="mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-text-primary">{selectedDeveloper.total_views}</div>
                <div className="text-sm text-text-muted">Total Views</div>
              </div>
              <div className="text-center p-4 bg-light-card rounded-xl">
                <Calendar size={24} className="mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-text-primary">
                  {Math.floor((new Date().getTime() - new Date(selectedDeveloper.joined_date).getTime()) / (1000 * 60 * 60 * 24 * 365))}y
                </div>
                <div className="text-sm text-text-muted">Experience</div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedDeveloper.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedDeveloper.projects.map((project, index) => (
                    <div key={index} className="border border-light-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300">
                      <h4 className="font-semibold text-text-primary mb-2">{project.title}</h4>
                      <p className="text-text-secondary text-sm mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
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

              <div className="flex space-x-4">
                <button className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300">
                  Contact Developer
                </button>
                <button className="flex-1 py-3 bg-white border border-light-border text-text-primary rounded-xl font-medium hover:bg-light-hover transition-all duration-300">
                  View All Projects
                </button>
              </div>
            </div>
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
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
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
    </div>
  );
};

export default Marketplace;