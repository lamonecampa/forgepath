import { defineConfig } from 'vite';
import ignoreDynamicImports from 'vite-plugin-ignore-dynamic-imports';
export default defineConfig({
 base:'./',
 plugins:[ignoreDynamicImports({include:['**/dotnet.runtime.js','**/dotnet.js']})],
 assetsInclude:['**/*.dll','**/*.wasm','**/*.dat'],
 optimizeDeps:{
  exclude:['@wasmsharp/core'],
  esbuildOptions:{loader:{'.dll':'file','.wasm':'file','.dat':'file'}}
 },
 worker:{format:'es'},
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