import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Optional: Keep the same port as CRA
    open: true // Optional: Automatically open the app in the browser
  }
})