import { useEffect, useState } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { useProductsStore } from './store/productsStore';

export default function Products() {
  const products = useProductsStore((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchInfo, setSearchInfo] = useState<{ term: string; category: string } | null>(null);

  // Listener for search events from Shell
  useEffect(() => {
    const handleSearch = (event: Event) => {
      const customEvent = event as CustomEvent<{ searchTerm: string; category: string }>;
      const { searchTerm, category } = customEvent.detail;

      setSearchInfo({ term: searchTerm, category });

      // Filter products
      const filtered = products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          category === 'Todos' || product.category.toLowerCase() === category.toLowerCase();

        return matchesSearch && matchesCategory;
      });

      setFilteredProducts(filtered);
    };

    const handleClearSearch = () => {
      setSearchInfo(null);
      setFilteredProducts(products);
    };

    window.addEventListener('product:search', handleSearch);
    window.addEventListener('product:search:clear', handleClearSearch);

    return () => {
      window.removeEventListener('product:search', handleSearch);
      window.removeEventListener('product:search:clear', handleClearSearch);
    };
  }, [products]);

  // Reset when there is no search
  useEffect(() => {
    if (!searchInfo) {
      setFilteredProducts(products);
    }
  }, [products, searchInfo]);

  return (
    <div>
      <div className="text-sm text-gray-600 mb-4">
        <span className="hover:text-microshop-link-hover cursor-pointer">Início</span>
        <span className="mx-2">›</span>
        <span className="hover:text-microshop-link-hover cursor-pointer">Categorias</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">
          {searchInfo ? `Resultados para "${searchInfo.term}"` : 'Todos os Produtos'}
        </span>
      </div>

      {/* Title section */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900 mb-1">
          {searchInfo ? `Resultados para "${searchInfo.term}"` : 'Produtos em Destaque'}
        </h1>
        <p className="text-sm text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
          {searchInfo && searchInfo.category !== 'Todos' && ` em ${searchInfo.category}`}
        </p>
      </div>

      {searchInfo && (
        <button
          onClick={() => {
            setSearchInfo(null);
            setFilteredProducts(products);
          }}
          className="mb-4 text-sm text-microshop-link hover:text-microshop-link-hover hover:underline flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Limpar busca
        </button>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-600 mb-4">Tente buscar por outro termo ou categoria</p>
          <button
            onClick={() => {
              setSearchInfo(null);
              setFilteredProducts(products);
            }}
            className="text-microshop-link hover:text-microshop-link-hover hover:underline"
          >
            Ver todos os produtos
          </button>
        </div>
      )}
    </div>
  );
}
