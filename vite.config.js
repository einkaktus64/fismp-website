import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages serves this project under its repository name.
  base: '/fismp-website/',
  plugins: [
    tailwindcss(),
    {
      name: 'github-pages-public-assets',
      transformIndexHtml(html) {
        return html.replaceAll('"/previews/', '"%BASE_URL%previews/');
      },
      transform(code, id) {
        if (id.endsWith('/src/main.js')) {
          return code.replace(
            "fetch('/guardian-reimagined-by-lolochee.schem')",
            "fetch(`${import.meta.env.BASE_URL}guardian-reimagined-by-lolochee.schem`)",
          );
        }
        return code;
      },
    },
  ],
});
