import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src/webapp/client/web-interface",
  build: {
    outDir: "../../../../build-web-interface",
    rollupOptions: {
      output: {
        entryFileNames: "bundle.js",
        assetFileNames: "style.css",
        chunkFileNames: "chunk.js",
        manualChunks: undefined,
      },
    },
  },
});
