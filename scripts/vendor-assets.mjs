import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'vendor');
fs.mkdirSync(out,{recursive:true});
const assets=[
  ['node_modules/three/build/three.module.min.js','three.module.min.js'],
  ['node_modules/xlsx/dist/xlsx.full.min.js','xlsx.full.min.js']
];
for(const [src,name] of assets){
  const from=path.join(root,src),to=path.join(out,name);
  if(!fs.existsSync(from)) throw new Error(`Missing dependency asset: ${src}. Run npm install first.`);
  fs.copyFileSync(from,to);
  console.log(`Vendored ${name}`);
}
