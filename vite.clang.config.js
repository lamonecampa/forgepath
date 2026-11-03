import { defineConfig } from 'vite';
export default defineConfig({
 base:'./',
 build:{
  target:'es2022',
  outDir:'assets',
  emptyOutDir:false,
  rollupOptions:{
   input:'src/clang-worker.js',
   output:{entryFileNames:'clang-worker.js',format:'es'}
  }
 }
});