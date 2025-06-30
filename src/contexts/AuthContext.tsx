import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider initialized, isSupabaseConfigured:', isSupabaseConfigured);
    
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured properly. Auth functionality will be limited.');
      setLoading(false);
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial user session...');
        
        const { data: { user }, error } = await supabase.auth.getUser();
        
        // Only log actual errors, not the normal case where no user is signed in
        if (error && error.message !== 'Auth session missing!') {
          console.error('Error getting user:', error);
        }

        if (user) {
          console.log('Found existing user');
          setUser(user);
          // Since we don't have direct access to session, we'll create a basic session object
          setSession({
            user,
            access_token: '', // This will be handled by Supabase internally
            refresh_token: '',
            expires_in: -1,
            expires_at: -1,
            token_type: 'bearer'
          });
        } else {
          console.log('No existing user found');
          setUser(null);
          setSession(null);
        }
        
      } catch (error) {
        console.error('Unexpected error getting initial session:', error);
        setUser(null);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    try {
      console.log('Setting up auth state change listener...');
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          console.log('Auth state changed:', _event, session ? 'Session exists' : 'No session');
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => {
        console.log('Cleaning up auth subscription');
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setLoading(false);
      return () => {}; // Return empty cleanup function
    }
  }, []);

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured, sign out operation simulated');
      setUser(null);
      setSession(null);
      return;
    }
    
    try {
      console.log('Signing out user...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        console.log('User signed out successfully');
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Unexpected error signing out:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;