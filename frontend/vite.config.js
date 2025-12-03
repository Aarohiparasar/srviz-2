import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    // Ensure Fast Refresh is properly configured
    fastRefresh: true,
    // Add babel plugin for React Refresh
    babel: {
      plugins: ['react-refresh/babel'],
    },
  })],
  server: {
    // Ensure HMR works correctly
    hmr: {
      overlay: false
    }
  }
})