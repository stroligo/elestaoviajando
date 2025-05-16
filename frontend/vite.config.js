import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Alternativa ao __dirname
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Configurando o alias
    },
  },
});
