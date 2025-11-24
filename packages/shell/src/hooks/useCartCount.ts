import { useEffect, useState } from 'react';

interface UseCartCountOptions {
  /**
   * Async function to get the cart store
   */
  getCartStore: () => Promise<any | null>;
}

/**
 * Hook to subscribe to cart item count from remote MFE
 * @param options - Configuration options
 * @returns Current cart item count
 */
export function useCartCount({ getCartStore }: UseCartCountOptions): number {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    getCartStore()
      .then((useCartStore) => {
        if (!useCartStore) {
          return;
        }

        const updateCount = () => {
          const items = useCartStore.getState().items;
          const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
          setCartItemCount(totalItems);
        };

        updateCount();
        unsubscribe = useCartStore.subscribe(updateCount);
      })
      .catch((error) => {
        console.error('[useCartCount] Failed to load cart store:', error);
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [getCartStore]);

  return cartItemCount;
}
