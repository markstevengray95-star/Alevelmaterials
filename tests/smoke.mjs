import fs from 'node:fs';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const data=fs.readFileSync(new URL('../materials-data.js',import.meta.url),'utf8');
const textbook1=fs.readFileSync(new URL('../textbook-part1-v3.js',import.meta.url),'utf8');
const textbook2=fs.readFileSync(new URL('../textbook-part2-v3.js',import.meta.url),'utf8');
const extended=fs.readFileSync(new URL('../extended-bank-v3.js',import.meta.url),'utf8');
const sim=fs.readFileSync(new URL('../simulation-upgrade-v3.js',import.meta.url),'utf8');
const coach=fs.readFileSync(new URL('../exam-coach-v3.js',import.meta.url),'utf8');
const v4=fs.readFileSync(new URL('../learning-system-v4.js',import.meta.url),'utf8');
for (const required of ['view-course','view-textbook','view-lab','view-formula','view-practical','view-mastery','view-extended','view-spec']) {
  if(!html.includes(required)) throw new Error(`Missing ${required}`);
}
for (const ref of ['textbook-part1-v3.js','textbook-part2-v3.js','extended-bank-v3.js','simulation-upgrade-v3.js','exam-coach-v3.js']) {
  if(!html.includes(ref)) throw new Error(`Missing v3 script reference: ${ref}`);
}
if(!data.includes('window.MATERIALS_DATA')) throw new Error('Missing data object');
if(!js.includes('renderLesson')) throw new Error('Missing lesson renderer');
const chapterCount=(textbook1.match(/title:'/g)||[]).length+(textbook2.match(/title:'/g)||[]).length;
if(chapterCount!==9) throw new Error(`Expected 9 textbook chapters, found ${chapterCount}`);
const longAnswerCount=(extended.match(/marks:(6|8),q:/g)||[]).length;
if(longAnswerCount!==12) throw new Error(`Expected 12 extended responses, found ${longAnswerCount}`);
for(const feature of ['autoSweep','exportCsv','compareMaterials','Live graph & data logger']){
  if(!sim.includes(feature)) throw new Error(`Missing simulation upgrade: ${feature}`);
}
if(!coach.includes('learning-system-v4.js')) throw new Error('v4 learning system is not loaded by exam coach');
for(const feature of [
  'Adaptive recommendation','Full exam mode','Spaced retrieval','Error spotter','Engineering materials challenge',
  'Student notebook','Teacher mode','Calculation generator','Equation trainer','Calculation whiteboard',
  'Practical & data analysis laboratory','RP4 advanced measurement bench','Force–extension → stress–strain converter',
  'Interactive force–extension graph lab','Microscopic deformation viewer','Advanced stress–strain comparison',
  'Equation explorer','Evidence mastery','Mandarin key-term support'
]){
  if(!v4.includes(feature)) throw new Error(`Missing v4 feature: ${feature}`);
}
for(const equation of ['ρ = m/V','F = kΔL','E = ½FΔL','σ = F/A','ε = ΔL/L','A = πd²/4','E = σ/ε = FL/(AΔL)']){
  if(!v4.includes(equation)) throw new Error(`Equation explorer missing ${equation}`);
}
console.log('Static v4 content smoke checks passed');
