const pkg = require('@prisma/client');
console.log('typeof pkg', typeof pkg);
console.log('pkg keys', Object.keys(pkg));
console.log('has default', 'default' in pkg);
console.log('PrismaClient', pkg.PrismaClient);
console.log('default.PrismaClient', pkg.default && pkg.default.PrismaClient);
