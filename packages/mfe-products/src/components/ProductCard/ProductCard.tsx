import { memo } from 'react';
import { EVENT_NAMES, RATING_CONFIG } from '../../constants';
import { Product } from '../../types/product';
import { CartAddItemEvent, EventBus } from '../../utils/eventBus';
import { splitPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

function ProductCardComponent({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    EventBus.emit<CartAddItemEvent>(EVENT_NAMES.CART_ADD_ITEM, {
      product,
      quantity: 1,
    });
  };

  const { integer: priceInt, decimal: priceDec } = splitPrice(product.price);

  // Mock rating (Amazon style)
  const rating = (
    Math.random() * (RATING_CONFIG.MAX - RATING_CONFIG.MIN) +
    RATING_CONFIG.MIN
  ).toFixed(1);
  const reviews = Math.floor(Math.random() * 5000) + 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden group cursor-pointer h-full flex flex-col">
      <div className="relative bg-white p-4 flex items-center justify-center h-[220px] flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {/* Prime Badge (opcional) */}
        {Math.random() > 0.5 && (
          <div className="absolute top-2 left-2 bg-[#00a8e1] text-white text-xs font-bold px-2 py-1 rounded">
            prime
          </div>
        )}
      </div>

      <div className="p-4 pt-2 flex flex-col flex-1">
        <div className="text-xs text-gray-600 mb-1">{product.category}</div>

        <h3 className="text-sm font-normal text-gray-900 mb-2 line-clamp-2 hover:text-microshop-link-hover transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(parseFloat(rating)) ? 'text-[#ffa541]' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-microshop-link hover:text-microshop-link-hover">
            {rating}
          </span>
          <span className="text-xs text-gray-600">({reviews.toLocaleString()})</span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline">
            <span className="text-xs align-super text-gray-700 mr-1">R$</span>
            <span className="text-2xl font-normal text-gray-900">{priceInt}</span>
            <span className="text-xs text-gray-700">,{priceDec}</span>
          </div>
          <div className="h-4 text-xs text-gray-600">
            {Math.random() > 0.6 && (
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
          <button
            onClick={handleAddToCart}
            className="w-full bg-microshop-yellow-bright hover:bg-microshop-yellow-bright-hover text-gray-900 text-sm font-medium py-2 px-4 rounded-lg border border-microshop-yellow-bright-border shadow-sm transition-colors duration-150 active:bg-microshop-yellow-bright-active"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Memoized ProductCard to prevent unnecessary re-renders
 */
export const ProductCard = memo(ProductCardComponent);
