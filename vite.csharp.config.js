import { defineConfig } from 'vite';
import wasmSharpPlugin from '@wasmsharp/vite-plugin';
export default defineConfig({
 base:'./',
 plugins:wasmSharpPlugin(),
 build:{
  target:'esnext',
  outDir:'assets',
  emptyOutDir:false,
  assetsDir:'csharp-runtime',
  rollupOptions:{
   input:'src/csharp-playground.js',
   output:{
    entryFileNames:'csharp-playground.js',
    chunkFileNames:'csharp-runtime/chunks/[name]-[hash].js',
    assetFileNames:'csharp-runtime/[name]-[hash][extname]'
   }
  }
 }
});