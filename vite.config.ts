import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
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
