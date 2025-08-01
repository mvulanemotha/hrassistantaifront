import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/hrassistantai/', // 👈 this is the critical part
  plugins: [react()],
})
