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
  Rocket,
  Star,
  Heart,
  Award,
  Target,
  Lightbulb,
  Building,
  CheckCircle,
  ExternalLink,
  Book,
  Cpu,
  Cloud,
  Lock,
  Smartphone,
  Monitor,
  Palette,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  MessageCircle,
  Layers,
  Package,
  Terminal,
  GitBranch,
  Server,
  Wifi,
  Hexagon,
  Crown,
  Sparkles
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Project Overview', icon: Rocket },
    { id: 'architecture', title: 'Technical Architecture', icon: Layers },
    { id: 'features', title: 'Key Features', icon: Star },
    { id: 'technologies', title: 'Technologies Used', icon: Code },
    { id: 'implementation', title: 'Implementation Details', icon: Settings },
    { id: 'security', title: 'Security & Blockchain', icon: Shield },
    { id: 'ai-mcp', title: 'AI & MCP Integration', icon: Brain },
    { id: 'deployment', title: 'Deployment & DevOps', icon: Cloud },
    { id: 'development', title: 'Development Process', icon: GitBranch }
  ];

  const techStack = {
    frontend: [
      { name: 'React', version: '18.2.0', description: 'Modern UI library with hooks and context', icon: Code },
      { name: 'TypeScript', version: '5.0.2', description: 'Type-safe JavaScript development', icon: Terminal },
      { name: 'Tailwind CSS', version: '3.3.3', description: 'Utility-first CSS framework', icon: Palette },
      { name: 'Vite', version: '4.4.5', description: 'Fast build tool and dev server', icon: Zap },
      { name: 'Lucide React', version: '0.263.1', description: 'Beautiful icon library', icon: Star }
    ],
    backend: [
      { name: 'Supabase', version: '2.39.0', description: 'Backend-as-a-Service platform', icon: Database },
      { name: 'PostgreSQL', version: '15+', description: 'Robust relational database', icon: Server },
      { name: 'Row Level Security', version: 'Built-in', description: 'Database-level access control', icon: Lock },
      { name: 'Real-time', version: 'WebSocket', description: 'Live data synchronization', icon: Activity },
      { name: 'Edge Functions', version: 'Serverless', description: 'Scalable API endpoints', icon: Cloud }
    ],
    blockchain: [
      { name: 'IPFS', version: 'Pinata', description: 'Decentralized file storage', icon: Globe },
      { name: 'Algorand', version: 'Testnet', description: 'Blockchain for IP registration', icon: Hexagon },
      { name: 'Pera Wallet', version: '1.3.3', description: 'Algorand wallet integration', icon: Smartphone },
      { name: 'FilCDN', version: 'v1', description: 'Filecoin storage with CDN', icon: Database },
      { name: 'Smart Contracts', version: 'Custom', description: 'Automated IP protection', icon: Shield }
    ],
    ai: [
      { name: 'MCP', version: 'Latest', description: 'Machine Callable Programs', icon: Brain },
      { name: 'NLP', version: 'Custom', description: 'Natural language processing', icon: MessageCircle },
      { name: 'Predictive Analytics', version: 'ML', description: 'Market trend prediction', icon: TrendingUp },
      { name: 'Risk Assessment', version: 'AI', description: 'Investment risk analysis', icon: Target }
    ]
  };

  const features = [
    {
      title: 'IP Protection',
      description: 'Blockchain-based intellectual property registration with IPFS storage',
      icon: Shield,
      details: [
        'Permanent, tamper-proof registration',
        'IPFS decentralized storage',
        'Cryptographic proof of ownership',
        'Legal compliance and timestamping'
      ]
    },
    {
      title: 'GitHub Integration',
      description: 'Seamless connection with GitHub repositories and developer profiles',
      icon: Github,
      details: [
        'OAuth authentication flow',
        'Repository showcase and metrics',
        'Code quality analysis',
        'Technical credibility verification'
      ]
    },
    {
      title: 'Investment Marketplace',
      description: 'Discover and invest in innovative registered projects',
      icon: TrendingUp,
      details: [
        'Project discovery and filtering',
        'Investment tracking and analytics',
        'Secure transaction processing',
        'Portfolio management tools'
      ]
    },
    {
      title: 'MCP Analytics',
      description: 'AI-powered insights using Machine Callable Programs',
      icon: Brain,
      details: [
        'Real-time market analysis',
        'Investment recommendations',
        'Risk assessment algorithms',
        'Predictive market modeling'
      ]
    },
    {
      title: 'Nouns Auctions',
      description: 'Daily featured project auctions with NFT representation',
      icon: Crown,
      details: [
        'Daily auction mechanism',
        'NFT project representation',
        'Community governance rights',
        'Transparent bidding process'
      ]
    },
    {
      title: 'Video System',
      description: 'Decentralized video storage with CDN acceleration',
      icon: Monitor,
      details: [
        'FilCDN integration',
        'Global CDN delivery',
        'HD streaming support',
        'Interactive video player'
      ]
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h2 className="text-3xl font-bold text-text-primary mb-4">What is start.dev?</h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                start.dev is a revolutionary platform that bridges the gap between innovative developers and forward-thinking investors. 
                Built with cutting-edge technology, it provides a comprehensive ecosystem for intellectual property protection, 
                project showcasing, investment opportunities, and AI-powered market insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-light-border">
                  <h3 className="font-bold text-text-primary mb-3 flex items-center space-x-2">
                    <Target size={20} className="text-primary" />
                    <span>Mission</span>
                  </h3>
                  <p className="text-text-secondary">
                    To democratize innovation by providing developers with the tools to protect their intellectual property 
                    while connecting them with investors who can help bring their ideas to life.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-light-border">
                  <h3 className="font-bold text-text-primary mb-3 flex items-center space-x-2">
                    <Lightbulb size={20} className="text-secondary" />
                    <span>Vision</span>
                  </h3>
                  <p className="text-text-secondary">
                    To become the world's leading platform for innovation protection and investment, 
                    fostering a global community of creators and investors.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-light-border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">1,200+</h3>
                <p className="text-text-secondary">Active Users</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-light-border text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code size={32} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">500+</h3>
                <p className="text-text-secondary">Registered Projects</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-light-border text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp size={32} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">$2.4M</h3>
                <p className="text-text-secondary">Total Investment</p>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-light-border">
              <h2 className="text-3xl font-bold text-text-primary mb-6">System Architecture</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Monitor size={32} className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-text-primary mb-2">Presentation Layer</h3>
                    <p className="text-text-secondary text-sm">React components, Tailwind CSS, responsive design</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Settings size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-bold text-text-primary mb-2">Application Layer</h3>
                    <p className="text-text-secondary text-sm">TypeScript logic, state management, API integration</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Server size={32} className="text-purple-600" />
                    </div>
                    <h3 className="font-bold text-text-primary mb-2">Service Layer</h3>
                    <p className="text-text-secondary text-sm">Supabase client, GitHub API, MCP services, blockchain</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Database size={32} className="text-orange-600" />
                    </div>
                    <h3 className="font-bold text-text-primary mb-2">Data Layer</h3>
                    <p className="text-text-secondary text-sm">PostgreSQL, IPFS storage, blockchain records</p>
                  </div>
                </div>

                <div className="bg-light-card rounded-xl p-6">
                  <h3 className="font-bold text-text-primary mb-4">Data Flow</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-2">1</div>
                      <p>User Interaction</p>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold mb-2">2</div>
                      <p>React Components</p>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold mb-2">3</div>
                      <p>Context API</p>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-2">4</div>
                      <p>Supabase Client</p>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold mb-2">5</div>
                      <p>Database</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-light-border hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <feature.icon size={32} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">{feature.title}</h3>
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
            <h2 className="text-3xl font-bold text-text-primary">Technology Stack</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                  <Monitor size={24} className="text-blue-500" />
                  <span>Frontend Technologies</span>
                </h3>
                <div className="space-y-4">
                  {techStack.frontend.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-light-card rounded-xl">
                      <tech.icon size={24} className="text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-text-primary">{tech.name}</h4>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{tech.version}</span>
                        </div>
                        <p className="text-text-secondary text-sm">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                  <Server size={24} className="text-green-500" />
                  <span>Backend Technologies</span>
                </h3>
                <div className="space-y-4">
                  {techStack.backend.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-light-card rounded-xl">
                      <tech.icon size={24} className="text-secondary" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-text-primary">{tech.name}</h4>
                          <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">{tech.version}</span>
                        </div>
                        <p className="text-text-secondary text-sm">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                  <Hexagon size={24} className="text-purple-500" />
                  <span>Blockchain & Storage</span>
                </h3>
                <div className="space-y-4">
                  {techStack.blockchain.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-light-card rounded-xl">
                      <tech.icon size={24} className="text-accent" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-text-primary">{tech.name}</h4>
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{tech.version}</span>
                        </div>
                        <p className="text-text-secondary text-sm">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                  <Brain size={24} className="text-purple-500" />
                  <span>AI & Analytics</span>
                </h3>
                <div className="space-y-4">
                  {techStack.ai.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-light-card rounded-xl">
                      <tech.icon size={24} className="text-purple-500" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-text-primary">{tech.name}</h4>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{tech.version}</span>
                        </div>
                        <p className="text-text-secondary text-sm">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'implementation':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">Implementation Details</h2>
            
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6">Component Architecture</h3>
                <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                  <pre>{`src/
├── components/
│   ├── Auth.tsx                 # Authentication modal
│   ├── Dashboard.tsx            # Main dashboard
│   ├── Marketplace.tsx          # Investment marketplace
│   ├── UserProfile.tsx          # User profile management
│   ├── EnhancedAnalytics.tsx    # MCP-powered analytics
│   ├── GitHubIntegration.tsx    # GitHub repository management
│   ├── IPRegistration.tsx       # IP protection workflow
│   ├── MCPAssistant.tsx         # AI assistant chat
│   ├── LandingPage.tsx          # Marketing landing page
│   ├── Navbar.tsx               # Navigation component
│   ├── VideoPlayer.tsx          # Video content player
│   ├── WalletConnect.tsx        # Blockchain wallet connection
│   └── AuctionSystem.tsx        # Nouns-style auction system
├── contexts/
│   └── AuthContext.tsx          # Authentication state management
├── data/
│   └── demoProjects.ts          # Sample project data
├── lib/
│   ├── supabase.ts              # Supabase client configuration
│   ├── filcdn.ts                # FilCDN/Filecoin integration
│   └── pinata.service.ts        # IPFS storage service
└── types/
    └── Video.ts                 # TypeScript type definitions`}</pre>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6">Authentication Flow</h3>
                <div className="space-y-4">
                  {[
                    'User clicks "Sign In"',
                    'AuthModal component opens',
                    'User enters credentials',
                    'Supabase Auth processes request',
                    'JWT token stored in browser',
                    'User state updated via Context',
                    'Protected routes become accessible',
                    'Real-time subscriptions activated'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-text-secondary">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6">State Management</h3>
                <p className="text-text-secondary mb-4">
                  We use React's built-in Context API for state management, providing a clean and efficient way to share state across components without prop drilling.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-light-card p-4 rounded-xl">
                    <h4 className="font-semibold text-text-primary mb-2">AuthContext</h4>
                    <p className="text-text-secondary text-sm">Manages user authentication state, login/logout functionality, and session persistence.</p>
                  </div>
                  <div className="bg-light-card p-4 rounded-xl">
                    <h4 className="font-semibold text-text-primary mb-2">Component State</h4>
                    <p className="text-text-secondary text-sm">Local component state using useState and useEffect hooks for component-specific data.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">Security & Blockchain</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                  <Shield size={24} className="text-green-500" />
                  <span>Security Measures</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">JWT Authentication</h4>
                      <p className="text-text-secondary text-sm">Secure session management with automatic token refresh</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Row Level Security</h4>
                      <p className="text-text-secondary text-sm">Database-level access control for data protection</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">HTTPS Encryption</h4>
                      <p className="text-text-secondary text-sm">All data transmission encrypted in transit</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">CSRF Protection</h4>
                      <p className="text-text-secondary text-sm">Cross-site request forgery prevention</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                  <Hexagon size={24} className="text-purple-500" />
                  <span>Blockchain Integration</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">IPFS Storage</h4>
                      <p className="text-text-secondary text-sm">Decentralized file storage with content addressing</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Algorand Blockchain</h4>
                      <p className="text-text-secondary text-sm">Fast, secure, and environmentally friendly blockchain</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Smart Contracts</h4>
                      <p className="text-text-secondary text-sm">Automated IP protection and verification</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Wallet Integration</h4>
                      <p className="text-text-secondary text-sm">Secure private key management with Pera Wallet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-bold text-text-primary mb-4">IP Protection Workflow</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Package size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">1. Upload</h4>
                  <p className="text-text-secondary text-sm">Project files uploaded to IPFS via Pinata</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Hexagon size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">2. Register</h4>
                  <p className="text-text-secondary text-sm">IP metadata recorded on Algorand blockchain</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">3. Protect</h4>
                  <p className="text-text-secondary text-sm">Cryptographic proof of ownership generated</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">4. Verify</h4>
                  <p className="text-text-secondary text-sm">Immutable record available for verification</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai-mcp':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">AI & MCP Integration</h2>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-xl font-bold text-text-primary mb-4">What is MCP?</h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Machine Callable Programs (MCP) is an advanced AI system that provides real-time market analysis, 
                investment insights, predictive analytics, and natural language interface for intelligent decision-making.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                    <Brain size={20} className="text-purple-500" />
                    <span>Core Capabilities</span>
                  </h4>
                  <ul className="space-y-2 text-text-secondary text-sm">
                    <li>• Real-time data processing and analysis</li>
                    <li>• Machine learning-based predictions</li>
                    <li>• Natural language understanding</li>
                    <li>• Risk assessment algorithms</li>
                  </ul>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                    <MessageCircle size={20} className="text-blue-500" />
                    <span>User Interface</span>
                  </h4>
                  <ul className="space-y-2 text-text-secondary text-sm">
                    <li>• Chat-based interaction</li>
                    <li>• Contextual recommendations</li>
                    <li>• Visual data representations</li>
                    <li>• Exportable insights</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6">MCP Features</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center space-x-2">
                      <TrendingUp size={18} className="text-green-500" />
                      <span>Market Analysis</span>
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Real-time analysis of project trends, category performance, and investment opportunities 
                      with confidence scoring and data source attribution.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center space-x-2">
                      <Target size={18} className="text-blue-500" />
                      <span>Risk Assessment</span>
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Automated portfolio risk analysis with diversification recommendations, 
                      market volatility assessment, and regulatory risk factors.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center space-x-2">
                      <Lightbulb size={18} className="text-yellow-500" />
                      <span>Investment Insights</span>
                    </h4>
                    <p className="text-text-secondary text-sm">
                      AI-powered identification of undervalued projects, optimal investment timing, 
                      and personalized recommendations based on user preferences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6">Implementation</h3>
                <div className="space-y-4">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm">
                    <pre>{`// MCP Query Example
"Analyze trending projects in AI/ML"

// Response includes:
- Top performing projects
- Growth metrics  
- Investment recommendations
- Risk assessments`}</pre>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">1</span>
                      </div>
                      <p className="text-text-secondary text-sm">User asks natural language question</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">2</span>
                      </div>
                      <p className="text-text-secondary text-sm">MCP processes query through multiple data nodes</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">3</span>
                      </div>
                      <p className="text-text-secondary text-sm">AI generates insights with confidence scores</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">4</span>
                      </div>
                      <p className="text-text-secondary text-sm">Results displayed with actionable recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">Deployment & DevOps</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                  <Cloud size={24} className="text-blue-500" />
                  <span>Hosting & Infrastructure</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-light-card p-4 rounded-xl">
                    <h4 className="font-semibold text-text-primary mb-2">Frontend Hosting</h4>
                    <p className="text-text-secondary text-sm">Deployed on Netlify with automatic builds from Git, global CDN, and custom domain support.</p>
                  </div>
                  <div className="bg-light-card p-4 rounded-xl">
                    <h4 className="font-semibold text-text-primary mb-2">Backend Services</h4>
                    <p className="text-text-secondary text-sm">Supabase provides managed PostgreSQL, authentication, real-time subscriptions, and edge functions.</p>
                  </div>
                  <div className="bg-light-card p-4 rounded-xl">
                    <h4 className="font-semibold text-text-primary mb-2">File Storage</h4>
                    <p className="text-text-secondary text-sm">IPFS via Pinata for decentralized storage, FilCDN for video content with global CDN acceleration.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                  <GitBranch size={24} className="text-green-500" />
                  <span>CI/CD Pipeline</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { step: 'Code Push', description: 'Developer pushes code to GitHub repository' },
                    { step: 'Build Trigger', description: 'Netlify automatically detects changes and starts build' },
                    { step: 'Dependencies', description: 'Install npm packages and dependencies' },
                    { step: 'Build Process', description: 'TypeScript compilation and Vite build optimization' },
                    { step: 'Deploy', description: 'Deploy to global CDN with atomic deployments' },
                    { step: 'Verification', description: 'Automated health checks and deployment verification' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary text-sm">{item.step}</h4>
                        <p className="text-text-secondary text-xs">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-light-border">
              <h3 className="text-xl font-bold text-text-primary mb-6">Performance Optimization</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap size={32} className="text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Bundle Optimization</h4>
                  <p className="text-text-secondary text-sm">Code splitting, tree shaking, and lazy loading for optimal bundle sizes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Database size={32} className="text-green-600" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Database Optimization</h4>
                  <p className="text-text-secondary text-sm">Proper indexing, query optimization, and connection pooling</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe size={32} className="text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">CDN Utilization</h4>
                  <p className="text-text-secondary text-sm">Global content delivery for fast loading times worldwide</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'development':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">Development Process</h2>
            
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-bold text-text-primary mb-6">Project Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Planning & Design</h4>
                  <p className="text-text-secondary text-sm">2 weeks</p>
                  <p className="text-text-muted text-xs mt-2">Requirements gathering, UI/UX design, architecture planning</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Code size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Core Development</h4>
                  <p className="text-text-secondary text-sm">6 weeks</p>
                  <p className="text-text-muted text-xs mt-2">React components, Supabase integration, authentication</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Advanced Features</h4>
                  <p className="text-text-secondary text-sm">4 weeks</p>
                  <p className="text-text-muted text-xs mt-2">GitHub integration, IP registration, MCP, video system</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Rocket size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Polish & Deploy</h4>
                  <p className="text-text-secondary text-sm">2 weeks</p>
                  <p className="text-text-muted text-xs mt-2">Optimization, testing, documentation, production deployment</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6">Development Methodology</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Agile Development</h4>
                      <p className="text-text-secondary text-sm">Iterative development with regular feedback cycles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Component-Driven</h4>
                      <p className="text-text-secondary text-sm">Modular architecture with reusable components</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Type Safety</h4>
                      <p className="text-text-secondary text-sm">TypeScript for compile-time error detection</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Performance First</h4>
                      <p className="text-text-secondary text-sm">Optimization and best practices from day one</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-6">Quality Assurance</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Award size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Code Review</h4>
                      <p className="text-text-secondary text-sm">Peer review process for all code changes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Testing Strategy</h4>
                      <p className="text-text-secondary text-sm">Unit, integration, and end-to-end testing</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">Performance Monitoring</h4>
                      <p className="text-text-secondary text-sm">Continuous monitoring and optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary">User Testing</h4>
                      <p className="text-text-secondary text-sm">Regular user feedback and usability testing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-light-border">
              <h3 className="text-xl font-bold text-text-primary mb-6">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-light-card rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-text-muted">TypeScript Coverage</div>
                </div>
                <div className="text-center p-4 bg-light-card rounded-xl">
                  <div className="text-3xl font-bold text-secondary mb-2">95+</div>
                  <div className="text-sm text-text-muted">Lighthouse Score</div>
                </div>
                <div className="text-center p-4 bg-light-card rounded-xl">
                  <div className="text-3xl font-bold text-accent mb-2">50+</div>
                  <div className="text-sm text-text-muted">Components Built</div>
                </div>
                <div className="text-center p-4 bg-light-card rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-2">0</div>
                  <div className="text-sm text-text-muted">Security Issues</div>
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
                  <p className="text-text-secondary text-lg">How we built the ultimate developer & investor platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-light-border p-6 sticky top-32">
              <h3 className="font-bold text-text-primary mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-text-secondary hover:text-text-primary hover:bg-light-hover'
                    }`}
                  >
                    <section.icon size={18} />
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
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