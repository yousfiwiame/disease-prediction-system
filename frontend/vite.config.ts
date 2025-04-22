import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: '../DataDrivenDecisionMakingProject/static', // Output directory for Flask
    emptyOutDir: true,
  },
  server: {
    proxy: {
        "/api": "http://127.0.0.1:5000", // Proxy API calls to Flask
    },
},

});
