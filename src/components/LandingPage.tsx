import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Rocket,
  Play,
  CheckCircle,
  MessageCircle,
  Sparkles,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Code,
  DollarSign,
  Star,
  Github,
  Globe,
  Database,
  Lightbulb
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'IP Protection',
      description: 'Register your projects as intellectual property on the blockchain for permanent protection'
    },
    {
      icon: Github,
      title: 'GitHub Integration',
      description: 'Connect your GitHub repositories to showcase your technical expertise and code quality'
    },
    {
      icon: TrendingUp,
      title: 'Investment Opportunities',
      description: 'Discover and invest in innovative projects from talented developers worldwide'
    },
    {
      icon: Database,
      title: 'MCP Analytics',
      description: 'AI-powered insights using Machine Callable Programs for smart investment decisions'
    }
  ];

  const stats = [
    { number: '500+', label: 'Registered Projects', icon: Code },
    { number: '$2.4M', label: 'Total Investment', icon: DollarSign },
    { number: '1,200+', label: 'Active Users', icon: Users },
    { number: '94%', label: 'Success Rate', icon: Star }
  ];

  return (
    <div className={`min-h-screen bg-black text-white overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* CSS Endless Knot Background */}
      <div className="endless-knot-container">
        <div className="endless-knot">
          <div className="knot-text">SEEDORA</div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="neo-btn inline-flex items-center space-x-2 bg-white px-4 py-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text-primary">Powered by Blockchain & AI</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="text-white">
                    Seedora
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  The ultimate platform for developers and investors. Register your IP, showcase your projects, and discover the next big innovation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-white text-black font-bold text-lg"
                >
                  <Rocket size={24} />
                  <span>Get Started Free</span>
                  <ArrowRight size={20} />
                </button>
                
                <button className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border border-white text-white font-semibold text-lg">
                  <Play size={20} />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Free forever plan</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="neo-card bg-white/10 backdrop-blur-sm p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Live Platform Stats</h3>
                    <div className="flex items-center space-x-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 neo-card bg-white/5 backdrop-blur-sm">
                        <stat.icon size={24} className="mx-auto mb-2 text-white" />
                        <div className="text-2xl font-bold text-white">{stat.number}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="neo-card bg-white/5 backdrop-blur-sm p-4">
                    <div className="flex items-center space-x-3">
                      <MessageCircle size={20} className="text-white" />
                      <div>
                        <p className="font-semibold text-white">MCP Assistant Active</p>
                        <p className="text-sm text-gray-300">AI-powered investment insights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Everything you need to <span className="text-primary">succeed</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              From IP protection to investment opportunities, Seedora provides all the tools developers and investors need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="neo-card bg-white p-8 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to protect your innovations?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Seedora to protect their intellectual property and connect with investors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-white text-primary font-bold text-lg"
            >
              <Rocket size={24} />
              <span>Start Building Today</span>
              <ArrowRight size={20} />
            </button>
            
            <button className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-secondary text-white font-semibold text-lg">
              <MessageCircle size={20} />
              <span>Talk to Sales</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">
                <span className="text-white">Seedora</span>
              </h3>
              <p className="text-white/80 leading-relaxed">
                The ultimate platform for developers and investors to protect IP and discover innovations.
              </p>
              <div className="flex items-center space-x-4">
                <Github size={20} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                <Globe size={20} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                <MessageCircle size={20} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 Seedora. All rights reserved. Built with ❤️ for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;