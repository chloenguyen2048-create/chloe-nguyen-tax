import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base must match the GitHub repo name for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/chloe-nguyen-tax/',
})
