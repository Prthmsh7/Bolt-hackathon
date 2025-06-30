import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user in localStorage
    const checkDemoUser = () => {
      try {
        const storedAuth = localStorage.getItem('supabase.auth.token');
        if (storedAuth) {
          const session = JSON.parse(storedAuth).currentSession;
          if (session && session.user) {
            return session.user;
          }
        }
        return null;
      } catch (e) {
        console.error('Error checking demo user:', e);
        return null;
      }
    };

    const getInitialSession = async () => {
      try {
        // First check for demo user
        const demoUser = checkDemoUser();
        if (demoUser) {
          setUser(demoUser);
          setLoading(false);
          return;
        }

        // If no demo user, check Supabase
        if (isSupabaseConfigured) {
          const { data: { user } } = await supabase.auth.getUser();
          setUser(user);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const signOut = async () => {
    try {
      // Check for demo user
      const isDemoUser = user?.id === 'demo-user-id';
      
      if (isDemoUser) {
        // Just remove from localStorage for demo users
        localStorage.removeItem('supabase.auth.token');
        setUser(null);
        return;
      }
      
      // Otherwise use Supabase
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};