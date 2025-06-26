import React, { useState, useEffect } from 'react';
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitBranch, 
  Code, 
  Calendar, 
  Users, 
  Book, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Link as LinkIcon, 
  Unlink, 
  RefreshCw,
  Eye,
  GitCommit,
  FileText,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  private: boolean;
}

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string;
  company: string;
  blog: string;
}

interface GitHubIntegrationProps {
  onRepoSelected?: (repo: GitHubRepo) => void;
  selectedRepos?: GitHubRepo[];
  maxRepos?: number;
}

const GitHubIntegration: React.FC<GitHubIntegrationProps> = ({ 
  onRepoSelected, 
  selectedRepos = [], 
  maxRepos = 5 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'created'>('stars');

  // Check if GitHub is already connected (simulate with localStorage)
  useEffect(() => {
    const savedConnection = localStorage.getItem('github_connection');
    if (savedConnection) {
      try {
        const connectionData = JSON.parse(savedConnection);
        setIsConnected(true);
        setGithubUser(connectionData.user);
        setRepositories(connectionData.repos);
      } catch (error) {
        console.error('Error loading GitHub connection:', error);
        localStorage.removeItem('github_connection');
      }
    }
  }, []);

  // Mock GitHub API calls (in real app, these would be actual API calls)
  const mockGitHubUser: GitHubUser = {
    login: 'developer_user',
    name: 'John Developer',
    bio: 'Full-stack developer passionate about open source and innovation',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    html_url: 'https://github.com/developer_user',
    public_repos: 42,
    followers: 156,
    following: 89,
    created_at: '2019-03-15T10:30:00Z',
    location: 'San Francisco, CA',
    company: 'Tech Startup Inc',
    blog: 'https://johndeveloper.dev'
  };

  const mockRepositories: GitHubRepo[] = [
    {
      id: 1,
      name: 'ai-analytics-platform',
      full_name: 'developer_user/ai-analytics-platform',
      description: 'Advanced AI-powered analytics platform with real-time data processing and machine learning insights',
      html_url: 'https://github.com/developer_user/ai-analytics-platform',
      language: 'Python',
      stargazers_count: 234,
      forks_count: 45,
      watchers_count: 189,
      created_at: '2023-06-15T10:30:00Z',
      updated_at: '2024-01-20T14:22:00Z',
      topics: ['ai', 'machine-learning', 'analytics', 'python', 'tensorflow'],
      private: false
    },
    {
      id: 2,
      name: 'blockchain-security-toolkit',
      full_name: 'developer_user/blockchain-security-toolkit',
      description: 'Comprehensive security toolkit for blockchain applications with smart contract auditing tools',
      html_url: 'https://github.com/developer_user/blockchain-security-toolkit',
      language: 'Solidity',
      stargazers_count: 189,
      forks_count: 67,
      watchers_count: 145,
      created_at: '2023-08-20T09:15:00Z',
      updated_at: '2024-01-18T11:45:00Z',
      topics: ['blockchain', 'security', 'solidity', 'smart-contracts', 'ethereum'],
      private: false
    },
    {
      id: 3,
      name: 'fintech-payment-api',
      full_name: 'developer_user/fintech-payment-api',
      description: 'High-performance payment processing API with fraud detection and multi-currency support',
      html_url: 'https://github.com/developer_user/fintech-payment-api',
      language: 'Node.js',
      stargazers_count: 156,
      forks_count: 34,
      watchers_count: 123,
      created_at: '2023-09-10T16:20:00Z',
      updated_at: '2024-01-15T09:30:00Z',
      topics: ['fintech', 'payments', 'api', 'nodejs', 'fraud-detection'],
      private: false
    },
    {
      id: 4,
      name: 'healthcare-data-platform',
      full_name: 'developer_user/healthcare-data-platform',
      description: 'HIPAA-compliant healthcare data management platform with AI-powered diagnostics',
      html_url: 'https://github.com/developer_user/healthcare-data-platform',
      language: 'React',
      stargazers_count: 98,
      forks_count: 23,
      watchers_count: 87,
      created_at: '2023-11-05T12:45:00Z',
      updated_at: '2024-01-12T15:20:00Z',
      topics: ['healthcare', 'hipaa', 'react', 'medical', 'ai-diagnostics'],
      private: false
    },
    {
      id: 5,
      name: 'edtech-learning-assistant',
      full_name: 'developer_user/edtech-learning-assistant',
      description: 'Personalized learning platform with adaptive AI algorithms for K-12 education',
      html_url: 'https://github.com/developer_user/edtech-learning-assistant',
      language: 'React Native',
      stargazers_count: 145,
      forks_count: 56,
      watchers_count: 112,
      created_at: '2023-12-01T08:30:00Z',
      updated_at: '2024-01-10T13:15:00Z',
      topics: ['edtech', 'education', 'react-native', 'ai', 'mobile'],
      private: false
    },
    {
      id: 6,
      name: 'iot-energy-monitor',
      full_name: 'developer_user/iot-energy-monitor',
      description: 'IoT-based energy monitoring system with real-time analytics and carbon footprint tracking',
      html_url: 'https://github.com/developer_user/iot-energy-monitor',
      language: 'C++',
      stargazers_count: 76,
      forks_count: 19,
      watchers_count: 65,
      created_at: '2024-01-05T14:10:00Z',
      updated_at: '2024-01-08T16:45:00Z',
      topics: ['iot', 'energy', 'monitoring', 'arduino', 'sustainability'],
      private: false
    }
  ];

  const connectToGitHub = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate OAuth flow and API calls
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, this would involve:
      // 1. OAuth redirect to GitHub
      // 2. Exchange code for access token
      // 3. Fetch user data and repositories

      setGithubUser(mockGitHubUser);
      setRepositories(mockRepositories);
      setIsConnected(true);

      // Save connection data
      localStorage.setItem('github_connection', JSON.stringify({
        user: mockGitHubUser,
        repos: mockRepositories,
        connectedAt: new Date().toISOString()
      }));

    } catch (error) {
      setError('Failed to connect to GitHub. Please try again.');
      console.error('GitHub connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectGitHub = () => {
    setIsConnected(false);
    setGithubUser(null);
    setRepositories([]);
    localStorage.removeItem('github_connection');
  };

  const refreshRepositories = async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    try {
      // Simulate API call to refresh repos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, fetch latest repo data
      const updatedRepos = mockRepositories.map(repo => ({
        ...repo,
        updated_at: new Date().toISOString()
      }));
      
      setRepositories(updatedRepos);
      
      // Update localStorage
      const connectionData = JSON.parse(localStorage.getItem('github_connection') || '{}');
      connectionData.repos = updatedRepos;
      localStorage.setItem('github_connection', JSON.stringify(connectionData));
      
    } catch (error) {
      setError('Failed to refresh repositories');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedRepos = repositories
    .filter(repo => 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'Python': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-600',
      'React': 'bg-cyan-500',
      'React Native': 'bg-cyan-600',
      'Node.js': 'bg-green-600',
      'Solidity': 'bg-gray-700',
      'C++': 'bg-blue-700',
      'Java': 'bg-orange-600',
      'Go': 'bg-cyan-700'
    };
    return colors[language] || 'bg-gray-500';
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-2xl border border-light-border p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Github size={32} className="text-gray-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-text-primary mb-4">Connect Your GitHub</h3>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Link your GitHub profile to showcase your repositories and enhance your developer credibility on the platform.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <AlertCircle size={20} className="text-red-500" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        <button
          onClick={connectToGitHub}
          disabled={isLoading}
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Github size={20} />
              <span>Connect with GitHub</span>
            </>
          )}
        </button>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-text-muted">
          <div className="flex items-center space-x-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Showcase your projects</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Build developer credibility</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Link repos to IP registrations</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* GitHub Profile Card */}
      {githubUser && (
        <div className="bg-white rounded-2xl border border-light-border p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <img 
                src={githubUser.avatar_url} 
                alt={githubUser.name}
                className="w-20 h-20 rounded-2xl ring-2 ring-primary/30"
              />
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-text-primary">{githubUser.name}</h3>
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <p className="text-text-secondary mb-2">@{githubUser.login}</p>
                {githubUser.bio && (
                  <p className="text-text-muted max-w-md">{githubUser.bio}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={refreshRepositories}
                disabled={isLoading}
                className="p-3 bg-light-card border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={disconnectGitHub}
                className="flex items-center space-x-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 hover:bg-red-100 transition-all duration-300"
              >
                <Unlink size={18} />
                <span>Disconnect</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-light-card rounded-xl">
              <div className="text-2xl font-bold text-text-primary mb-1">{githubUser.public_repos}</div>
              <div className="text-sm text-text-muted">Repositories</div>
            </div>
            <div className="text-center p-4 bg-light-card rounded-xl">
              <div className="text-2xl font-bold text-text-primary mb-1">{githubUser.followers}</div>
              <div className="text-sm text-text-muted">Followers</div>
            </div>
            <div className="text-center p-4 bg-light-card rounded-xl">
              <div className="text-2xl font-bold text-text-primary mb-1">{githubUser.following}</div>
              <div className="text-sm text-text-muted">Following</div>
            </div>
            <div className="text-center p-4 bg-light-card rounded-xl">
              <div className="text-2xl font-bold text-text-primary mb-1">
                {repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
              </div>
              <div className="text-sm text-text-muted">Total Stars</div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-text-muted">
              {githubUser.location && (
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{githubUser.location}</span>
                </div>
              )}
              {githubUser.company && (
                <div className="flex items-center space-x-1">
                  <span>🏢</span>
                  <span>{githubUser.company}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>Joined {formatDate(githubUser.created_at)}</span>
              </div>
            </div>
            
            <a
              href={githubUser.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition-colors duration-300"
            >
              <span>View on GitHub</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      )}

      {/* Repository Management */}
      <div className="bg-white rounded-2xl border border-light-border p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Your Repositories</h3>
            <p className="text-text-secondary">Select repositories to link with your IP registrations</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 w-64"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'stars' | 'updated' | 'created')}
              className="px-4 py-2 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
            >
              <option value="stars">Most Stars</option>
              <option value="updated">Recently Updated</option>
              <option value="created">Recently Created</option>
            </select>
          </div>
        </div>

        {selectedRepos.length > 0 && (
          <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <LinkIcon size={20} className="text-primary" />
              <h4 className="font-semibold text-text-primary">Selected Repositories ({selectedRepos.length}/{maxRepos})</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedRepos.map(repo => (
                <div key={repo.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-light-border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                    <span className="font-medium text-text-primary">{repo.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <Star size={14} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedRepos.map(repo => {
            const isSelected = selectedRepos.some(selected => selected.id === repo.id);
            const canSelect = selectedRepos.length < maxRepos || isSelected;
            
            return (
              <div 
                key={repo.id} 
                className={`border rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : canSelect 
                      ? 'border-light-border hover:border-primary/50 hover:shadow-lg' 
                      : 'border-light-border opacity-50 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (canSelect && onRepoSelected) {
                    onRepoSelected(repo);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Book size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-text-primary">{repo.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-text-muted">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                        <span>{repo.language}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  )}
                </div>

                <p className="text-text-secondary mb-4 line-clamp-2">{repo.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Star size={14} />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch size={14} />
                      <span>{repo.forks_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{repo.watchers_count}</span>
                    </div>
                  </div>
                  
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-primary hover:text-primary-dark transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>

                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map(topic => (
                      <span 
                        key={topic}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                        +{repo.topics.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div className="text-xs text-text-muted">
                  Updated {formatDate(repo.updated_at)}
                </div>
              </div>
            );
          })}
        </div>

        {filteredAndSortedRepos.length === 0 && (
          <div className="text-center py-12">
            <Github size={48} className="mx-auto mb-4 text-text-muted opacity-50" />
            <p className="text-text-muted">No repositories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubIntegration;