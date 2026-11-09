import { resolve } from 'node:path';
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
        return html
          .replace('</nav>', '<a href="%BASE_URL%rules.html">Rules</a></nav>')
          .replace(
            '<a class="primary-button" href="#world">',
            '<a class="primary-button rules-button" href="%BASE_URL%rules.html">Read the rules</a>\n            <a class="primary-button" href="#world">',
          )
          .replace('</head>', '<style>.hero-copy .rules-button{display:flex;width:max-content;margin-bottom:12px}</style>\n  </head>')
          .replaceAll('"/previews/', '"%BASE_URL%previews/');
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
