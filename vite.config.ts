import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const src = path.resolve(import.meta.dirname, 'src');

export default defineConfig({
  root: 'src',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@src': src
    }
  },
  css: {
    preprocessorOptions: {
      styl: {
        paths: [src, 'node_modules']
      }
    }
  }
});
