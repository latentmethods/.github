import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = fileURLToPath(new URL('../', import.meta.url));
const readmePath = resolve(root, 'profile/README.md');
const sourcePath = resolve(root, 'profile/assets/latent-methods.svg');
const outputPath = resolve(root, 'profile/assets/latent-methods.png');
const args = process.argv.slice(2);
assert(args.length === 0 || (args.length === 1 && args[0] === '--write'),
  'Usage: node scripts/profile-banner.mjs [--write]');

// Use the same pinned renderer locally and in CI. Outlined lettering needs no fonts.
const png = new Resvg(readFileSync(sourcePath), {
  fitTo: { mode: 'width', value: 2400 },
  font: { loadSystemFonts: false },
}).render().asPng();

assert.equal(png.readUInt32BE(16), 2400, 'Banner must be 2400 pixels wide');
assert.equal(png.readUInt32BE(20), 640, 'Banner must be 640 pixels high');
assert(png.length < 500_000, 'Banner exceeds the 500 kB transfer budget');

const readme = readFileSync(readmePath, 'utf8');
const images = [...readme.matchAll(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)];
assert(images.some(([, , src]) => src === 'assets/latent-methods.png'),
  'Profile must embed assets/latent-methods.png');

for (const [, alt, src] of images) {
  assert(alt.trim(), `Image ${src} needs descriptive alt text`);
  assert(!/^(?:[a-z]+:|\/\/|\/)/i.test(src),
    `Keep profile images in this repository with relative paths: ${src}`);
  const imagePath = resolve(dirname(readmePath), src);
  assert(imagePath.startsWith(resolve(root, 'profile') + sep),
    `Image path escapes the profile directory: ${src}`);
  assert(/\.(?:png|jpe?g|gif)$/i.test(src),
    `Use a raster image in the profile: ${src}`);
  if (imagePath !== outputPath || !args.includes('--write')) {
    assert(readFileSync(imagePath).length > 0, `Image is empty: ${src}`);
  }
}

if (args.includes('--write')) {
  writeFileSync(outputPath, png);
  console.log(`Exported profile/assets/latent-methods.png (${png.length} bytes, 2400×640)`);
} else {
  assert(readFileSync(outputPath).equals(png),
    'Banner PNG is stale or damaged. Run npm run build:banner and commit the PNG.');
  console.log(`Profile image references and banner export passed (${png.length} bytes, 2400×640)`);
}
