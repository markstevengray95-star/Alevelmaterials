import fs from 'node:fs';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const data=fs.readFileSync(new URL('../materials-data.js',import.meta.url),'utf8');
for (const required of ['view-course','view-textbook','view-lab','view-formula','view-practical','view-mastery','view-extended','view-spec']) {
  if(!html.includes(required)) throw new Error(`Missing ${required}`);
}
if(!data.includes('window.MATERIALS_DATA')) throw new Error('Missing data object');
if(!js.includes('renderLesson')) throw new Error('Missing lesson renderer');
console.log('Static smoke checks passed');
