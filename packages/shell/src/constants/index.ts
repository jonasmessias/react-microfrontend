/**
 * Event names used by Shell to communicate with MFEs
 */
export const EVENT_NAMES = {
  PRODUCT_SEARCH: 'product:search',
  PRODUCT_SEARCH_CLEAR: 'product:search:clear',
} as const;

/**
 * Product categories available in search
 */
export const CATEGORIES = ['Todos', 'Eletrônicos', 'Livros', 'Roupas', 'Casa', 'Esportes'] as const;

/**
 * MFE remote URLs configuration
 */
export const MFE_REMOTES = {
  PRODUCTS: 'mfeProducts@http://localhost:3001/remoteEntry.js',
  CART: 'mfeCart@http://localhost:3002/remoteEntry.js',
} as const;
