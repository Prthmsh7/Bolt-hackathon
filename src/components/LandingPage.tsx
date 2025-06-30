import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Rocket,
  Play,
  CheckCircle,
  Github
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
    <div className={`min-h-screen bg-black text-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="space-y-6 mb-10">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="text-white">
                  Seedora
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                The ultimate platform for developers and investors. Register your IP, showcase your projects, and discover the next big innovation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-lg"
              >
                <Rocket size={24} />
                <span>Get Started Free</span>
                <ArrowRight size={20} />
              </button>
              
              <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border border-white text-white font-semibold text-lg rounded-lg">
                <Play size={20} />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-400 justify-center mt-8">
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
              Everything you need to protect your intellectual property and connect with investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Github size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">GitHub Integration</h3>
              <p className="text-gray-600">Connect your GitHub repositories to showcase your technical expertise and code quality</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Rocket size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">IP Protection</h3>
              <p className="text-gray-600">Register your projects as intellectual property on the blockchain for permanent protection</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <ArrowRight size={24} className="text-orange-600" />
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
            className="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg mx-auto"
          >
            <Rocket size={24} />
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