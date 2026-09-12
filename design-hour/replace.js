const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/Design Hour/g, 'TAAS');
  content = content.replace(/DESIGN HOUR/g, 'TAAS');
  content = content.replace(/Design hour/g, 'TAAS');
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.json')) {
      replaceInFile(fullPath);
    }
  }
}

walk(path.join(__dirname, 'src'));
console.log('Replacement complete.');
