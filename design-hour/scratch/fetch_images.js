const https = require('https');

const queries = [
  'empty-architectural-kitchen-interior',
  'empty-luxury-living-room',
  'minimalist-empty-apartment',
  'modern-empty-office-interior',
  'contemporary-empty-living-room'
];

queries.forEach(q => {
  https.get('https://unsplash.com/s/photos/' + q, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const matches = data.match(/photo-[a-zA-Z0-9\-]{10,}/g);
      if (matches) {
        console.log(`\n--- ${q} ---`);
        console.log([...new Set(matches)].slice(0, 5).join('\n'));
      }
    });
  });
});
