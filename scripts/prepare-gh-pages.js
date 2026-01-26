const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, '../dist');
const shellDist = path.join(__dirname, '../packages/shell/dist');
const productsDist = path.join(__dirname, '../packages/mfe-products/dist');
const cartDist = path.join(__dirname, '../packages/mfe-cart/dist');

// Nome do repositório GitHub (AJUSTE SE NECESSÁRIO)
const REPO_NAME = 'microfrontend';
const BASE_URL = `https://jonasmessias.github.io/${REPO_NAME}`;

console.log('🚀 Preparando build para GitHub Pages...\n');
console.log(`📦 Base URL: ${BASE_URL}\n`);

// Limpar dist
console.log('🧹 Limpando diretórios dist...');
fs.emptyDirSync(distDir);
fs.emptyDirSync(shellDist);
fs.emptyDirSync(productsDist);
fs.emptyDirSync(cartDist);

// Build cada microfrontend com as variáveis de ambiente corretas
console.log('\n📦 Building MFE Products...');
process.env.PUBLIC_PATH = `${BASE_URL}/products/`;
execSync('npm run build -- --mode production', {
  cwd: path.join(__dirname, '../packages/mfe-products'),
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_PATH: `${BASE_URL}/products/` }
});

console.log('\n📦 Building MFE Cart...');
process.env.PUBLIC_PATH = `${BASE_URL}/cart/`;
execSync('npm run build -- --mode production', {
  cwd: path.join(__dirname, '../packages/mfe-cart'),
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_PATH: `${BASE_URL}/cart/` }
});

console.log('\n📦 Building Shell...');
process.env.PUBLIC_PATH = `${BASE_URL}/`;
process.env.PRODUCTS_URL = `mfeProducts@${BASE_URL}/products/remoteEntry.js`;
process.env.CART_URL = `mfeCart@${BASE_URL}/cart/remoteEntry.js`;
execSync('npm run build -- --mode production', {
  cwd: path.join(__dirname, '../packages/shell'),
  stdio: 'inherit',
  env: {
    ...process.env,
    PUBLIC_PATH: `${BASE_URL}/`,
    PRODUCTS_URL: `mfeProducts@${BASE_URL}/products/remoteEntry.js`,
    CART_URL: `mfeCart@${BASE_URL}/cart/remoteEntry.js`
  }
});

// Copiar shell para raiz
console.log('\n� Copiando shell para raiz...');
fs.copySync(shellDist, distDir);

// Copiar products e cart para subpastas
console.log('� Copiando mfe-products para /products...');
fs.copySync(productsDist, path.join(distDir, 'products'));

console.log('� Copiando mfe-cart para /cart...');
fs.copySync(cartDist, path.join(distDir, 'cart'));

// Criar .nojekyll para evitar problemas com arquivos começando com _
console.log('📝 Criando .nojekyll...');
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('\n✅ GitHub Pages build preparado em /dist');
console.log(`\n🌐 O site estará disponível em: ${BASE_URL}`);
console.log('\nEstrutura criada:');
console.log('  dist/');
console.log('  ├── index.html (shell)');
console.log('  ├── products/');
console.log('  │   └── remoteEntry.js');
console.log('  ├── cart/');
console.log('  │   └── remoteEntry.js');
console.log('  └── .nojekyll');
