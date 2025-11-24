import { memo } from 'react';
import { Button } from '../Button';
import { Price } from '../Price';
import { formatCurrency } from '../../utils/formatters';

interface CartSummaryProps {
  itemCount: number;
  totalPrice: number;
  onCheckout: () => void;
  onClear: () => void;
}

function CartSummaryComponent({ itemCount, totalPrice, onCheckout, onClear }: CartSummaryProps) {
  const itemText = `${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg text-gray-900">Subtotal</span>
          <span className="text-sm text-gray-700">({itemText}):</span>
        </div>
        <Price value={totalPrice} />
      </div>

      <div className="mb-4 flex items-start gap-2">
        <input
          type="checkbox"
          id="gift"
          className="mt-1 w-4 h-4 text-microshop-link border-gray-300 rounded focus:ring-microshop-link"
        />
        <label htmlFor="gift" className="text-xs text-gray-900 cursor-pointer">
          Este pedido é um presente
        </label>
      </div>

      <Button onClick={onCheckout} disabled={itemCount === 0} fullWidth className="mb-2">
        Fechar pedido
      </Button>

      {itemCount > 0 && (
        <Button onClick={onClear} variant="secondary" fullWidth className="text-xs">
          Limpar carrinho
        </Button>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <div className="flex justify-between text-xs text-gray-700">
          <span>Itens:</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-700">
          <span>Frete e manuseio:</span>
          <span className="text-green-700 font-bold">GRÁTIS</span>
        </div>
        <div className="flex justify-between text-xs text-gray-700">
          <span>Total antes dos impostos:</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-700">
          <span>Imposto estimado:</span>
          <span>{formatCurrency(0)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-microshop-link-hover pt-2 border-t border-gray-200">
          <span>Total do pedido:</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}

export const CartSummary = memo(CartSummaryComponent);
