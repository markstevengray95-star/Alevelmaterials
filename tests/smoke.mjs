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
const lessonsV5=fs.readFileSync(new URL('../lesson-visuals-v5.js',import.meta.url),'utf8');
const threeV5=fs.readFileSync(new URL('../three-lab-v5.js',import.meta.url),'utf8');
const lessonsV6=fs.readFileSync(new URL('../lesson-depth-v6.js',import.meta.url),'utf8');
const simV6=fs.readFileSync(new URL('../simulation-lab-v6.js',import.meta.url),'utf8');
const bookV6=fs.readFileSync(new URL('../textbook-depth-v6.js',import.meta.url),'utf8');
for (const required of ['view-course','view-textbook','view-lab','view-formula','view-practical','view-mastery','view-extended','view-spec']) {
  if(!html.includes(required)) throw new Error(`Missing ${required}`);
}
for (const ref of ['textbook-part1-v3.js','textbook-part2-v3.js','extended-bank-v3.js','simulation-upgrade-v3.js','exam-coach-v3.js']) {
  if(!html.includes(ref)) throw new Error(`Missing base script reference: ${ref}`);
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
for(const ref of ['learning-system-v4.js','visual-overhaul-v5.css','lesson-visuals-v5.js','three-lab-v5.js','visual-overhaul-v6.css','lesson-depth-v6.js','simulation-lab-v6.js','textbook-depth-v6.js']){
  if(!coach.includes(ref)) throw new Error(`Exam coach/loader does not load ${ref}`);
}
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
for(const feature of ['Visual learning layer · v5','Deeper reasoning','Visual concept atlas','Required Practical 4: a complete measurement chain']){
  if(!lessonsV5.includes(feature)&&!v4.includes(feature)) throw new Error(`Missing v5 lesson/textbook feature: ${feature}`);
}
for(const feature of ['Interactive 3D materials lab','WebGL Materials Laboratory','physically based materials','drag apparatus','Young modulus / RP4','Elastic/plastic test','Stress–strain specimen']){
  if(!threeV5.includes(feature)) throw new Error(`Missing v5 3D feature: ${feature}`);
}
if(!threeV5.includes('three@0.186.0')) throw new Error('Three.js v5 renderer dependency not pinned');
for(const feature of ['v6 · visual explanation','Second worked example · full reasoning','Exam question ladder','Move between representations']){
  if(!lessonsV6.includes(feature)) throw new Error(`Missing v6 lesson feature: ${feature}`);
}
for(const lesson of ['density','hooke','force-extension','energy','stress-strain','young','curves','rp4']){
  if(!lessonsV6.includes(`${lesson}:`) && !lessonsV6.includes(`'${lesson}':`)) throw new Error(`Missing v6 lesson depth for ${lesson}`);
}
for(const feature of ['v6 · 3D experiment engine','Record 3D reading','Auto sweep','Slow-motion load','best-fit gradient','Real measurement mode','Take micrometer reading','Guided 3D investigation','overlay material comparison']){
  if(!simV6.includes(feature)) throw new Error(`Missing v6 3D experiment feature: ${feature}`);
}
for(const feature of ['v6 synthesis','From measurement to a defendable density result','How to read a force–extension experiment like an examiner','Young modulus as a gradient and as an equation','RP4 from apparatus to final uncertainty statement']){
  if(!bookV6.includes(feature)) throw new Error(`Missing v6 textbook synthesis feature: ${feature}`);
}
console.log('Static v6 content smoke checks passed');
