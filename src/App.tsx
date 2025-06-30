import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/Auth';
import { supabase } from './lib/supabase';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
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

  // Show a simple message for now since we're focusing on the landing page
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Seedora</h1>
        <p className="text-xl">You are now logged in.</p>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="mt-8 px-6 py-3 bg-white text-black rounded-xl font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default App;