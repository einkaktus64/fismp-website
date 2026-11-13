import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const base = '/fismp-website/';

export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
    {
      name: 'github-pages-public-asset-paths',
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
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        rules: resolve(import.meta.dirname, 'rules.html'),
      },
    },
  },
});
