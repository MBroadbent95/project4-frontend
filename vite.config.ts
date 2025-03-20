import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'postgresql://recipedb_lrqc_user:jx4mYbhpVgNV7xnpMzJ4rCkBhhUghLVm@dpg-cvda56an91rc73deiseg-a.frankfurt-postgres.render.com/recipedb_lrqc',
        changeOrigin: true
      },
    }
  }
})
