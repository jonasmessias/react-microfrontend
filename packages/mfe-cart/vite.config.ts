import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfeCart',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/Cart.tsx',
        './cartStore': './src/store/cartStore.ts',
      },
      shared: ['react', 'react-dom', 'zustand'],
    }),
  ],
  server: {
    port: 3002,
    cors: true,
    strictPort: true,
  },
  preview: {
    port: 3002,
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
