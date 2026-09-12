const fs = require('fs');
const file = 'globals.css';
let css = fs.readFileSync(file, 'utf8');

css = css.replace(/color:\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.[0-9]+\s*\);/g, 'color: var(--taas-text-soft);');

fs.writeFileSync(file, css);
console.log('Done replacement');
