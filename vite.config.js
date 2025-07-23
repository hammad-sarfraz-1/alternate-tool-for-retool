import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'public/dashboard.html'),
        resource: resolve(__dirname, 'public/resource.html'),
        settings: resolve(__dirname, 'public/settings.html'),
      },
    },
  },
}); 