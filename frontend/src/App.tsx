import { WalletConnect } from './components/WalletConnect';
import { PitchForm } from './components/PitchForm';
import { useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { useAuth } from './contexts/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, InputBase, Stack, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VideoStreamingPlatform from './components/VideoStreamingPlatform';
import { keyframes } from '@mui/system';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showVideoStreaming, setShowVideoStreaming] = useState(false);
  const { user, loading, signOut } = useAuth();

  const handleWalletConnection = (connected: boolean, address: string = '') => {
    setWalletConnected(connected);
    setWalletAddress(address);
  };

  const handleInvestStreamClick = () => {
    setShowVideoStreaming(true);
  };

  const handleCloseVideoStreaming = () => {
    setShowVideoStreaming(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Auth />;
  }

  // Show video streaming platform if active
  if (showVideoStreaming) {
    return <VideoStreamingPlatform onClose={handleCloseVideoStreaming} />;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#f8fafc',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* NavBar */}
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          flex: '0 0 auto',
          backdropFilter: 'blur(12px)',
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 8px 32px 0 rgba(60,72,88,0.10)',
          borderBottom: '1px solid #e0e7ef',
          borderRadius: 0,
          zIndex: 1201,
          transition: 'background 0.3s',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', minHeight: 72 }}>
          {/* Left: Logo & Home */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={700}
              sx={{ letterSpacing: -1, userSelect: 'none', fontSize: { xs: '1.1rem', sm: '1.5rem' }, transition: 'color 0.2s' }}
            >
              Z Combinator
            </Typography>
            <IconButton
              color="primary"
              size="large"
              sx={{
                borderRadius: 2,
                transition: 'background 0.2s, transform 0.15s',
                '&:hover': {
                  background: 'rgba(99,102,241,0.08)',
                  transform: 'scale(1.08)',
                },
                '&:active': {
                  background: 'rgba(99,102,241,0.16)',
                  transform: 'scale(0.97)',
                },
              }}
            >
              <HomeIcon />
            </IconButton>
          </Stack>
          {/* Center: Search Bar */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mx: 2 }}>
            <Box
              sx={{
                position: 'relative',
                width: { xs: '100%', sm: 300 },
                bgcolor: '#f1f3f6',
                borderRadius: 2,
                pl: 2,
                pr: 1,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 8px 0 rgba(60,72,88,0.06)',
                transition: 'box-shadow 0.2s, background 0.2s',
                '&:focus-within': {
                  boxShadow: '0 4px 16px 0 rgba(99,102,241,0.12)',
                  bgcolor: '#e0e7ef',
                },
              }}
            >
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ width: '100%', fontSize: '1rem', transition: 'color 0.2s' }}
              />
              <IconButton
                type="submit"
                sx={{
                  p: '6px',
                  color: 'primary.main',
                  transition: 'background 0.2s, transform 0.15s',
                  '&:hover': {
                    background: 'rgba(99,102,241,0.08)',
                    transform: 'scale(1.1)',
                  },
                  '&:active': {
                    background: 'rgba(99,102,241,0.16)',
                    transform: 'scale(0.97)',
                  },
                }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
          {/* Right: Nav Links & Profile */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              startIcon={<DashboardIcon />}
              color="primary"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 2,
                px: 2,
                transition: 'background 0.2s, color 0.2s, transform 0.15s',
                '&:hover': {
                  background: 'rgba(99,102,241,0.08)',
                  color: 'primary.dark',
                  transform: 'translateY(-2px) scale(1.05)',
                },
                '&:active': {
                  background: 'rgba(99,102,241,0.16)',
                  color: 'primary.main',
                  transform: 'scale(0.97)',
                },
              }}
            >
              Dashboard
            </Button>
            <Button
              startIcon={<EmojiEventsIcon />}
              color="primary"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 2,
                px: 2,
                transition: 'background 0.2s, color 0.2s, transform 0.15s',
                '&:hover': {
                  background: 'rgba(99,102,241,0.08)',
                  color: 'primary.dark',
                  transform: 'translateY(-2px) scale(1.05)',
                },
                '&:active': {
                  background: 'rgba(99,102,241,0.16)',
                  color: 'primary.main',
                  transform: 'scale(0.97)',
                },
              }}
            >
              Leaderboard
            </Button>
            <Button
              startIcon={<StorefrontIcon />}
              color="primary"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 2,
                px: 2,
                transition: 'background 0.2s, color 0.2s, transform 0.15s',
                '&:hover': {
                  background: 'rgba(99,102,241,0.08)',
                  color: 'primary.dark',
                  transform: 'translateY(-2px) scale(1.05)',
                },
                '&:active': {
                  background: 'rgba(99,102,241,0.16)',
                  color: 'primary.main',
                  transform: 'scale(0.97)',
                },
              }}
            >
              Market
            </Button>
            <Button
              startIcon={<TrendingUpIcon />}
              color="primary"
              onClick={handleInvestStreamClick}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 2,
                px: 2,
                transition: 'background 0.2s, color 0.2s, transform 0.15s',
                '&:hover': {
                  background: 'rgba(99,102,241,0.08)',
                  color: 'primary.dark',
                  transform: 'translateY(-2px) scale(1.05)',
                },
                '&:active': {
                  background: 'rgba(99,102,241,0.16)',
                  color: 'primary.main',
                  transform: 'scale(0.97)',
                },
              }}
            >
              Invest Stream
            </Button>
            <Button
              startIcon={<InfoOutlinedIcon />}
              color="primary"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 2,
                px: 2,
                transition: 'background 0.2s, color 0.2s, transform 0.15s',
                '&:hover': {
                  background: 'rgba(99,102,241,0.08)',
                  color: 'primary.dark',
                  transform: 'translateY(-2px) scale(1.05)',
                },
                '&:active': {
                  background: 'rgba(99,102,241,0.16)',
                  color: 'primary.main',
                  transform: 'scale(0.97)',
                },
              }}
            >
              About
            </Button>
            <IconButton
              color="primary"
              sx={{
                ml: 1,
                borderRadius: 2,
                transition: 'background 0.2s, transform 0.18s, opacity 0.18s',
                opacity: 0.92,
                '&:hover': {
                  background: 'rgba(99,102,241,0.10)',
                  transform: 'scale(1.13) rotate(-6deg)',
                  opacity: 1,
                },
                '&:active': {
                  background: 'rgba(99,102,241,0.18)',
                  transform: 'scale(0.97)',
                  opacity: 0.85,
                },
              }}
            >
              <AccountCircleIcon />
            </IconButton>
            <Button
              color="primary"
              variant="outlined"
              onClick={signOut}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                ml: 1,
                borderRadius: 2,
                px: 2,
                boxShadow: '0 1px 4px 0 rgba(99,102,241,0.06)',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                '&:hover': {
                  background: 'rgba(99,102,241,0.08)',
                  color: 'primary.dark',
                  boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
                },
                '&:active': {
                  background: 'rgba(99,102,241,0.16)',
                  color: 'primary.main',
                  boxShadow: '0 1px 4px 0 rgba(99,102,241,0.06)',
                },
              }}
            >
              Sign Out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 600, px: 2 }}>
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1F2937', marginBottom: '16px' }}>
              Bolt Startup Pitch Portal
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#4B5563', marginBottom: '24px' }}>
              Connect your wallet and submit your startup pitch to be stored on IPFS and minted as an NFT
            </p>
            <div style={{ marginBottom: walletConnected ? '40px' : '0' }}>
              <WalletConnect onWalletConnection={handleWalletConnection} />
            </div>
          </header>
          {walletConnected && (
            <main>
              <PitchForm walletAddress={walletAddress} />
            </main>
          )}
        </Box>
      </Box>
    </Box>
  );
}