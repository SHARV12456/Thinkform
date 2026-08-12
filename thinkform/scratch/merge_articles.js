const fs = require('fs');
const path = require('path');

const indexPage = fs.readFileSync(path.join(__dirname, '../app/ideas/page.tsx'), 'utf8');
const slugPage = fs.readFileSync(path.join(__dirname, '../app/ideas/[slug]/page.tsx'), 'utf8');

const indexMatch = indexPage.match(/const ideas = (\[[\s\S]*?\]);\n\nconst categories/);
const slugMatch = slugPage.match(/const ideas = (\[[\s\S]*?\]);\n\ntype Idea =/);

if (indexMatch && indexMatch[1] && slugMatch && slugMatch[1]) {
  fs.writeFileSync(path.join(__dirname, 'temp_index.js'), `module.exports = ${indexMatch[1]};`);
  fs.writeFileSync(path.join(__dirname, 'temp_slug.js'), `module.exports = ${slugMatch[1]};`);
  
  const indexIdeas = require('./temp_index.js');
  const slugIdeas = require('./temp_slug.js');
  
  const unified = slugIdeas.map(slugIdea => {
    const indexData = indexIdeas.find(i => i.slug === slugIdea.slug);
    return {
      slug: slugIdea.slug,
      category: slugIdea.category,
      title: slugIdea.title,
      preview: indexData ? indexData.preview : 'A strategic breakdown of business frameworks.',
      readTime: slugIdea.readTime,
      content: slugIdea.content
    };
  });
  
  fs.writeFileSync(path.join(__dirname, '../data/articles.json'), JSON.stringify(unified, null, 2));
  console.log('Successfully merged', unified.length, 'articles to data/articles.json');
} else {
  console.log('Failed to parse one of the files');
}
