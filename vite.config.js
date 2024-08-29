import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),eslint()],
  resolve: {
    alias: {
      '@': '/src',//this is for tabnine to access entire code base
      'worldwise': '/worldwise/src',//this is for tabnine to access entire worldwise project
    },
  },
})

