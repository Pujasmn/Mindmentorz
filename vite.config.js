// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
  
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/images': {
        target: 'https://s3.envato.com',
        changeOrigin: true,
        secure: true, // Ensures that HTTPS is used
        rewrite: (path) => path.replace(/^\/images/, '')
      }
    }
  }
});
