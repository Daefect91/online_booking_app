import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  test: {
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        globals: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
        port: 5173,
        clientPort: 5173,
        host: 'localhost'
    }
  }
})
