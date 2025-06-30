import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using demo mode.');
}

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Provided' : 'Not provided');

// Validate the configuration
const isValidConfig = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://');

if (!isValidConfig) {
  throw new Error('Invalid Supabase configuration. Please check your environment variables.');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  db: { schema: 'public' }
});

// Export configuration status
export const isSupabaseConfigured = true;