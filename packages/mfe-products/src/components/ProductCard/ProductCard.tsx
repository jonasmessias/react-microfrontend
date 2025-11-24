import { memo, useMemo } from 'react';
import { EVENT_NAMES, RATING_CONFIG } from '../../lib/config';
import { Product } from '../../types/product';
import { CartAddItemEvent, EventBus } from '../../utils/eventBus';
import { Button } from '../Button';
import { Price } from '../Price';
import { Rating } from '../Rating';

interface ProductCardProps {
  product: Product;
}

const generateMockRating = () => ({
  value: parseFloat(
    (Math.random() * (RATING_CONFIG.MAX - RATING_CONFIG.MIN) + RATING_CONFIG.MIN).toFixed(1)
  ),
  reviews: Math.floor(Math.random() * 5000) + 100,
});

const shouldShowPrimeBadge = () => Math.random() > 0.5;
const shouldShowDiscount = () => Math.random() > 0.6;

function ProductCardComponent({ product }: ProductCardProps) {
  const rating = useMemo(generateMockRating, []);
  const hasPrime = useMemo(shouldShowPrimeBadge, []);
  const hasDiscount = useMemo(shouldShowDiscount, []);

  const handleAddToCart = () => {
    EventBus.emit<CartAddItemEvent>(EVENT_NAMES.CART_ADD_ITEM, {
      product,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden group cursor-pointer h-full flex flex-col">
      <div className="relative bg-white p-4 flex items-center justify-center h-[220px] flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 rounded"
        />
        {hasPrime && (
          <div className="absolute top-2 left-2 bg-[#00a8e1] text-white text-xs font-bold px-2 py-1 rounded">
            sale
          </div>
        )}
      </div>

      <div className="p-4 pt-2 flex flex-col flex-1">
        <div className="text-xs text-gray-600 mb-1">{product.category}</div>

        <h3 className="text-sm font-normal text-gray-900 mb-2 line-clamp-2 hover:text-microshop-link-hover transition-colors">
          {product.name}
        </h3>

        <div className="mb-2">
          <Rating rating={rating.value} reviewCount={rating.reviews} />
        </div>

        <div className="mb-3">
          <Price value={product.price} />
          <div className="h-4 text-xs text-gray-600">
            {hasDiscount && (
              <>
                Economize: <span className="text-microshop-link-hover">R$ 50,00 (20%)</span>
              </>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-700 mb-3">
          <span className="font-bold">Frete GRÁTIS</span>
        </div>

        <div className="mt-auto">
          <Button onClick={handleAddToCart} fullWidth>
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Memoized ProductCard to prevent unnecessary re-renders
 */
export const ProductCard = memo(ProductCardComponent);
