const fs = require('fs');
const file = 'globals.css';
let css = fs.readFileSync(file, 'utf8');

// Replace dark mode root variables
css = css.replace(/--taas-bg: #0f1419;/, '--taas-bg: #0B0B0B;');
css = css.replace(/--taas-bg-deep: #0a0e13;/, '--taas-bg-deep: #000000;');
css = css.replace(/--taas-bg-elevated: #161d26;/, '--taas-bg-elevated: #121212;');
css = css.replace(/--taas-bg-recessed: #0b0f14;/, '--taas-bg-recessed: #171717;');

css = css.replace(/--taas-text-primary: #f0ece5;/, '--taas-text-primary: #F5F5F2;');
css = css.replace(/--taas-text-soft: rgba\(240, 236, 229, 0\.72\);/, '--taas-text-soft: #B8B8B2;');
css = css.replace(/--taas-text-muted: rgba\(240, 236, 229, 0\.48\);/, '--taas-text-muted: #85857F;');
css = css.replace(/--taas-text-tertiary: rgba\(240, 236, 229, 0\.32\);/, '--taas-text-tertiary: #525252;');

css = css.replace(/--taas-line: rgba\(255, 255, 255, 0\.07\);/, '--taas-line: rgba(255,255,255,0.12);');
css = css.replace(/--taas-border-hover: rgba\(255, 255, 255, 0\.18\);/, '--taas-border-hover: rgba(255,255,255,0.20);');

css = css.replace(/--taas-surface: rgba\(22, 29, 38, 0\.76\);/, '--taas-surface: #111111;');
css = css.replace(/--taas-surface-strong: rgba\(22, 29, 38, 0\.94\);/, '--taas-surface-strong: #181818;');

css = css.replace(/--taas-charcoal: #f0ece5;/, '--taas-charcoal: #F5F5F2;');

fs.writeFileSync(file, css);
console.log('Done token updates');
