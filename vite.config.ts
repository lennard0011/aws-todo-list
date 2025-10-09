import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
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
