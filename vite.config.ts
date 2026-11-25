import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Proposta_Comercial_v2/',
  plugins: [react(), basicSsl()],
  server: {
    host: true,
    port: 3000
  }
})