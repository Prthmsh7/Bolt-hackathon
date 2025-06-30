import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { 
  ArrowRight, 
  Rocket,
  Play,
  CheckCircle,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import Gl from '../gl/index';
import Type from '../gl/Type';
import shaders from '../gl/shaders';
import fontFileUrl from '../assets/fonts/Orbitron-Black.fnt?url';
import fontAtlasUrl from '../assets/fonts/Orbitron-Black.png?url';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create the kinetic type
    const options = {
      word: 'SEEDORA',
      color: '#ffffff',
      fill: '#000000',
      geometry: new THREE.TorusKnotGeometry(9, 3, 768, 3, 4, 3),
      position: {
        texture: [-0.965, -0.4, 0],
        mesh: [0, 0, 0]
      },
      scale: [0.008, 0.04, 1],
      shaders: {
        vertex: shaders.vertex,
        fragment: shaders.fragment
      },
      font: {
        file: fontFileUrl,
        atlas: fontAtlasUrl
      }
    };

    const type = new Type();
    type.init(options);
    
    setIsLoaded(true);

    // Cleanup function
    return () => {
      // Remove all objects from the scene
      while(Gl.scene.children.length > 0) { 
        Gl.scene.remove(Gl.scene.children[0]); 
      }
    };
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                    {[
                      { number: '500+', label: 'Registered Projects' },
                      { number: '$2.4M', label: 'Total Investment' },
                      { number: '1,200+', label: 'Active Users' },
                      { number: '94%', label: 'Success Rate' }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 neo-card bg-white/5 backdrop-blur-sm">
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
        
        {/* WebGL container for the 3D effect */}
        <div className="absolute inset-0 z-0">
          <div id="webgl" className="w-full h-full"></div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;