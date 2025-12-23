import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import proxyOptions from './proxyOptions'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: proxyOptions,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/assets/fossible_provider/frontend/',
  build: {
    outDir: '../fossible_provider/public/frontend',
    emptyOutDir: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})
