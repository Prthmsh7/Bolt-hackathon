import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import InvestmentStream from './components/InvestmentStream';
import UserProfile from './components/UserProfile';
import EnhancedAnalytics from './components/EnhancedAnalytics';
import AuthModal from './components/Auth';
import MCPAssistant from './components/MCPAssistant';
import { supabase } from './lib/supabase';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'about'>('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMCPAssistant, setShowMCPAssistant] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
    checkAuthStatus();
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleNavigation = (page: 'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'about') => {
    setCurrentPage(page);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    checkAuthStatus();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'marketplace':
        return <Marketplace onBack={() => setCurrentPage('dashboard')} />;
      case 'investment-stream':
        return <InvestmentStream onBack={() => setCurrentPage('dashboard')} />;
      case 'user-profile':
        return <UserProfile onBack={() => setCurrentPage('dashboard')} />;
      case 'analytics':
        return <EnhancedAnalytics onBack={() => setCurrentPage('dashboard')} />;
      case 'about':
        return (
          <div className="min-h-screen bg-light-bg text-text-primary fade-in flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">About start.dev</h1>
              <p className="text-text-secondary">Learn more about our investment platform</p>
            </div>
          </div>
        );
      case 'dashboard':
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className={`min-h-screen bg-light-bg text-text-primary transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      <Navbar 
        onNavigate={handleNavigation} 
        currentPage={currentPage}
        user={user}
        onShowAuth={() => setShowAuthModal(true)}
        onShowMCPAssistant={() => setShowMCPAssistant(true)}
      />
      {renderCurrentPage()}
      
      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* MCP Assistant */}
      <MCPAssistant
        isOpen={showMCPAssistant}
        onClose={() => setShowMCPAssistant(false)}
      />
    </div>
  );
}

export default App;