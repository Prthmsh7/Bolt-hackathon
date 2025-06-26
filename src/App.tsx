import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import InvestmentStream from './components/InvestmentStream';
import UserProfile from './components/UserProfile';
import EnhancedAnalytics from './components/EnhancedAnalytics';
import AuthModal from './components/Auth';
import MCPAssistantButton from './components/MCPAssistantButton';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import { supabase } from './lib/supabase';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'about'>('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mcpInsights, setMcpInsights] = useState<any[]>([]);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
    checkAuthStatus();
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        setShowLanding(false); // Hide landing page when user is authenticated
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      setShowLanding(false); // Hide landing page if user is already authenticated
    }
  };

  const handleNavigation = (page: 'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'about') => {
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowLanding(false);
    checkAuthStatus();
  };

  const handleInsightGenerated = (insight: any) => {
    setMcpInsights(prev => [insight, ...prev]);
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
        return <AboutPage onBack={() => setCurrentPage('dashboard')} />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  // Show landing page if user is not authenticated
  if (showLanding && !user) {
    return (
      <div className={`transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
        <LandingPage onGetStarted={handleGetStarted} />
        
        {/* Authentication Modal */}
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  // Show main application if user is authenticated
  return (
    <div className={`min-h-screen bg-light-bg text-text-primary transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      <Navbar 
        onNavigate={handleNavigation} 
        currentPage={currentPage}
        user={user}
        onShowAuth={() => setShowAuthModal(true)}
      />
      {renderCurrentPage()}
      
      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* MCP Assistant Button (floating) */}
      <MCPAssistantButton onInsightGenerated={handleInsightGenerated} />
    </div>
  );
}

export default App;