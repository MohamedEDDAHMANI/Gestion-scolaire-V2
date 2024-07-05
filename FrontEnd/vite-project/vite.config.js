import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  commonjsOptions: {
    esmExternals: true,
 },
 build: {
  rollupOptions: {
    external: ['axios'],
    input: {
      main: './src/main.jsx' // Adjust this path to match your actual entry point
    }
  }
}
})
