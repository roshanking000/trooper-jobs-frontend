import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    "process.env": {},
  },
  optimizeDeps: {
    exclude: ['@web3modal_ethereum.js', '@rainbow-me_rainbowkit.js', 'wagmi_providers_alchemy.js', 'wagmi_providers_public.js', 'react-dnd.js']
  }
})
