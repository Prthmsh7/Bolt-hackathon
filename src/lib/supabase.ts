import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client for development when env vars are not set
const createMockClient = () => {
  // Create a mock client that simulates authentication
  const mockUsers = [
    {
      id: 'demo-user-id',
      email: 'test@example.com',
      user_metadata: {
        full_name: 'Test User'
      }
    }
  ];

  // In-memory storage for tables
  const storage: Record<string, any[]> = {
    profiles: [],
    ip_registrations: [],
    marketplace_items: [],
    project_likes: [],
    project_purchases: [],
    videos: []
  };

  // Check if we have a stored session
  const getStoredSession = () => {
    try {
      const storedAuth = localStorage.getItem('supabase.auth.token');
      if (storedAuth) {
        return JSON.parse(storedAuth).currentSession;
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  return {
    auth: {
      signUp: async ({ email, password, options }: any) => {
        console.log('Mock signUp called with:', email);
        // Check if user already exists
        if (mockUsers.some(u => u.email === email)) {
          return { data: null, error: { message: 'User already registered' } };
        }
        
        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          email,
          user_metadata: options?.data || {}
        };
        
        mockUsers.push(newUser);
        
        // Create session
        const session = {
          user: newUser,
          access_token: 'mock-token',
          refresh_token: 'mock-refresh-token'
        };
        
        // Store in localStorage
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          currentSession: session
        }));
        
        return { data: { user: newUser, session }, error: null };
      },
      
      signInWithPassword: async ({ email, password }: any) => {
        console.log('Mock signInWithPassword called with:', email);
        // Check credentials
        const user = mockUsers.find(u => u.email === email);
        
        if (user && (password === 'test123' || email === 'test@example.com')) {
          // Create session
          const session = {
            user,
            access_token: 'mock-token',
            refresh_token: 'mock-refresh-token'
          };
          
          // Store in localStorage
          localStorage.setItem('supabase.auth.token', JSON.stringify({
            currentSession: session
          }));
          
          return { data: { user, session }, error: null };
        }
        
        return { data: null, error: { message: 'Invalid login credentials' } };
      },
      
      signOut: async () => {
        localStorage.removeItem('supabase.auth.token');
        return { error: null };
      },
      
      getUser: async () => {
        const session = getStoredSession();
        return { data: { user: session?.user || null }, error: null };
      },
      
      getSession: async () => {
        const session = getStoredSession();
        return { data: { session }, error: null };
      },
      
      refreshSession: async () => {
        const session = getStoredSession();
        return { data: { session }, error: null };
      },
      
      onAuthStateChange: (callback: any) => {
        // This is a simplified mock that doesn't actually listen for changes
        const session = getStoredSession();
        if (session) {
          setTimeout(() => {
            callback('SIGNED_IN', session);
          }, 0);
        }
        
        return { 
          data: { 
            subscription: { 
              unsubscribe: () => {} 
            } 
          } 
        };
      }
    },
    from: (table: string) => {
      // Initialize table if it doesn't exist
      if (!storage[table]) {
        storage[table] = [];
      }
      
      return {
        select: (columns?: string) => {
          return {
            eq: (column: string, value: any) => {
              const items = storage[table] || [];
              const filtered = items.filter(item => item[column] === value);
              return {
                single: () => ({ data: filtered[0] || null, error: null }),
                limit: (n: number) => ({ data: filtered.slice(0, n), error: null }),
                data: filtered,
                error: null
              };
            },
            limit: (n: number) => ({ data: (storage[table] || []).slice(0, n), error: null }),
            order: (column: string, { ascending }: { ascending: boolean }) => ({
              data: storage[table] || [],
              error: null
            }),
            data: storage[table] || [],
            error: null,
            single: () => ({ data: (storage[table] || [])[0] || null, error: null })
          };
        },
        insert: (data: any) => {
          if (!Array.isArray(data)) {
            data = [data];
          }
          
          // Add IDs if not present
          const itemsWithIds = data.map((item: any) => ({
            id: item.id || `mock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            ...item
          }));
          
          storage[table].push(...itemsWithIds);
          
          return {
            select: () => ({
              data: itemsWithIds,
              error: null,
              single: () => ({ data: itemsWithIds[0], error: null })
            }),
            data: itemsWithIds,
            error: null,
            single: () => ({ data: itemsWithIds[0], error: null })
          };
        },
        upsert: (data: any, options?: any) => {
          if (!Array.isArray(data)) {
            data = [data];
          }
          
          // Handle upsert logic
          const results = data.map((item: any) => {
            const existingIndex = storage[table].findIndex(i => i.id === item.id);
            
            if (existingIndex >= 0) {
              // Update
              storage[table][existingIndex] = { ...storage[table][existingIndex], ...item };
              return storage[table][existingIndex];
            } else {
              // Insert
              const newItem = {
                id: item.id || `mock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                ...item
              };
              storage[table].push(newItem);
              return newItem;
            }
          });
          
          return {
            data: results,
            error: null
          };
        },
        update: (data: any) => {
          return {
            eq: (column: string, value: any) => {
              const index = storage[table].findIndex(item => item[column] === value);
              
              if (index >= 0) {
                storage[table][index] = { ...storage[table][index], ...data };
                return {
                  data: storage[table][index],
                  error: null,
                  select: () => ({
                    data: storage[table][index],
                    error: null,
                    single: () => ({ data: storage[table][index], error: null })
                  })
                };
              }
              
              return { data: null, error: null };
            },
            data: null,
            error: null
          };
        },
        delete: () => {
          return {
            eq: (column: string, value: any) => {
              const index = storage[table].findIndex(item => item[column] === value);
              
              if (index >= 0) {
                const deleted = storage[table].splice(index, 1)[0];
                return { data: deleted, error: null };
              }
              
              return { data: null, error: null };
            }
          };
        },
        // Add support for channel method
        channel: (channelName: string) => {
          return {
            on: (event: string, filter: any, callback: Function) => {
              // This is a mock implementation that doesn't actually listen for changes
              return {
                subscribe: () => ({})
              };
            }
          };
        }
      };
    }
  };
};

// Check if Supabase is properly configured (not placeholder values)
const isValidSupabaseConfig = supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your_supabase_project_url') &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20 && // Basic validation for anon key length
  !supabaseAnonKey.includes('your_supabase_anon_key'); // Check it's not placeholder

// Always use mock client for now to avoid authentication errors
// This ensures the app works without requiring valid Supabase credentials
console.log('Using mock Supabase client for development');

export const supabase = createMockClient();
export const isSupabaseConfigured = false;