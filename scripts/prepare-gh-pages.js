const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, '../dist');
const shellDist = path.join(__dirname, '../packages/shell/dist');
const productsDist = path.join(__dirname, '../packages/mfe-products/dist');
const cartDist = path.join(__dirname, '../packages/mfe-cart/dist');

const REPO_NAME = 'react-microfrontend';
const BASE_URL = `https://jonasmessias.github.io/${REPO_NAME}`;

console.log('Building for GitHub Pages...');

fs.emptyDirSync(distDir);
fs.emptyDirSync(shellDist);
fs.emptyDirSync(productsDist);
fs.emptyDirSync(cartDist);

console.log('Building Products MFE...');
execSync('npm run build -- --mode production', {
  cwd: path.join(__dirname, '../packages/mfe-products'),
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_PATH: `${BASE_URL}/products/` },
});

console.log('Building Cart MFE...');
execSync('npm run build -- --mode production', {
  cwd: path.join(__dirname, '../packages/mfe-cart'),
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_PATH: `${BASE_URL}/cart/` },
});

console.log('Building Shell...');
execSync('npm run build -- --mode production', {
  cwd: path.join(__dirname, '../packages/shell'),
  stdio: 'inherit',
  env: {
    ...process.env,
    PUBLIC_PATH: `${BASE_URL}/`,
    PRODUCTS_URL: `mfeProducts@${BASE_URL}/products/remoteEntry.js`,
    CART_URL: `mfeCart@${BASE_URL}/cart/remoteEntry.js`,
  },
});

fs.copySync(shellDist, distDir);
fs.copySync(productsDist, path.join(distDir, 'products'));
fs.copySync(cartDist, path.join(distDir, 'cart'));
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log(`Build complete: ${BASE_URL}`);
