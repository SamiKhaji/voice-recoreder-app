import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/voice-recorder-app/',  // Correct path for GitHub Pages
  plugins: [react()]
});
