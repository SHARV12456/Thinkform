const fs = require('fs');
const file = 'globals.css';
let css = fs.readFileSync(file, 'utf8');

css = css.replace(/background: linear-gradient\(180deg, rgba\(22, 29, 38, 0\.6\), rgba\(17, 23, 30, 0\.4\)\);/g, 'background: var(--taas-bg-elevated);');
css = css.replace(/border-color: rgba\(255, 255, 255, 0\.06\);/g, 'border-color: var(--taas-line);');
css = css.replace(/border-color: rgba\(255, 255, 255, 0\.14\);/g, 'border-color: var(--taas-border-hover);');

css = css.replace(/background: rgba\(15, 20, 25, 0\.88\);/g, 'background: rgba(11, 11, 11, 0.88);');

// Change card gradients in root variables
css = css.replace(/--taas-card-from: rgba\(22, 29, 38, 0\.6\);/g, '--taas-card-from: #121212;');
css = css.replace(/--taas-card-to: rgba\(17, 23, 30, 0\.4\);/g, '--taas-card-to: #111111;');

fs.writeFileSync(file, css);
console.log('Done card updates');
