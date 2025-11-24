/**
 * Currency formatting utility
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Split price into integer and decimal parts
 */
export const splitPrice = (price: number) => {
  const integer = Math.floor(price);
  const decimal = (price % 1).toFixed(2).slice(2);
  return { integer, decimal };
};

/**
 * Format number with locale
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};
