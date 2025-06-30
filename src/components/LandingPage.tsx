import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Github, 
  TrendingUp, 
  DollarSign, 
  Star, 
  CheckCircle
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star size={16} className="text-white" />
                  <span className="text-sm font-medium text-white">Powered by Blockchain & AI</span>
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
                  className="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-xl"
                >
                  <span>Get Started Free</span>
                  <ArrowRight size={20} />
                </button>
                
                <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border border-white text-white font-semibold text-lg rounded-xl">
                  <span>Learn More</span>
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

            <div className="relative hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Platform Stats</h3>
                    <div className="flex items-center space-x-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                      <DollarSign className="mx-auto mb-2 text-white" size={24} />
                      <div className="text-2xl font-bold text-white">$2.4M</div>
                      <div className="text-sm text-gray-400">Total Investment</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                      <Shield className="mx-auto mb-2 text-white" size={24} />
                      <div className="text-2xl font-bold text-white">500+</div>
                      <div className="text-sm text-gray-400">Projects Protected</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                      <Github className="mx-auto mb-2 text-white" size={24} />
                      <div className="text-2xl font-bold text-white">1.2K</div>
                      <div className="text-sm text-gray-400">GitHub Repos</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                      <TrendingUp className="mx-auto mb-2 text-white" size={24} />
                      <div className="text-2xl font-bold text-white">94%</div>
                      <div className="text-sm text-gray-400">Success Rate</div>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From IP protection to investment opportunities, Seedora provides all the tools developers and investors need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Shield size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">IP Protection</h3>
              <p className="text-gray-600">Register your projects as intellectual property on the blockchain for permanent protection</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Github size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">GitHub Integration</h3>
              <p className="text-gray-600">Connect your GitHub repositories to showcase your technical expertise and code quality</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Opportunities</h3>
              <p className="text-gray-600">Discover and invest in innovative projects from talented developers worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to protect your innovations?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Seedora to protect their intellectual property and connect with investors.
          </p>
          
          <button
            onClick={onGetStarted}
            className="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl mx-auto"
          >
            <span>Start Building Today</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Seedora</span>
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              The ultimate platform for developers and investors to protect IP and discover innovations.
            </p>
            <p className="text-gray-500 text-sm">
              &copy; 2024 Seedora. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;