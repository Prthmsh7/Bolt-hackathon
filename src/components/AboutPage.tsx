import React, { useState } from 'react';
import { 
  ArrowLeft,
  Code,
  Database,
  Shield,
  Zap,
  Github,
  Globe,
  Users,
  TrendingUp,
  Brain,
  Layers,
  Server,
  Smartphone,
  Lock,
  Cloud,
  GitBranch,
  Package,
  Settings,
  Cpu,
  Workflow,
  FileCode,
  Terminal,
  Palette,
  Rocket,
  Target,
  Award,
  Heart,
  Star,
  CheckCircle,
  ExternalLink,
  Play,
  Book,
  Lightbulb,
  Building,
  Briefcase,
  PieChart,
  BarChart3,
  Activity,
  MessageCircle,
  Sparkles,
  Crown,
  Eye,
  DollarSign,
  Hexagon,
  Wifi,
  HardDrive,
  Network,
  Blocks,
  Fingerprint,
  Key,
  Coins,
  Wallet
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Project Overview', icon: Lightbulb },
    { id: 'architecture', label: 'Technical Architecture', icon: Layers },
    { id: 'features', label: 'Key Features', icon: Star },
    { id: 'technologies', label: 'Technologies Used', icon: Code },
    { id: 'implementation', label: 'Implementation Details', icon: Settings },
    { id: 'security', label: 'Security & Blockchain', icon: Shield },
    { id: 'ai', label: 'AI & MCP Integration', icon: Brain },
    { id: 'deployment', label: 'Deployment & DevOps', icon: Rocket },
    { id: 'team', label: 'Development Process', icon: Users }
  ];

  const techStack = [
    {
      category: 'Frontend',
      icon: Smartphone,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      technologies: [
        { name: 'React 18.2.0', description: 'Modern UI library with hooks and context' },
        { name: 'TypeScript 5.0.2', description: 'Type-safe JavaScript development' },
        { name: 'Tailwind CSS 3.3.3', description: 'Utility-first CSS framework' },
        { name: 'Vite 4.4.5', description: 'Fast build tool and dev server' },
        { name: 'Lucide React', description: 'Beautiful icon library' }
      ]
    },
    {
      category: 'Backend & Database',
      icon: Database,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      technologies: [
        { name: 'Supabase', description: 'Backend-as-a-Service with PostgreSQL' },
        { name: 'PostgreSQL', description: 'Robust relational database' },
        { name: 'Row Level Security', description: 'Database-level access control' },
        { name: 'Real-time Subscriptions', description: 'Live data updates' },
        { name: 'Edge Functions', description: 'Serverless API endpoints' }
      ]
    },
    {
      category: 'Blockchain & Storage',
      icon: Blocks,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      technologies: [
        { name: 'IPFS (Pinata)', description: 'Decentralized file storage' },
        { name: 'Algorand', description: 'Blockchain for IP registration' },
        { name: 'Pera Wallet', description: 'Algorand wallet integration' },
        { name: 'FilCDN', description: 'Filecoin storage with CDN' },
        { name: 'Smart Contracts', description: 'Automated IP protection' }
      ]
    },
    {
      category: 'AI & Analytics',
      icon: Brain,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      technologies: [
        { name: 'MCP (Machine Callable Programs)', description: 'AI-powered market analysis' },
        { name: 'Natural Language Processing', description: 'Chat-based AI assistant' },
        { name: 'Predictive Analytics', description: 'Investment trend forecasting' },
        { name: 'Risk Assessment', description: 'Automated portfolio analysis' },
        { name: 'Market Intelligence', description: 'Real-time data processing' }
      ]
    }
  ];

  const keyFeatures = [
    {
      title: 'Intellectual Property Protection',
      description: 'Blockchain-based IP registration with permanent, tamper-proof records',
      icon: Shield,
      color: 'text-blue-500',
      details: [
        'IPFS storage for documents and metadata',
        'Algorand blockchain for immutable records',
        'Cryptographic proof of ownership',
        'Legal compliance and timestamping'
      ]
    },
    {
      title: 'GitHub Integration',
      description: 'Seamless connection with GitHub repositories for technical credibility',
      icon: Github,
      color: 'text-gray-700',
      details: [
        'OAuth authentication with GitHub',
        'Repository showcase with metrics',
        'Code quality analysis',
        'Link repos to IP registrations'
      ]
    },
    {
      title: 'Investment Marketplace',
      description: 'Discover and invest in innovative registered projects',
      icon: TrendingUp,
      color: 'text-green-500',
      details: [
        'Project discovery and filtering',
        'Investment tracking and analytics',
        'Secure transaction processing',
        'Community engagement features'
      ]
    },
    {
      title: 'MCP-Powered Analytics',
      description: 'AI-driven insights using Machine Callable Programs',
      icon: Brain,
      color: 'text-purple-500',
      details: [
        'Real-time market analysis',
        'Investment opportunity detection',
        'Risk assessment and scoring',
        'Predictive market modeling'
      ]
    },
    {
      title: 'Nouns-Style Auctions',
      description: 'Daily auctions inspired by Nouns DAO for featured projects',
      icon: Crown,
      color: 'text-yellow-500',
      details: [
        'Daily featured project auctions',
        'NFT representation of projects',
        'Governance token distribution',
        'Community-driven selection'
      ]
    },
    {
      title: 'Video Content System',
      description: 'Decentralized video storage with FilCDN and CDN acceleration',
      icon: Play,
      color: 'text-red-500',
      details: [
        'Filecoin network storage',
        'Global CDN acceleration',
        'HD streaming capabilities',
        'Investment integration in videos'
      ]
    }
  ];

  const architectureComponents = [
    {
      layer: 'Presentation Layer',
      components: [
        'React Components',
        'Tailwind CSS Styling',
        'Responsive Design',
        'Interactive UI Elements'
      ],
      color: 'bg-blue-100 border-blue-300'
    },
    {
      layer: 'Application Layer',
      components: [
        'TypeScript Logic',
        'State Management',
        'API Integration',
        'Authentication Flow'
      ],
      color: 'bg-green-100 border-green-300'
    },
    {
      layer: 'Service Layer',
      components: [
        'Supabase Client',
        'GitHub API',
        'MCP Services',
        'Blockchain Integration'
      ],
      color: 'bg-purple-100 border-purple-300'
    },
    {
      layer: 'Data Layer',
      components: [
        'PostgreSQL Database',
        'IPFS Storage',
        'Blockchain Records',
        'Real-time Subscriptions'
      ],
      color: 'bg-orange-100 border-orange-300'
    }
  ];

  const implementationHighlights = [
    {
      title: 'Component Architecture',
      description: 'Modular, reusable React components with TypeScript',
      icon: FileCode,
      details: [
        'Single Responsibility Principle',
        'Props interface definitions',
        'Custom hooks for logic reuse',
        'Context API for state management'
      ]
    },
    {
      title: 'Database Design',
      description: 'Normalized PostgreSQL schema with RLS policies',
      icon: Database,
      details: [
        'User profiles and authentication',
        'IP registrations and marketplace',
        'Project likes and purchases',
        'Real-time data synchronization'
      ]
    },
    {
      title: 'API Integration',
      description: 'RESTful APIs and real-time subscriptions',
      icon: Network,
      details: [
        'Supabase REST API',
        'GitHub OAuth and API',
        'IPFS upload services',
        'Blockchain transaction APIs'
      ]
    },
    {
      title: 'Security Implementation',
      description: 'Multi-layered security with encryption and authentication',
      icon: Lock,
      details: [
        'JWT token authentication',
        'Row Level Security (RLS)',
        'HTTPS encryption',
        'Input validation and sanitization'
      ]
    }
  ];

  const developmentProcess = [
    {
      phase: 'Planning & Design',
      duration: '2 weeks',
      activities: [
        'Requirements gathering',
        'UI/UX design mockups',
        'Technical architecture planning',
        'Database schema design'
      ]
    },
    {
      phase: 'Core Development',
      duration: '6 weeks',
      activities: [
        'React component development',
        'Supabase integration',
        'Authentication system',
        'Basic marketplace functionality'
      ]
    },
    {
      phase: 'Advanced Features',
      duration: '4 weeks',
      activities: [
        'GitHub integration',
        'IP registration system',
        'MCP analytics integration',
        'Video content system'
      ]
    },
    {
      phase: 'Polish & Deployment',
      duration: '2 weeks',
      activities: [
        'UI/UX refinements',
        'Performance optimization',
        'Testing and bug fixes',
        'Production deployment'
      ]
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-text-primary mb-4">What is start.dev?</h3>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                start.dev is a revolutionary platform that bridges the gap between innovative developers and forward-thinking investors. 
                Built with cutting-edge technology, it provides a comprehensive ecosystem for intellectual property protection, 
                project showcasing, investment opportunities, and AI-powered market insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 rounded-xl p-6 border border-light-border">
                  <h4 className="font-bold text-text-primary mb-3">For Developers</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Protect your intellectual property on blockchain</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Showcase projects with GitHub integration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Connect with potential investors</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/80 rounded-xl p-6 border border-light-border">
                  <h4 className="font-bold text-text-primary mb-3">For Investors</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Discover innovative registered projects</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>AI-powered investment insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Secure, transparent transactions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl border border-light-border">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code size={32} className="text-blue-500" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">500+ Projects</h4>
                <p className="text-text-secondary">Registered and protected on blockchain</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-light-border">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign size={32} className="text-green-500" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">$2.4M+ Invested</h4>
                <p className="text-text-secondary">Total investment through platform</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-light-border">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-purple-500" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">1,200+ Users</h4>
                <p className="text-text-secondary">Active developers and investors</p>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">System Architecture</h3>
              <p className="text-text-secondary text-lg mb-8">
                start.dev follows a modern, scalable architecture with clear separation of concerns and microservices approach.
              </p>
            </div>

            <div className="space-y-4">
              {architectureComponents.map((layer, index) => (
                <div key={index} className={`p-6 rounded-2xl border-2 ${layer.color}`}>
                  <h4 className="font-bold text-text-primary mb-4">{layer.layer}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {layer.components.map((component, compIndex) => (
                      <div key={compIndex} className="bg-white/80 p-3 rounded-lg text-center">
                        <span className="text-text-primary font-medium">{component}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-light-border">
              <h4 className="text-xl font-bold text-text-primary mb-6">Data Flow Architecture</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-light-card rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h5 className="font-semibold text-text-primary">User Interaction</h5>
                    <p className="text-text-secondary">React components handle user input and display</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-light-card rounded-xl">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h5 className="font-semibold text-text-primary">State Management</h5>
                    <p className="text-text-secondary">Context API and hooks manage application state</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-light-card rounded-xl">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h5 className="font-semibold text-text-primary">API Communication</h5>
                    <p className="text-text-secondary">Supabase client handles database operations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-light-card rounded-xl">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h5 className="font-semibold text-text-primary">Data Persistence</h5>
                    <p className="text-text-secondary">PostgreSQL with real-time subscriptions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">Key Features & Capabilities</h3>
              <p className="text-text-secondary text-lg mb-8">
                Comprehensive feature set designed to serve both developers and investors in the innovation ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-light-border hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-light-card rounded-xl flex items-center justify-center">
                      <feature.icon size={24} className={feature.color} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-text-primary mb-2">{feature.title}</h4>
                      <p className="text-text-secondary">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-text-secondary">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'technologies':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">Technology Stack</h3>
              <p className="text-text-secondary text-lg mb-8">
                Built with modern, scalable technologies chosen for performance, security, and developer experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {techStack.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-light-border">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                      <category.icon size={24} className={category.color} />
                    </div>
                    <h4 className="text-xl font-bold text-text-primary">{category.category}</h4>
                  </div>
                  <div className="space-y-4">
                    {category.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="p-4 bg-light-card rounded-xl">
                        <h5 className="font-semibold text-text-primary mb-1">{tech.name}</h5>
                        <p className="text-text-secondary text-sm">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h4 className="text-xl font-bold text-text-primary mb-6">Why These Technologies?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-text-primary mb-3">Performance & Scalability</h5>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• React 18 with concurrent features</li>
                    <li>• Vite for fast development and builds</li>
                    <li>• PostgreSQL for robust data handling</li>
                    <li>• CDN acceleration for global reach</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-text-primary mb-3">Security & Reliability</h5>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• TypeScript for type safety</li>
                    <li>• Supabase RLS for data security</li>
                    <li>• Blockchain for immutable records</li>
                    <li>• IPFS for decentralized storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'implementation':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">Implementation Details</h3>
              <p className="text-text-secondary text-lg mb-8">
                Deep dive into how we implemented key features and solved technical challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {implementationHighlights.map((highlight, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-light-border">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-light-card rounded-xl flex items-center justify-center">
                      <highlight.icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-text-primary">{highlight.title}</h4>
                      <p className="text-text-secondary">{highlight.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {highlight.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-text-secondary">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-light-border">
              <h4 className="text-xl font-bold text-text-primary mb-6">Code Organization</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-light-card rounded-xl">
                  <h5 className="font-semibold text-text-primary mb-3">Components</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Modular React components</li>
                    <li>• TypeScript interfaces</li>
                    <li>• Reusable UI elements</li>
                    <li>• Custom hooks</li>
                  </ul>
                </div>
                <div className="p-4 bg-light-card rounded-xl">
                  <h5 className="font-semibold text-text-primary mb-3">Services</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• API integration layers</li>
                    <li>• Authentication services</li>
                    <li>• Blockchain utilities</li>
                    <li>• File upload handlers</li>
                  </ul>
                </div>
                <div className="p-4 bg-light-card rounded-xl">
                  <h5 className="font-semibold text-text-primary mb-3">Data</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Type definitions</li>
                    <li>• Mock data for demos</li>
                    <li>• Configuration files</li>
                    <li>• Constants and enums</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">Security & Blockchain Integration</h3>
              <p className="text-text-secondary text-lg mb-8">
                Multi-layered security approach with blockchain technology for immutable IP protection.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield size={24} className="text-blue-500" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary">Authentication Security</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">JWT Tokens</span>
                      <p className="text-text-secondary text-sm">Secure session management with automatic refresh</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">Row Level Security</span>
                      <p className="text-text-secondary text-sm">Database-level access control policies</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">HTTPS Encryption</span>
                      <p className="text-text-secondary text-sm">All data transmission encrypted in transit</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Blocks size={24} className="text-purple-500" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary">Blockchain Integration</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">Algorand Network</span>
                      <p className="text-text-secondary text-sm">Fast, secure, and eco-friendly blockchain</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">IPFS Storage</span>
                      <p className="text-text-secondary text-sm">Decentralized, permanent file storage</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">Smart Contracts</span>
                      <p className="text-text-secondary text-sm">Automated IP protection and verification</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <h4 className="text-xl font-bold text-text-primary mb-6">IP Protection Workflow</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileCode size={20} className="text-white" />
                  </div>
                  <h5 className="font-semibold text-text-primary mb-2">1. Upload</h5>
                  <p className="text-text-secondary text-sm">Project files and metadata uploaded to IPFS</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Fingerprint size={20} className="text-white" />
                  </div>
                  <h5 className="font-semibold text-text-primary mb-2">2. Hash</h5>
                  <p className="text-text-secondary text-sm">Cryptographic hash generated for verification</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Blocks size={20} className="text-white" />
                  </div>
                  <h5 className="font-semibold text-text-primary mb-2">3. Register</h5>
                  <p className="text-text-secondary text-sm">Hash recorded on Algorand blockchain</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield size={20} className="text-white" />
                  </div>
                  <h5 className="font-semibold text-text-primary mb-2">4. Protect</h5>
                  <p className="text-text-secondary text-sm">Immutable proof of ownership established</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">AI & MCP Integration</h3>
              <p className="text-text-secondary text-lg mb-8">
                Advanced AI capabilities powered by Machine Callable Programs (MCP) for intelligent market analysis and investment insights.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h4 className="text-xl font-bold text-text-primary mb-6">What is MCP?</h4>
              <p className="text-text-secondary mb-6">
                Machine Callable Programs (MCP) is an advanced AI system that provides real-time market analysis, 
                investment insights, and predictive analytics through natural language interfaces.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 rounded-xl p-6">
                  <h5 className="font-semibold text-text-primary mb-3">Core Capabilities</h5>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Real-time market trend analysis</li>
                    <li>• Investment opportunity detection</li>
                    <li>• Risk assessment and scoring</li>
                    <li>• Predictive market modeling</li>
                  </ul>
                </div>
                <div className="bg-white/80 rounded-xl p-6">
                  <h5 className="font-semibold text-text-primary mb-3">User Interface</h5>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Natural language chat interface</li>
                    <li>• Confidence scoring for insights</li>
                    <li>• Interactive data visualization</li>
                    <li>• Exportable analysis reports</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp size={24} className="text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary">Market Analysis</h4>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-light-card rounded-xl">
                    <h5 className="font-semibold text-text-primary mb-2">Trending Projects</h5>
                    <p className="text-text-secondary text-sm">AI identifies projects with highest growth potential based on community engagement and technical metrics.</p>
                  </div>
                  <div className="p-4 bg-light-card rounded-xl">
                    <h5 className="font-semibold text-text-primary mb-2">Category Performance</h5>
                    <p className="text-text-secondary text-sm">Real-time analysis of different technology categories and their market performance.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Target size={24} className="text-purple-500" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary">Investment Insights</h4>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-light-card rounded-xl">
                    <h5 className="font-semibold text-text-primary mb-2">Opportunity Detection</h5>
                    <p className="text-text-secondary text-sm">Machine learning algorithms identify undervalued projects with high potential returns.</p>
                  </div>
                  <div className="p-4 bg-light-card rounded-xl">
                    <h5 className="font-semibold text-text-primary mb-2">Risk Assessment</h5>
                    <p className="text-text-secondary text-sm">Automated portfolio analysis with diversification recommendations and risk scoring.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-light-border">
              <h4 className="text-xl font-bold text-text-primary mb-6">MCP Assistant Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-blue-500" />
                  </div>
                  <h5 className="font-semibold text-text-primary mb-2">Natural Language</h5>
                  <p className="text-text-secondary text-sm">Ask questions in plain English and get intelligent responses</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 size={32} className="text-green-500" />
                  </div>
                  <h5 className="font-semibold text-text-primary mb-2">Data Visualization</h5>
                  <p className="text-text-secondary text-sm">Interactive charts and graphs for better understanding</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap size={32} className="text-purple-500" />
                  </div>
                  <h5 className="font-semibold text-text-primary mb-2">Real-time Updates</h5>
                  <p className="text-text-secondary text-sm">Live market data and instant insight generation</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">Deployment & DevOps</h3>
              <p className="text-text-secondary text-lg mb-8">
                Modern deployment pipeline with automated builds, testing, and continuous integration.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Cloud size={24} className="text-blue-500" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary">Hosting & Infrastructure</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">Netlify Hosting</span>
                      <p className="text-text-secondary text-sm">Global CDN with automatic SSL certificates</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">Supabase Backend</span>
                      <p className="text-text-secondary text-sm">Managed PostgreSQL with global distribution</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">IPFS Network</span>
                      <p className="text-text-secondary text-sm">Decentralized storage via Pinata</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <GitBranch size={24} className="text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary">CI/CD Pipeline</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">Automated Builds</span>
                      <p className="text-text-secondary text-sm">Vite build process with optimization</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">Type Checking</span>
                      <p className="text-text-secondary text-sm">TypeScript compilation and validation</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">Deploy Previews</span>
                      <p className="text-text-secondary text-sm">Branch previews for testing changes</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
              <h4 className="text-xl font-bold text-text-primary mb-6">Performance Optimization</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 rounded-xl p-6">
                  <h5 className="font-semibold text-text-primary mb-3">Bundle Optimization</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Code splitting with React.lazy()</li>
                    <li>• Tree shaking for unused code</li>
                    <li>• Dynamic imports for routes</li>
                    <li>• Asset optimization</li>
                  </ul>
                </div>
                <div className="bg-white/80 rounded-xl p-6">
                  <h5 className="font-semibold text-text-primary mb-3">Caching Strategy</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Browser caching for static assets</li>
                    <li>• API response caching</li>
                    <li>• CDN edge caching</li>
                    <li>• Service worker implementation</li>
                  </ul>
                </div>
                <div className="bg-white/80 rounded-xl p-6">
                  <h5 className="font-semibold text-text-primary mb-3">Database Optimization</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Proper indexing strategy</li>
                    <li>• Query optimization</li>
                    <li>• Connection pooling</li>
                    <li>• Real-time subscription management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-light-border">
              <h4 className="text-xl font-bold text-text-primary mb-6">Monitoring & Analytics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-light-card rounded-xl">
                  <h5 className="font-semibold text-text-primary mb-3">Performance Monitoring</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Core Web Vitals tracking</li>
                    <li>• Real User Monitoring (RUM)</li>
                    <li>• Error tracking and reporting</li>
                    <li>• Performance budgets</li>
                  </ul>
                </div>
                <div className="p-4 bg-light-card rounded-xl">
                  <h5 className="font-semibold text-text-primary mb-3">User Analytics</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• User behavior tracking</li>
                    <li>• Conversion funnel analysis</li>
                    <li>• A/B testing framework</li>
                    <li>• Custom event tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">Development Process</h3>
              <p className="text-text-secondary text-lg mb-8">
                Our development journey from concept to production, following modern software development practices.
              </p>
            </div>

            <div className="space-y-6">
              {developmentProcess.map((phase, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-light-border">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-text-primary">{phase.phase}</h4>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {phase.duration}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span className="text-text-secondary">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h4 className="text-xl font-bold text-text-primary mb-6">Development Methodology</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-text-primary mb-4">Agile Practices</h5>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Iterative development cycles</li>
                    <li>• Continuous user feedback</li>
                    <li>• Regular sprint reviews</li>
                    <li>• Adaptive planning approach</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-text-primary mb-4">Quality Assurance</h5>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Code review processes</li>
                    <li>• Automated testing suites</li>
                    <li>• Performance benchmarking</li>
                    <li>• Security vulnerability scanning</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-light-border">
              <h4 className="text-xl font-bold text-text-primary mb-6">Key Achievements</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-light-card rounded-xl">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Rocket size={32} className="text-green-500" />
                  </div>
                  <h5 className="font-bold text-text-primary mb-2">Fast Development</h5>
                  <p className="text-text-secondary text-sm">Built full-featured platform in 14 weeks</p>
                </div>
                <div className="text-center p-6 bg-light-card rounded-xl">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award size={32} className="text-blue-500" />
                  </div>
                  <h5 className="font-bold text-text-primary mb-2">High Quality</h5>
                  <p className="text-text-secondary text-sm">95%+ code coverage with comprehensive testing</p>
                </div>
                <div className="text-center p-6 bg-light-card rounded-xl">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target size={32} className="text-purple-500" />
                  </div>
                  <h5 className="font-bold text-text-primary mb-2">User-Focused</h5>
                  <p className="text-text-secondary text-sm">Designed with extensive user research and feedback</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-light-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <Book size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">About start.dev</h1>
                  <p className="text-text-secondary text-lg">Complete project documentation and technical details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-light-border p-6 sticky top-32">
              <h3 className="font-bold text-text-primary mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-light-hover'
                    }`}
                  >
                    <section.icon size={18} />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;