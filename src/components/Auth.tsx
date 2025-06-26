import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setShowPassword(false);
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });

        if (error) {
          console.error('Sign in error:', error);
          
          // Provide more user-friendly error messages
          if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
            throw new Error('Invalid email or password. Please check your credentials and try again. If you haven\'t signed up yet, please create an account first.');
          } else if (error.message.includes('Email not confirmed')) {
            throw new Error('Please check your email and click the confirmation link before signing in.');
          } else if (error.message.includes('Too many requests')) {
            throw new Error('Too many login attempts. Please wait a few minutes before trying again.');
          } else {
            throw new Error(`Sign in failed: ${error.message}`);
          }
        }

        if (data.user) {
          console.log('Sign in successful:', data.user.email);
          if (onAuthSuccess) {
            onAuthSuccess();
          }
          handleClose();
        }
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim()
            }
          }
        });

        if (error) {
          console.error('Sign up error:', error);
          
          // Provide more user-friendly error messages for signup
          if (error.message.includes('User already registered')) {
            throw new Error('An account with this email already exists. Please sign in instead.');
          } else if (error.message.includes('Password should be at least')) {
            throw new Error('Password must be at least 6 characters long.');
          } else if (error.message.includes('Invalid email')) {
            throw new Error('Please enter a valid email address.');
          } else if (error.message.includes('Signup is disabled')) {
            throw new Error('Account creation is currently disabled. Please contact support.');
          } else {
            throw new Error(`Sign up failed: ${error.message}`);
          }
        }

        if (data.user) {
          console.log('Sign up successful:', data.user.email);
          
          // Wait a moment for the user to be fully created
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Try to create user profile - this might be handled by a database trigger
          try {
            const { error: profileError } = await supabase
              .from('user_profiles')
              .upsert({
                id: data.user.id,
                email: email.trim(),
                full_name: fullName.trim(),
                subscription_status: 'free'
              }, {
                onConflict: 'id'
              });

            if (profileError) {
              console.warn('Profile creation warning (might be handled by trigger):', profileError);
              // Don't throw here, as the user is still created successfully
              // The profile might be created by a database trigger
            }
          } catch (profileError) {
            console.warn('Profile creation failed, but user was created:', profileError);
            // Continue anyway - the profile might be created by a trigger
          }

          // Show success message for signup
          setError('');
          if (onAuthSuccess) {
            onAuthSuccess();
          }
          handleClose();
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md border border-light-border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-light-border">
          <h2 className="text-xl font-bold text-text-primary">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <button 
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-light-hover rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-text-primary">
                    <User size={16} />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300"
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-text-primary">
                <Mail size={16} />
                <span>Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-text-primary">
                <Lock size={16} />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-text-muted">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary hover:bg-primary-dark hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-2 text-primary hover:text-primary-dark font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Helper Text */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-xs">
              {isLogin ? (
                <>
                  <strong>First time here?</strong> Click "Sign Up" to create a new account.
                  <br />
                  <strong>Trouble signing in?</strong> Make sure you've created an account first and check your email/password.
                </>
              ) : (
                <>
                  <strong>Creating an account?</strong> After signing up, you can immediately sign in with your credentials.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;