import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/Payments': {
        target: 'https://glorious-capybara-97v96x9rgvv29xrr-5084.app.github.dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
