export const EVENT_NAMES = {
  PRODUCT_SEARCH: 'product:search',
  PRODUCT_SEARCH_CLEAR: 'product:search:clear',
} as const;

export const CATEGORIES = ['Todos', 'Eletrônicos', 'Livros', 'Roupas', 'Casa', 'Esportes'] as const;

export const MFE_REMOTES = {
  PRODUCTS: 'mfeProducts@http://localhost:3001/remoteEntry.js',
  CART: 'mfeCart@http://localhost:3002/remoteEntry.js',
} as const;
