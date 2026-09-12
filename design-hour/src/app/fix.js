const fs = require('fs');
const file = 'globals.css';
let css = fs.readFileSync(file, 'utf8');

css = css.replace(/color:\s*#000(000)?;/g, 'color: var(--taas-text-primary);');
css = css.replace(/color:\s*black;/g, 'color: var(--taas-text-primary);');
css = css.replace(/color:\s*#111(111)?;/g, 'color: var(--taas-text-primary);');
css = css.replace(/color:\s*#171412;/g, 'color: var(--taas-text-primary);');

css = css.replace(/color:\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*(0\.[7-9]+)\s*\);/g, 'color: var(--taas-text-soft);');
css = css.replace(/color:\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*(0\.[0-6]+)\s*\);/g, 'color: var(--taas-text-muted);');

css = css.replace(/border-color:\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.2\s*\);/g, 'border-color: var(--taas-border-hover);');
css = css.replace(/border-color:\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.[0-3]+?\s*\);/g, 'border-color: var(--taas-line);');

fs.writeFileSync(file, css);
console.log('Done replacements');
