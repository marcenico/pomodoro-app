import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Build config for packaging the app as an unpacked Chrome extension.
// Output goes to /extension, ready for "Load unpacked" in chrome://extensions.
export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(__dirname, 'extension-src'),
  build: {
    outDir: 'extension',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@data': path.resolve(__dirname, './src/data'),
      '@contexts': path.resolve(__dirname, './src/contexts')
    }
  }
});
