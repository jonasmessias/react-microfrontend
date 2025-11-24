import { useEffect, useState } from 'react';
import { Button } from './components/Button';
import { EmptyState } from './components/EmptyState';
import { CloseIcon, SearchIcon } from './components/Icons';
import { ProductGrid } from './components/ProductGrid';
import { useProductsStore } from './store/productsStore';

export default function Products() {
  const products = useProductsStore((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchInfo, setSearchInfo] = useState<{ term: string; category: string } | null>(null);

  useEffect(() => {
    const handleSearch = (event: Event) => {
      const customEvent = event as CustomEvent<{ searchTerm: string; category: string }>;
      const { searchTerm, category } = customEvent.detail;

      setSearchInfo({ term: searchTerm, category });

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

  useEffect(() => {
    if (!searchInfo) {
      setFilteredProducts(products);
    }
  }, [products, searchInfo]);

  const clearSearch = () => {
    setSearchInfo(null);
    setFilteredProducts(products);
  };

  const renderResultsCount = () => {
    const count = filteredProducts.length;
    const resultText = count === 1 ? 'resultado' : 'resultados';
    const categoryText =
      searchInfo && searchInfo.category !== 'Todos' ? ` em ${searchInfo.category}` : '';

    return `${count} ${resultText}${categoryText}`;
  };

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

      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900 mb-1">
          {searchInfo ? `Resultados para "${searchInfo.term}"` : 'Produtos em Destaque'}
        </h1>
        <p className="text-sm text-gray-600">{renderResultsCount()}</p>
      </div>

      {searchInfo && (
        <Button
          variant="link"
          onClick={clearSearch}
          className="mb-4 text-sm flex items-center gap-1"
        >
          <div className="w-4 h-4">
            <CloseIcon />
          </div>
          Limpar busca
        </Button>
      )}

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <EmptyState
          icon={<SearchIcon />}
          title="Nenhum produto encontrado"
          description="Tente buscar por outro termo ou categoria"
          actionLabel="Ver todos os produtos"
          onAction={clearSearch}
        />
      )}
    </div>
  );
}
