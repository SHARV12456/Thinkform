const fs = require('fs');
const file = 'globals.css';
let css = fs.readFileSync(file, 'utf8');

// Replace shadows
css = css.replace(/box-shadow:\s*0\s*18px\s*38px\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.12\s*\);/g, 'box-shadow: var(--taas-card-shadow-hover);');
css = css.replace(/box-shadow:\s*0\s*24px\s*48px\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.12\s*\);/g, 'box-shadow: 0 24px 48px var(--taas-shadow);');
css = css.replace(/box-shadow:\s*0\s*12px\s*32px\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.08\s*\);/g, 'box-shadow: var(--taas-btn-shadow);');
css = css.replace(/box-shadow:\s*0\s*26px\s*60px\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.12\s*\);/g, 'box-shadow: 0 26px 60px var(--taas-shadow);');

// Replace backgrounds
css = css.replace(/background:\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.9\s*\);/g, 'background: var(--taas-text-primary);'); // Using primary text color for strong buttons
css = css.replace(/background:\s*rgba\(\s*23\s*,\s*20\s*,\s*18\s*,\s*0\.04\s*\);/g, 'background: var(--taas-surface);'); // Option card background

fs.writeFileSync(file, css);
console.log('Done replacement');
