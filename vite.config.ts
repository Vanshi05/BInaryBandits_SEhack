import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listen on all network interfaces
    port: 8080,
    strictPort: true, // Don't try other ports if 8080 is taken
    open: true, // Automatically open browser
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add any other aliases you need here
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: mode === "development", // Only generate sourcemaps in dev
    minify: mode === "production" ? "esbuild" : false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          react: ["react", "react-dom"],
          firebase: ["firebase/app", "firebase/firestore"],
          ui: ["@radix-ui/react-*"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Pre-bundle these dependencies
    exclude: ["js-big-decimal"], // Exclude problematic packages
  },
  css: {
    devSourcemap: true, // Enable CSS sourcemaps in development
  },
}));