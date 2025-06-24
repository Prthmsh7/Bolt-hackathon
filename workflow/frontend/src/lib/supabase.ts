import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Provide default values to prevent URL constructor errors during development
const defaultUrl = 'https://placeholder.supabase.co';
const defaultKey = 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase_project_url_here') || supabaseAnonKey.includes('your_supabase_anon_key_here')) {
  console.warn('⚠️ Supabase environment variables are not properly configured. Please update your .env file with actual Supabase credentials.');
}

// Use actual values if available and valid, otherwise use safe defaults
const finalUrl = (supabaseUrl && !supabaseUrl.includes('your_supabase_project_url_here')) ? supabaseUrl : defaultUrl;
const finalKey = (supabaseAnonKey && !supabaseAnonKey.includes('your_supabase_anon_key_here')) ? supabaseAnonKey : defaultKey;

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
});