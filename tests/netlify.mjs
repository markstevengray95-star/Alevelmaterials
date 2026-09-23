import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'index.html','styles.css','materials-data.js','app.js','netlify-runtime.js',
  'service-worker.js','manifest.webmanifest','physics-icon.svg','offline.html',
  'netlify.toml','_redirects','_headers','404.html'
];
for (const name of required) {
  if (!fs.existsSync(path.join(root, name))) throw new Error(`Missing Netlify file: ${name}`);
}
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const ref of ['styles.css','materials-data.js','app.js','netlify-runtime.js','manifest.webmanifest','physics-icon.svg']) {
  if (!html.includes(ref)) throw new Error(`index.html does not reference ${ref}`);
}
const sw = fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for (const ref of ['index.html','styles.css','materials-data.js','app.js','netlify-runtime.js','offline.html']) {
  if (!sw.includes(ref)) throw new Error(`service-worker.js does not cache ${ref}`);
}
const redirects = fs.readFileSync(path.join(root,'_redirects'),'utf8');
if (!redirects.includes('/index.html')) throw new Error('SPA fallback redirect missing');
console.log('Netlify deployment checks passed');
