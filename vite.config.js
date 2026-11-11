import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Project Pages URLs are served under the repository name.
  base: '/fismp-website/',
  plugins: [tailwindcss()],
});
