import fs from 'node:fs';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const data=fs.readFileSync(new URL('../materials-data.js',import.meta.url),'utf8');
const textbook1=fs.readFileSync(new URL('../textbook-part1-v3.js',import.meta.url),'utf8');
const textbook2=fs.readFileSync(new URL('../textbook-part2-v3.js',import.meta.url),'utf8');
const extended=fs.readFileSync(new URL('../extended-bank-v3.js',import.meta.url),'utf8');
const sim=fs.readFileSync(new URL('../simulation-upgrade-v3.js',import.meta.url),'utf8');
for (const required of ['view-course','view-textbook','view-lab','view-formula','view-practical','view-mastery','view-extended','view-spec']) {
  if(!html.includes(required)) throw new Error(`Missing ${required}`);
}
for (const ref of ['textbook-part1-v3.js','textbook-part2-v3.js','extended-bank-v3.js','simulation-upgrade-v3.js','exam-coach-v3.js']) {
  if(!html.includes(ref)) throw new Error(`Missing v3 script reference: ${ref}`);
}
if(!data.includes('window.MATERIALS_DATA')) throw new Error('Missing data object');
if(!js.includes('renderLesson')) throw new Error('Missing lesson renderer');
const chapterCount=(textbook1.match(/title:'\d ·/g)||[]).length+(textbook2.match(/title:'\d ·/g)||[]).length;
if(chapterCount!==9) throw new Error(`Expected 9 textbook chapters, found ${chapterCount}`);
const longAnswerCount=(extended.match(/marks:(6|8),q:/g)||[]).length;
if(longAnswerCount!==12) throw new Error(`Expected 12 extended responses, found ${longAnswerCount}`);
for(const feature of ['autoSweep','exportCsv','compareMaterials','Live graph & data logger']){
  if(!sim.includes(feature)) throw new Error(`Missing simulation upgrade: ${feature}`);
}
console.log('Static v3 content smoke checks passed');
