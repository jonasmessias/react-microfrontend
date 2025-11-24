export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const splitPrice = (price: number) => {
  const integer = Math.floor(price);
  const decimal = (price % 1).toFixed(2).slice(2);
  return { integer, decimal };
};
