import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err, req) => {
            console.log('[proxy error]', req.method, req.url, '→', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('[proxy →]', req.method, req.url, '→', proxyReq.getHeader('host') + proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[proxy ←]', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
})
