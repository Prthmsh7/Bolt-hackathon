import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GitHubCallback() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        const error_description = urlParams.get('error_description');
        
        // Handle GitHub OAuth errors
        if (error) {
          console.error('GitHub OAuth error:', error, error_description);
          window.close();
          return;
        }

        // Verify state to prevent CSRF attacks
        const savedState = localStorage.getItem('github_oauth_state');
        if (!state || state !== savedState) {
          console.error('State mismatch in GitHub OAuth callback');
          window.close();
          return;
        }

        if (!code) {
          console.error('No code received from GitHub');
          window.close();
          return;
        }

        // Exchange code for access token
        const response = await fetch('http://localhost:3000/api/github/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to exchange code for token');
        }

        if (!data.access_token) {
          throw new Error('No access token received');
        }

        // Store the token temporarily
        localStorage.setItem('github_temp_token', data.access_token);
        
        // Clean up state
        localStorage.removeItem('github_oauth_state');
        
        // Close the popup window
        window.close();
      } catch (error) {
        console.error('Error in GitHub callback:', error);
        window.close();
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Completing GitHub Authentication</h2>
        <p className="text-gray-600">Please wait while we complete the authentication process...</p>
      </div>
    </div>
  );
}