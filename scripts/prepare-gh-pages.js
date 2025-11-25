const fs = require('fs-extra');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const shellDist = path.join(__dirname, '../packages/shell/dist');
const productsDist = path.join(__dirname, '../packages/mfe-products/dist');
const cartDist = path.join(__dirname, '../packages/mfe-cart/dist');

console.log('🚀 Preparando build para GitHub Pages...\n');

// Limpar dist
console.log('🧹 Limpando diretório dist...');
fs.emptyDirSync(distDir);

// Copiar shell para raiz
console.log('📦 Copiando shell para raiz...');
fs.copySync(shellDist, distDir);

// Copiar products e cart para subpastas
console.log('📦 Copiando mfe-products para /products...');
fs.copySync(productsDist, path.join(distDir, 'products'));

console.log('📦 Copiando mfe-cart para /cart...');
fs.copySync(cartDist, path.join(distDir, 'cart'));

// Criar .nojekyll para evitar problemas com arquivos começando com _
console.log('📝 Criando .nojekyll...');
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('\n✅ GitHub Pages build preparado em /dist');
console.log('\nEstrutura criada:');
console.log('  dist/');
console.log('  ├── index.html (shell)');
console.log('  ├── products/');
console.log('  │   └── remoteEntry.js');
console.log('  ├── cart/');
console.log('  │   └── remoteEntry.js');
console.log('  └── .nojekyll');
