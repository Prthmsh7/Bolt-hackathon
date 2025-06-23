import { useState, FormEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { signIn, signUp, error: authError } = useAuth();
  const toast = useToast();

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
        toast({
          title: 'Account created successfully',
          description: 'Please check your email for verification',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setFormError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <VStack spacing={6}>
        <Heading size="lg">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </Heading>
        
        <Text fontSize="md" color="gray.600">
          {isSignUp
            ? 'Sign up to start submitting your pitches'
            : 'Sign in to continue to the platform'}
        </Text>

        {(formError || authError) && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {formError || authError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4} width="100%">
            <FormControl isRequired isInvalid={!!formError && !email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormError('');
                }}
                placeholder="Enter your email"
              />
              <FormErrorMessage>Email is required</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formError && !password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormError('');
                  }}
                  placeholder="Enter your password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {isSignUp && password.length < 6
                  ? 'Password must be at least 6 characters'
                  : 'Password is required'}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              size="lg"
              mt={4}
              isLoading={isLoading}
              loadingText={isSignUp ? 'Creating Account' : 'Signing In'}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </VStack>
        </form>

        <Button
          variant="link"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setFormError('');
          }}
          color="blue.500"
        >
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </Button>
      </VStack>
    </Box>
  );
} 