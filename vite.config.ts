import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react()
  ],
  root: 'src/webapp/client/web-interface',
  build: {
    outDir: '../../../../build-web-interface',
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css'
          }
          return '[name][extname]'
        },
        chunkFileNames: 'chunk.js',
        manualChunks: undefined
      }
    }
  }
})
