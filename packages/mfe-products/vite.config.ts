import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfeProducts',
      filename: 'remoteEntry.js',
      exposes: {
        './Products': './src/Products.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3001,
    cors: true,
    strictPort: true,
  },
  preview: {
    port: 3001,
    cors: true,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
