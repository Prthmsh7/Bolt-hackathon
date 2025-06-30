import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Provided' : 'Not provided');

// Validate the configuration
const isValidConfig = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://');

console.log('Is valid Supabase config:', isValidConfig);

// Create the Supabase client with minimal configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'public' }
});

// Export configuration status - use the actual validation result
export const isSupabaseConfigured = isValidConfig;