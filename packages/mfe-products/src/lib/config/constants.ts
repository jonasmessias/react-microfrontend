export const EVENT_NAMES = {
  CART_ADD_ITEM: 'cart:add-item',
  PRODUCT_SEARCH: 'product:search',
  PRODUCT_SEARCH_CLEAR: 'product:search:clear',
} as const;

export const CATEGORIES = [
  'Todos',
  'Eletrônicos',
  'Livros',
  'Roupas',
  'Casa',
  'Esportes',
  'Periféricos',
] as const;

export const RATING_CONFIG = {
  MIN: 3.0,
  MAX: 5.0,
  SCALE: 5,
} as const;
