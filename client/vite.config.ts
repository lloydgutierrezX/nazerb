import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// import dotenv from 'dotenv';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  define: {
    'process.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL || 'http://localhost'),
    'process.env.VITE_PROJECT_TITLE': JSON.stringify(process.env.VITE_PROJECT_TITLE || 'NAZERB - ESS'),
    'process.env.VITE_REQUEST_TIMEOUT': JSON.stringify(process.env.VITE_REQUEST_TIMEOUT || 2000),
  },
})
