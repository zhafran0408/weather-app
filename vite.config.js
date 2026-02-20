import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Tambahkan ini
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // Tambahkan ini di paling atas list plugin
    tailwindcss(),
  ],
})
