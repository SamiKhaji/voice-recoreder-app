import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/voice-recoreder-app/',  // Correct path for GitHub Pages
  plugins: [react()]
});
