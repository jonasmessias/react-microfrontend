/**
 * Event names used in this MFE
 */
export const EVENT_NAMES = {
  CART_ADD_ITEM: 'cart:add-item',
  CART_UPDATED: 'cart:updated',
} as const;

/**
 * Cart configuration
 */
export const CART_CONFIG = {
  MAX_QUANTITY: 10,
  MIN_QUANTITY: 1,
} as const;
