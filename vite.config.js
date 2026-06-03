import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/employee-attendance-dashboard/', // REPLACE with your exact GitHub repository name
  plugins: [react(), tailwindcss()],
})
