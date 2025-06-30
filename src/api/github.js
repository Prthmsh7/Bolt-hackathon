import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/callback', async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (tokenResponse.data.error) {
      console.error('GitHub token exchange error:', tokenResponse.data);
      return res.status(400).json({ error: tokenResponse.data.error_description || 'Failed to exchange code for token' });
    }

    // Return the access token
    return res.json({
      access_token: tokenResponse.data.access_token,
      token_type: tokenResponse.data.token_type,
      scope: tokenResponse.data.scope
    });
  } catch (error) {
    console.error('Error exchanging GitHub code for token:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Failed to exchange code for token',
      details: error.response?.data || error.message
    });
  }
});

export default router; 