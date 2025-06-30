import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthModal from './components/Auth';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import InvestmentStream from './components/InvestmentStream';
import UserProfile from './components/UserProfile';
import EnhancedAnalytics from './components/EnhancedAnalytics';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import MCPAssistantButton from './components/MCPAssistantButton';
import GitHubCallback from './components/GitHubCallback';
import { supabase } from './lib/supabase';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'about'>('dashboard');

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

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowLanding(false);
    checkAuthStatus();
  };

  const handleNavigate = (page: 'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'about') => {
    setCurrentPage(page);
  };

  const handleShowAuth = () => {
    setShowAuthModal(true);
  };

  // Show landing page if user is not authenticated
  if (showLanding && !user) {
    return (
      <Router>
        <Routes>
          <Route path="/auth/github/callback" element={<GitHubCallback />} />
          <Route path="*" element={
            <div className={`transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
              <LandingPage onGetStarted={handleGetStarted} />
              
              {/* Authentication Modal */}
              <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onAuthSuccess={handleAuthSuccess}
              />
            </div>
          } />
        </Routes>
      </Router>
    );
  }

  // Show main application
  return (
    <Router>
      <div className={`min-h-screen bg-light-bg transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
        <Routes>
          <Route path="/auth/github/callback" element={<GitHubCallback />} />
          <Route path="*" element={
            <>
              {/* Navigation */}
              <Navbar 
                onNavigate={handleNavigate}
                currentPage={currentPage}
                user={user}
                onShowAuth={handleShowAuth}
              />

              {/* Main Content */}
              <main>
                {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
                {currentPage === 'marketplace' && <Marketplace onBack={() => handleNavigate('dashboard')} />}
                {currentPage === 'investment-stream' && <InvestmentStream onBack={() => handleNavigate('dashboard')} />}
                {currentPage === 'user-profile' && <UserProfile onBack={() => handleNavigate('dashboard')} />}
                {currentPage === 'analytics' && <EnhancedAnalytics onBack={() => handleNavigate('dashboard')} />}
                {currentPage === 'about' && <AboutPage onBack={() => handleNavigate('dashboard')} />}
              </main>

              {/* Authentication Modal */}
              <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onAuthSuccess={handleAuthSuccess}
              />

              {/* Floating Action Buttons */}
              <MCPAssistantButton />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;