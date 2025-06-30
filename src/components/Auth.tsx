import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Info, Settings, HelpCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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
  const [success, setSuccess] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [showTestCredentials, setShowTestCredentials] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setSuccess('');
    setShowPassword(false);
    setShowHelp(false);
    setShowTestCredentials(false);
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!password) {
      setError('Please enter your password');
      return false;
    }

    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (!isLogin && !fullName.trim()) {
      setError('Please enter your full name');
      return false;
    }

    return true;
  };

  const useTestCredentials = () => {
    setEmail('test@example.com');
    setPassword('test123');
    if (!isLogin) {
      setFullName('Test User');
    }
    setShowTestCredentials(false);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if Supabase is configured
    if (!isSupabaseConfigured) {
      setError('Authentication service is not configured. Please check your environment variables and ensure Supabase is properly set up.');
      setShowHelp(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Sign in
        console.log('Attempting sign in for:', email);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password: password
        });

        if (error) {
          console.error('Sign in error:', error);
          
          // Provide specific, helpful error messages
          if (error.message.includes('Invalid login credentials') || 
              error.message.includes('invalid_credentials') ||
              error.message.includes('Invalid email or password')) {
            
            setError('No account found with these credentials. Please check your email and password, or create a new account if you haven\'t signed up yet.');
            setShowHelp(true);
            setShowTestCredentials(true);
            
          } else if (error.message.includes('Email not confirmed')) {
            setError('Please check your email and click the confirmation link before signing in.');
            
          } else if (error.message.includes('Too many requests')) {
            setError('Too many login attempts. Please wait a few minutes before trying again.');
            
          } else if (error.message.includes('signup_disabled')) {
            setError('Account creation is currently disabled. Please contact support.');
            
          } else {
            setError(`Sign in failed: ${error.message}`);
            setShowHelp(true);
          }
          return;
        }

        if (data.user) {
          console.log('Sign in successful:', data.user.email);
          setSuccess('Successfully signed in! Welcome back.');
          
          // Small delay to show success message
          setTimeout(() => {
            if (onAuthSuccess) {
              onAuthSuccess();
            }
            handleClose();
          }, 1500);
        }
        
      } else {
        // Sign up
        console.log('Attempting sign up for:', email);
        
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim()
            }
          }
        });

        if (error) {
          console.error('Sign up error:', error);
          
          // Provide specific, helpful error messages for signup
          if (error.message.includes('User already registered')) {
            setError('An account with this email already exists. Please sign in instead.');
            setTimeout(() => {
              setIsLogin(true);
              setPassword('');
              setError('');
            }, 2000);
            
          } else if (error.message.includes('Password should be at least')) {
            setError('Password must be at least 6 characters long.');
            
          } else if (error.message.includes('Invalid email')) {
            setError('Please enter a valid email address.');
            
          } else if (error.message.includes('Signup is disabled') || 
                     error.message.includes('signup_disabled')) {
            setError('Account creation is currently disabled. Please contact support.');
            
          } else if (error.message.includes('weak_password')) {
            setError('Password is too weak. Please use a stronger password with at least 6 characters.');
            
          } else {
            setError(`Sign up failed: ${error.message}`);
          }
          return;
        }

        if (data.user) {
          console.log('Sign up successful:', data.user.email);
          
          // Check if email confirmation is required
          if (!data.session && data.user && !data.user.email_confirmed_at) {
            setSuccess('Account created successfully! Please check your email and click the confirmation link to complete your registration.');
            
            // Switch to login mode after successful signup
            setTimeout(() => {
              setIsLogin(true);
              setPassword('');
              setError('');
              setSuccess('Please check your email for the confirmation link, then sign in.');
            }, 4000);
            
          } else {
            // User is immediately signed in (email confirmation disabled)
            setSuccess('Account created and signed in successfully! Welcome to Seedora!');
            
            // Create user profile
            try {
              const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                  id: data.user.id,
                  email: email.trim().toLowerCase(),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }, {
                  onConflict: 'id'
                });

              if (profileError) {
                console.warn('Profile creation warning:', profileError);
              }
            } catch (profileError) {
              console.warn('Profile creation failed:', profileError);
            }

            setTimeout(() => {
              if (onAuthSuccess) {
                onAuthSuccess();
              }
              handleClose();
            }, 1500);
          }
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred. Please try again.');
      setShowHelp(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setShowHelp(false);
    setShowTestCredentials(false);
    setPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="neo-card bg-white w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-light-border">
          <h2 className="text-xl font-bold text-text-primary">
            {isLogin ? 'Welcome Back' : 'Create Account'}
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
          {/* Configuration Warning */}
          {!isSupabaseConfigured && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <Settings size={16} className="text-error mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-text-primary font-medium mb-1">
                    Authentication Not Configured
                  </p>
                  <p className="text-text-secondary">
                    Supabase environment variables are missing or invalid. Please configure your .env file with valid Supabase credentials.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <div className="flex items-start space-x-3">
              <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-text-primary font-medium mb-1">
                  {isLogin ? 'Signing In' : 'Creating Account'}
                </p>
                <p className="text-text-secondary">
                  {isLogin 
                    ? 'Enter your email and password to access your account.'
                    : 'Join Seedora to protect your IP and discover investment opportunities.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Test Credentials Helper */}
          {showTestCredentials && isLogin && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <HelpCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm flex-1">
                  <p className="text-blue-900 font-medium mb-2">
                    First time here? Try creating an account first!
                  </p>
                  <p className="text-blue-700 mb-3">
                    If you want to test with demo credentials, you can use:
                  </p>
                  <button
                    onClick={useTestCredentials}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Use Test Credentials
                  </button>
                  <p className="text-blue-600 text-xs mt-2">
                    Email: test@example.com | Password: test123
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-text-primary">
                  <User size={16} />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300"
                  required={!isLogin}
                  disabled={isLoading || !isSupabaseConfigured}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-text-primary">
                <Mail size={16} />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300"
                required
                disabled={isLoading || !isSupabaseConfigured}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-text-primary">
                <Lock size={16} />
                <span>Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? "Enter your password" : "Create a password (min. 6 characters)"}
                  className="w-full px-4 py-3 pr-12 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300"
                  required
                  minLength={6}
                  disabled={isLoading || !isSupabaseConfigured}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  disabled={isLoading || !isSupabaseConfigured}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-text-muted mt-1">
                  Use at least 6 characters with a mix of letters and numbers
                </p>
              )}
            </div>

            {/* Success Message */}
            {success && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-xl flex items-start space-x-3">
                <CheckCircle size={16} className="text-success mt-0.5 flex-shrink-0" />
                <p className="text-text-primary text-sm">{success}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xl flex items-start space-x-3">
                <AlertCircle size={16} className="text-error mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-text-primary text-sm font-medium">{error}</p>
                  {showHelp && isLogin && (
                    <div className="mt-3 p-3 bg-white/50 rounded-lg">
                      <p className="text-xs text-text-secondary font-medium mb-2">Quick Solutions:</p>
                      <div className="text-xs text-text-secondary space-y-1">
                        <p>• <strong>New user?</strong> Click "Create one here" below to sign up first</p>
                        <p>• <strong>Check spelling:</strong> Verify your email and password for typos</p>
                        <p>• <strong>Try test account:</strong> Use the "Use Test Credentials" button above</p>
                        <p>• <strong>Database empty?</strong> Create a new account to get started</p>
                      </div>
                    </div>
                  )}
                  {showHelp && !isLogin && (
                    <div className="mt-3 p-3 bg-white/50 rounded-lg">
                      <p className="text-xs text-text-secondary font-medium mb-2">Signup Tips:</p>
                      <div className="text-xs text-text-secondary space-y-1">
                        <p>• <strong>Email exists?</strong> Try signing in instead</p>
                        <p>• <strong>Password strength:</strong> Use at least 6 characters</p>
                        <p>• <strong>Email verification:</strong> Check your inbox after signup</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isSupabaseConfigured}
              className="neo-btn w-full py-3 bg-primary text-white font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <span>
                  {!isSupabaseConfigured 
                    ? 'Configure Supabase First' 
                    : (isLogin ? 'Sign In' : 'Create Account')
                  }
                </span>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          {isSupabaseConfigured && (
            <div className="mt-6 text-center">
              <p className="text-text-secondary text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={handleToggleMode}
                  disabled={isLoading}
                  className="ml-2 text-primary hover:text-primary-dark font-medium transition-colors disabled:opacity-50"
                >
                  {isLogin ? 'Create one here' : 'Sign in instead'}
                </button>
              </p>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-6 p-4 bg-light-bg border border-light-border rounded-xl">
            <h4 className="font-medium text-text-primary mb-2 text-sm">
              {!isSupabaseConfigured ? 'Setup Required' : 'Getting Started'}
            </h4>
            <div className="text-xs text-text-muted space-y-1">
              {!isSupabaseConfigured ? (
                <>
                  <p>• <strong>Missing .env file:</strong> Copy .env.example to .env</p>
                  <p>• <strong>Invalid URLs:</strong> Replace placeholder values with real Supabase credentials</p>
                  <p>• <strong>Project setup:</strong> Ensure your Supabase project has authentication enabled</p>
                </>
              ) : isLogin ? (
                <>
                  <p>• <strong>First time?</strong> Create an account first, then sign in</p>
                  <p>• <strong>Testing?</strong> Use the test credentials button when it appears</p>
                  <p>• <strong>Forgot password?</strong> Contact support for assistance</p>
                  <p>• <strong>Email issues?</strong> Check your inbox and spam folder</p>
                </>
              ) : (
                <>
                  <p>• <strong>Already registered?</strong> Click "Sign in instead"</p>
                  <p>• <strong>Email confirmation:</strong> You may need to verify your email</p>
                  <p>• <strong>Password requirements:</strong> Minimum 6 characters</p>
                  <p>• <strong>Getting started:</strong> Create your account to begin protecting your IP</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;