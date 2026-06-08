// Regenerates the PWA PNG icons from the torch-and-python vector design.
// Run with: npm run gen-icons   (sharp is installed --no-save just for this)
//
// Outputs (into ../public):
//   icon-192.png            192x192  rounded "tile"  (manifest, purpose: any)
//   icon-512.png            512x512  rounded "tile"  (manifest, purpose: any)
//   icon-maskable-512.png   512x512  full-bleed, content in the maskable safe zone
//   apple-touch-icon.png    180x180  full-bleed (iOS applies its own rounded mask)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const DEFS = `
  <defs>
    <linearGradient id="fl" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#1e40af"/><stop offset="50%" stop-color="#2563eb"/><stop offset="100%" stop-color="#7dd3fc"/>
    </linearGradient>
    <linearGradient id="mt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7c2d12"/><stop offset="50%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#7c2d12"/>
    </linearGradient>
    <linearGradient id="sn" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ade80"/><stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
  </defs>`;

const CONTENT = `
  <path d="M132 146 Q100 116 68 124" stroke="url(#sn)" stroke-width="21" fill="none" stroke-linecap="round"/>
  <rect x="78" y="162" width="44" height="13" rx="4" fill="url(#mt)"/>
  <path d="M87 100 L113 100 L110 166 L90 166 Z" fill="url(#mt)"/>
  <path d="M72 84 Q100 73 128 84 L115 104 Q100 109 85 104 Z" fill="url(#mt)"/>
  <path d="M100 16 C136 56, 129 92, 100 104 C71 92, 64 56, 100 16 Z" fill="url(#fl)"/>
  <path d="M100 42 C118 66, 116 90, 100 103 C90 88, 88 66, 100 42 Z" fill="#dbeafe"/>
  <path d="M68 124 Q100 138 132 104" stroke="url(#sn)" stroke-width="21" fill="none" stroke-linecap="round"/>
  <path d="M76 160 Q100 170 124 152" stroke="url(#sn)" stroke-width="21" fill="none" stroke-linecap="round"/>
  <g transform="translate(132,104) rotate(-20)">
    <ellipse rx="16" ry="12" fill="url(#sn)"/>
    <circle cx="7" cy="-3" r="3" fill="#0f172a"/>
    <path d="M14 2 l10 1 l-5 2 l7 1" fill="none" stroke="#f43f5e" stroke-width="2.4" stroke-linecap="round"/>
  </g>`;

function buildSVG(px, { rounded, scale = 1 }) {
  const bg = rounded
    ? `<rect width="200" height="200" rx="42" fill="#0a0a0a"/>`
    : `<rect width="200" height="200" fill="#0a0a0a"/>`;
  const content = scale === 1
    ? CONTENT
    : `<g transform="translate(100 100) scale(${scale}) translate(-100 -100)">${CONTENT}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 200 200">${DEFS}${bg}${content}</svg>`;
}

const jobs = [
  { file: 'icon-192.png', px: 192, opts: { rounded: true } },
  { file: 'icon-512.png', px: 512, opts: { rounded: true } },
  { file: 'icon-maskable-512.png', px: 512, opts: { rounded: false, scale: 0.72 } },
  { file: 'apple-touch-icon.png', px: 180, opts: { rounded: false, scale: 0.82 } },
];

for (const { file, px, opts } of jobs) {
  const svg = buildSVG(px, opts);
  await sharp(Buffer.from(svg)).png().toFile(join(PUBLIC, file));
  console.log(`wrote ${file} (${px}x${px})`);
}
console.log('done');
