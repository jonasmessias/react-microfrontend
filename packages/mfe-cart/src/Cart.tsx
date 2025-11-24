import { useEffect } from 'react';
import { CartItem } from './components/CartItem';
import { CartSummary } from './components/CartSummary';
import { EmptyState } from './components/EmptyState';
import { CartIcon } from './components/Icons';
import { useCartStore } from './store/cartStore';
import { CartAddItemEvent, EventBus } from './utils/eventBus';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    const unsubscribe = EventBus.on<CartAddItemEvent>('cart:add-item', (data) => {
      addItem(data.product, data.quantity);
    });

    return unsubscribe;
  }, [addItem]);

  const handleCheckout = () => {
    alert(
      `🎉 Compra finalizada!\n\nTotal: R$ ${getTotalPrice().toFixed(2)}\nItens: ${getTotalItems()}`
    );
    clearCart();
  };

  const itemCountText = `${getTotalItems()} ${getTotalItems() === 1 ? 'item' : 'itens'}`;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Carrinho de compras</h2>
        <p className="text-sm text-gray-600">{items.length > 0 ? itemCountText : 'Vazio'}</p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<CartIcon />}
          title="Seu carrinho está vazio"
          description="Adicione produtos para começar"
        />
      ) : (
        <>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <CartSummary
            itemCount={getTotalItems()}
            totalPrice={getTotalPrice()}
            onCheckout={handleCheckout}
            onClear={clearCart}
          />
        </>
      )}
    </div>
  );
}
