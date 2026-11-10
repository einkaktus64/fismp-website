import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const base = '/fismp-website/';
const javaAddress = 'fismp.run.place';
const bedrockAddress = 'shrimp-config.tun.ply.gg:19132';

const serverAddressMarkup = `
  <div class="server-address-list" aria-label="Server addresses">
    <div class="server-address-row"><span><b>JAVA</b><code>${javaAddress}</code></span><button class="copy-server-ip" type="button" data-server-ip="${javaAddress}">Copy Java IP</button></div>
    <div class="server-address-row"><span><b>BEDROCK</b><code>${bedrockAddress}</code></span><button class="copy-server-ip" type="button" data-server-ip="${bedrockAddress}">Copy Bedrock IP</button></div>
  </div>`;

const copyScript = `<script>
document.querySelectorAll('.copy-server-ip').forEach((button) => {
  button.addEventListener('click', async () => {
    const address = button.dataset.serverIp;
    try {
      await navigator.clipboard.writeText(address);
      button.textContent = 'Copied!';
      const feedback = document.querySelector('.copy-feedback');
      if (feedback) {
        feedback.textContent = address + ' copied — see you soon!';
        feedback.classList.add('show');
      }
      window.setTimeout(() => {
        button.textContent = address === '${javaAddress}' ? 'Copy Java IP' : 'Copy Bedrock IP';
      }, 1800);
    } catch {
      button.textContent = address;
      const feedback = document.querySelector('.copy-feedback');
      if (feedback) {
        feedback.textContent = 'Copy this address: ' + address;
        feedback.classList.add('show');
      }
    }
  });
});
</script>`;

export default defineConfig({
  // Project Pages deployment URL: https://einkaktus64.github.io/fismp-website/
  base,
  plugins: [
    tailwindcss(),
    {
      name: 'github-pages-public-assets-and-server-addresses',
      transformIndexHtml(html) {
        return html
          .replace('</nav>', `<a href="${base}rules.html">Rules</a></nav>`)
          .replace(
            '<a class="primary-button" href="#world">',
            `<a class="primary-button rules-button" href="${base}rules.html">Read the rules</a>\n            <a class="primary-button" href="#world">`,
          )
          .replace(
            '<div class="hero-server"><span>JAVA + BEDROCK</span><b>·</b><span>FISMP.RUN.PLACE</span></div>',
            `<div class="hero-server"><span>JAVA ${javaAddress}</span><b>·</b><span>BEDROCK ${bedrockAddress}</span></div>${serverAddressMarkup}`,
          )
          .replace(
            '<div class="server-address"><span class="status-dot"></span><span id="server-ip">fismp.run.place</span><span class="edition-label">JAVA + BEDROCK</span></div>',
            serverAddressMarkup,
          )
          .replaceAll('"/previews/', `"${base}previews/`)
          .replace('</head>', `<style>
            .hero-copy .rules-button{display:flex;width:max-content;margin-bottom:12px}
            .server-address-list{display:grid;gap:8px;margin-top:12px;width:min(100%,440px);position:relative;z-index:3}
            .server-address-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid #d2e7c84d;border-radius:12px;background:#092629d9;color:#eef5e8;font:inherit}
            .server-address-row span{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
            .server-address-row b{font-size:10px;letter-spacing:.12em;color:#d2e7c8}
            .server-address-row code{font-size:13px;color:#fff;font-family:ui-monospace,SFMono-Regular,Consolas,monospace}
            .copy-server-ip{border:0;border-radius:999px;background:#d2e7c8;color:#12352e;padding:8px 12px;font:700 11px inherit;cursor:pointer;white-space:nowrap}
            .copy-server-ip:hover{filter:brightness(1.08)}
            @media(max-width:600px){.server-address-row{align-items:flex-start;flex-direction:column}.server-address-row code{font-size:12px}}
          </style>\n</head>`)
          .replace('</body>', `${copyScript}\n</body>`);
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
