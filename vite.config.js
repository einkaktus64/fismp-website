import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const base = '/vibecoded-fismp-website/';

export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
    {
      name: 'github-pages-public-asset-paths',
      transformIndexHtml(html) {
        // Public images are referenced with root-relative URLs in index.html.
        // Prefix them with Vite's deployment base so project Pages can find them.
        return html.replaceAll('"/previews/', '"%BASE_URL%previews/');
      },
      transform(code, id) {
        if (id.endsWith('/src/main.js')) {
          return code.replace(
            "fetch('/guardian-reimagined-by-lolochee.schem')",
            "fetch(`${import.meta.env.BASE_URL}guardian-reimagined-by-lolochee.schem`)",
          );
        }
      },
    },
  ],
});
