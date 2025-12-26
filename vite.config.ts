import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'health-check',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/health') {
            res.setHeader('Content-Type', 'application/text');
            res.setHeader('Cache-Control', 'no-cache');
            res.statusCode = 200;
            res.end("ok");
          } else {
            next();
          }
        });
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});