import { useState, FormEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  LinearProgress,
  Link,
  Stack
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function getPasswordStrength(password: string) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export function Auth() {
  const [tabIndex, setTabIndex] = useState(0); // 0: Sign In, 1: Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { signIn, signUp, error: authError } = useAuth();

  const isSignUp = tabIndex === 1;
  const passwordStrength = getPasswordStrength(password);
  const passwordStrengthLabel = ['Weak', 'Fair', 'Good', 'Strong'];
  const passwordStrengthColor = ['error', 'warning', 'info', 'success'];

  const validateForm = () => {
    if (!email) {
      setFormError('Email is required');
      return false;
    }
    if (!password) {
      setFormError('Password is required');
      return false;
    }
    if (isSignUp && password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        alert('Account created successfully. Please check your email for verification.');
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      minWidth="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%)',
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          minHeight: 480,
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          boxShadow: '0 4px 32px 0 rgba(60,72,88,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ width: '100%', p: 0 }}>
          <Stack spacing={3} alignItems="center" mb={1}>
            <Typography variant="h5" fontWeight={700} color="text.primary" align="center" sx={{ letterSpacing: -0.5 }}>
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {isSignUp ? 'Get started by creating a free account' : 'Welcome back! Please sign in.'}
            </Typography>
          </Stack>
          <Tabs
            value={tabIndex}
            onChange={(_, idx) => setTabIndex(idx)}
            variant="fullWidth"
            sx={{ mb: 2, minHeight: 0, '& .MuiTabs-indicator': { height: 2, borderRadius: 2 } }}
          >
            <Tab label="Sign In" sx={{ textTransform: 'none', fontWeight: 500, minHeight: 0 }} />
            <Tab label="Sign Up" sx={{ textTransform: 'none', fontWeight: 500, minHeight: 0 }} />
          </Tabs>
          {(formError || authError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError || authError}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setFormError('');
                }}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                error={!!formError && !email}
                helperText={!!formError && !email ? 'Email is required' : ''}
                autoComplete="email"
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setFormError('');
                }}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        tabIndex={-1}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!formError && !password}
                helperText={!!formError && !password ? (isSignUp && password.length < 6 ? 'Password must be at least 6 characters' : 'Password is required') : ''}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              {isSignUp && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Password strength: <b style={{ color: passwordStrengthColor[passwordStrength - 1] ? undefined : '#d32f2f' }}>{passwordStrengthLabel[passwordStrength - 1] || 'Weak'}</b>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength * 25}
                    color={passwordStrengthColor[passwordStrength - 1] || 'error'}
                    sx={{ borderRadius: 1, height: 6, mt: 0.5 }}
                  />
                </Box>
              )}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Link href="#" variant="body2" color="primary">
                  Forgot password?
                </Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 1, fontWeight: 600, borderRadius: 2, boxShadow: 2 }}
                disabled={isLoading}
              >
                {isLoading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Sign Up' : 'Sign In')}
              </Button>
            </Stack>
          </form>
          <Typography variant="caption" color="text.secondary" align="center" display="block" mt={4}>
            &copy; {new Date().getFullYear()} Bolt Hackathon. All rights reserved.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
} 