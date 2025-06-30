import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import githubRoutes from './src/api/github.js';

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: [
    'https://chromion-seedster.vercel.app',
    'http://localhost:5173', // Keep local development
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/github', githubRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export the Express app for Vercel
export default app; 