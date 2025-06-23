const express = require('express');
const router = express.Router();
const multer = require('multer');
const authService = require('./auth.service');

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Step 1: Initialize startup registration
router.post('/register/init', upload.single('pitchFile'), async (req, res) => {
  try {
    const { name, description, walletAddress } = req.body;
    const pitchFile = req.file;

    if (!pitchFile) {
      return res.status(400).json({
        success: false,
        error: 'Pitch file is required'
      });
    }

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'Wallet address is required'
      });
    }

    const startupData = {
      name,
      description,
      created_at: new Date().toISOString(),
    };

    const result = await authService.registerStartup(startupData, pitchFile.buffer, walletAddress);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in startup registration initialization:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Step 2: Finalize registration after wallet signing
router.post('/register/finalize', async (req, res) => {
  try {
    const { userId, pitchId, ipfsUrl, signedTxn } = req.body;

    if (!signedTxn) {
      return res.status(400).json({
        success: false,
        error: 'Signed transaction is required'
      });
    }

    const result = await authService.finalizeRegistration(userId, pitchId, ipfsUrl, signedTxn);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in startup registration finalization:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get startup details
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await authService.supabase
      .from('startups')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Startup not found'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching startup:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router; 