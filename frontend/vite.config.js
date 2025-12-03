import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const isDevelopment = mode === 'development'
  
  return {
    plugins: [
      react({
        // Only include fast refresh in development
        fastRefresh: isDevelopment,
        // Only include babel plugin in development
        ...(isDevelopment && {
          babel: {
            plugins: ['react-refresh/babel'],
          },
        }),
      }),
    ],
    server: {
      hmr: {
        overlay: false
      }
    }
  }
})