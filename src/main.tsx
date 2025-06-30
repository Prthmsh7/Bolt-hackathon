import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AuthProvider from './contexts/AuthContext'

// Log environment variables (without exposing sensitive data)
console.log('Environment check:');
console.log('VITE_SUPABASE_URL defined:', !!import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY defined:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)