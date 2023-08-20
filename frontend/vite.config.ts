import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@containers': path.resolve(__dirname, './src/containers'),
      '@context': path.resolve(__dirname, './src/context'),
      '@models': path.resolve(__dirname, './src/models'),
      '@utilities': path.resolve(__dirname, './src/utilities'),
    }
  },
  plugins: [react()],
  server: {
    port: 3000
  }
})
