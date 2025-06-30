import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const GitHubCallback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing GitHub authentication...');
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Get the code and state from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        
        // Validate state to prevent CSRF attacks
        const savedState = localStorage.getItem('github_oauth_state');
        
        if (!code) {
          setStatus('error');
          setMessage('No authorization code received from GitHub');
          return;
        }
        
        if (state !== savedState) {
          setStatus('error');
          setMessage('Invalid state parameter. Authentication failed.');
          return;
        }
        
        // In a real app, you would exchange the code for an access token via your backend
        // For demo purposes, we'll simulate this
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store the token (in a real app, this would come from your backend)
        const mockToken = `github_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem('github_temp_token', mockToken);
        
        // Clean up
        localStorage.removeItem('github_oauth_state');
        
        setStatus('success');
        setMessage('GitHub authentication successful! Redirecting...');
        
        // Close this window if it's a popup
        if (window.opener) {
          window.close();
        } else {
          // Otherwise redirect back to the main app
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error) {
        console.error('GitHub callback error:', error);
        setStatus('error');
        setMessage('Failed to complete GitHub authentication');
      }
    };
    
    processOAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-lg max-w-md w-full">
        <div className="text-center">
          {status === 'loading' && (
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 size={32} className="text-primary animate-spin" />
            </div>
          )}
          
          {status === 'success' && (
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-success" />
            </div>
          )}
          
          {status === 'error' && (
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-error" />
            </div>
          )}
          
          <h2 className={`text-2xl font-bold mb-4 ${
            status === 'loading' ? 'text-text-primary' :
            status === 'success' ? 'text-success' :
            'text-error'
          }`}>
            {status === 'loading' ? 'GitHub Authentication' :
             status === 'success' ? 'Authentication Successful' :
             'Authentication Failed'}
          </h2>
          
          <p className="text-text-secondary mb-6">{message}</p>
          
          {status === 'error' && (
            <button
              onClick={() => window.close() || navigate('/')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubCallback;