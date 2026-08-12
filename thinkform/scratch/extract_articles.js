const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../app/ideas/[slug]/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// The ideas array is defined as `const ideas = [ ... ];`
// We will extract it using a regex or simple parsing.
// Actually, it might be easier to just require it if we temporarily export it, but it's TypeScript.

// A safer way: I'll use a regex to grab everything between `const ideas = [` and `];\n\ntype Idea =`
const match = content.match(/const ideas = (\[[\s\S]*?\]);\n\ntype Idea =/);

if (match && match[1]) {
  // To safely parse this JS array into JSON, we can write it to a temp file, require it, and stringify it.
  const tempJs = `module.exports = ${match[1]};`;
  fs.writeFileSync(path.join(__dirname, 'temp_articles.js'), tempJs);
  
  const articles = require('./temp_articles.js');
  
  // Write to data/articles.json
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  fs.writeFileSync(path.join(dataDir, 'articles.json'), JSON.stringify(articles, null, 2));
  console.log('Successfully extracted', articles.length, 'articles to data/articles.json');
} else {
  console.log('Could not match the ideas array.');
}
