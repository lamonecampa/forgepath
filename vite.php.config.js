import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  assetsInclude: [/\\.dat$/, /\\.so$/, /\\.la$/],
  optimizeDeps: {
    exclude: ['@php-wasm/web']
  },
  build: {
    target: 'es2022',
    outDir: 'assets/php-runtime',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/php-playground.js',
      output: {
        entryFileNames: 'php-runtime.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
