import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // You can remove this line if not needed
      interval: 1000, // Set the polling interval (milliseconds) if using polling
      include: ['src/**'], // Specify the files to watch
    },
  },
})