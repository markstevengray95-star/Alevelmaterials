import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'index.html','styles.css','upgrade-v3.css','learning-system-v4.css','visual-overhaul-v5.css','visual-overhaul-v6.css','materials-data.js','app.js','netlify-runtime.js',
  'textbook-visuals-v3.js','textbook-part1-v3.js','textbook-part2-v3.js','extended-bank-v3.js',
  'simulation-upgrade-v3.js','exam-coach-v3.js','learning-system-v4.js','lesson-visuals-v5.js','three-lab-v5.js','lesson-depth-v6.js','simulation-lab-v6.js','service-worker.js','manifest.webmanifest','physics-icon.svg',
  'offline.html','netlify.toml','_redirects','_headers','404.html'
];
for (const name of required) {
  if (!fs.existsSync(path.join(root, name))) throw new Error(`Missing Netlify file: ${name}`);
}
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const ref of ['styles.css','upgrade-v3.css','materials-data.js','textbook-visuals-v3.js','textbook-part1-v3.js','textbook-part2-v3.js','extended-bank-v3.js','app.js','simulation-upgrade-v3.js','exam-coach-v3.js','netlify-runtime.js','manifest.webmanifest','physics-icon.svg']) {
  if (!html.includes(ref)) throw new Error(`index.html does not reference ${ref}`);
}
const coach=fs.readFileSync(path.join(root,'exam-coach-v3.js'),'utf8');
for(const ref of ['learning-system-v4.js','learning-system-v4.css','visual-overhaul-v5.css','lesson-visuals-v5.js','three-lab-v5.js','visual-overhaul-v6.css','lesson-depth-v6.js','simulation-lab-v6.js']){
  if(!coach.includes(ref)) throw new Error(`exam-coach-v3.js does not load ${ref}`);
}
const sw = fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for (const ref of ['index.html','styles.css','upgrade-v3.css','learning-system-v4.css','visual-overhaul-v5.css','visual-overhaul-v6.css','materials-data.js','textbook-visuals-v3.js','textbook-part1-v3.js','textbook-part2-v3.js','extended-bank-v3.js','app.js','simulation-upgrade-v3.js','exam-coach-v3.js','learning-system-v4.js','lesson-visuals-v5.js','three-lab-v5.js','lesson-depth-v6.js','simulation-lab-v6.js','netlify-runtime.js','offline.html']) {
  if (!sw.includes(ref)) throw new Error(`service-worker.js does not cache ${ref}`);
}
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
if(pkg.version!=='6.0.0') throw new Error(`Expected package version 6.0.0, found ${pkg.version}`);
for(const ref of ['three-lab-v5.js','lesson-depth-v6.js','simulation-lab-v6.js']){
  if(!pkg.scripts?.['check:syntax']?.includes(ref)) throw new Error(`Syntax check does not include ${ref}`);
}
const redirects = fs.readFileSync(path.join(root,'_redirects'),'utf8');
if (!redirects.includes('/index.html')) throw new Error('SPA fallback redirect missing');
console.log('Netlify v6 deployment checks passed');
