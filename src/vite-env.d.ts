/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_GITHUB_CLIENT_ID: string;
  readonly VITE_PINATA_API_KEY: string;
  readonly VITE_PINATA_API_SECRET: string;
  readonly VITE_FILCDN_API_KEY: string;
  readonly VITE_FILCDN_BASE_URL: string;
  readonly VITE_FILCDN_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}