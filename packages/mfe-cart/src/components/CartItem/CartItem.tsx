import { memo } from 'react';
import { CartItem as CartItemType } from '../../types/cart';
import { Button } from '../Button';
import { Price } from '../Price';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const subtotal = item.price * item.quantity;
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateQuantity(item.id, parseInt(e.target.value));
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="p-4 flex gap-4">
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-contain bg-gray-50 rounded"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 mb-1 hover:text-microshop-link-hover cursor-pointer">
          {item.name}
        </h3>

        <div className="mb-2">
          <Price value={item.price} size="medium" />
        </div>

        <p className="text-xs text-green-700 font-medium mb-2">Em estoque</p>

        <p className="text-xs text-gray-700 mb-3">
          <span className="font-bold">Frete GRÁTIS</span>
        </p>

        <div className="flex items-center gap-4">
          <select
            value={item.quantity}
            onChange={handleQuantityChange}
            className="text-xs border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-microshop-orange-focus focus:border-microshop-orange-focus"
          >
            {quantityOptions.map((qty) => (
              <option key={qty} value={qty}>
                Qtd: {qty}
              </option>
            ))}
          </select>

          <span className="text-gray-300">|</span>

          <Button variant="link" onClick={handleRemove} className="text-xs">
            Excluir
          </Button>

          <span className="text-gray-300">|</span>

          <Button variant="link" className="text-xs">
            Salvar para depois
          </Button>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <Price value={subtotal} size="medium" />
      </div>
    </div>
  );
}

/**
 * Memoized CartItem to prevent unnecessary re-renders
 */
export const CartItem = memo(CartItemComponent);
