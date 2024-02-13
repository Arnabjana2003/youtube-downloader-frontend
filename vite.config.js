import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://youtube-downloader-pink.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // proxy:{
    //   "/api": "https://youtube-downloader-pink.vercel.app"
    //   "/api": "http://localhost:5000"
    // }
  },
  plugins: [react()],
})
