import { lazy, Suspense } from 'react';
import {
  ErrorBoundary,
  Footer,
  HeaderActions,
  LoadingFallback,
  Logo,
  Navigation,
  SearchBar,
} from './components';
import { useCartCount, useSearch } from './hooks';

// @ts-ignore - Module Federation dynamic import
const Products = lazy(() => import('mfeProducts/Products'));

// @ts-ignore - Module Federation dynamic import
const Cart = lazy(() => import('mfeCart/Cart'));

// @ts-ignore - Module Federation dynamic import to access cart store
const getCartStore = async () => {
  try {
    const { useCartStore } = await import('mfeCart/cartStore');
    return useCartStore;
  } catch {
    return null;
  }
};

function App() {
  const {
    selectedCategory,
    setSelectedCategory,
    isSearchActive,
    activeSearchTerm,
    handleSearch,
    clearSearch,
  } = useSearch();

  const cartItemCount = useCartCount({ getCartStore });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-microshop-dark text-white shadow-md h-[140px] flex flex-col">
        <div className="flex-1 flex items-center justify-between px-4 max-w-[1500px] w-full mx-auto">
          <Logo />
          <SearchBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onSearch={handleSearch}
            isSearchActive={isSearchActive}
            activeSearchTerm={activeSearchTerm}
            onClearSearch={clearSearch}
          />
          <HeaderActions cartItemCount={cartItemCount} />
        </div>
        <Navigation className="bg-microshop-blue" />
      </header>

      <main className="flex-1">
        <div className="max-w-[1500px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            <div className="space-y-4">
              <ErrorBoundary mfeName="Products">
                <Suspense fallback={<LoadingFallback text="Carregando produtos..." />}>
                  <Products />
                </Suspense>
              </ErrorBoundary>
            </div>

            <div className="lg:sticky lg:top-6 self-start">
              <ErrorBoundary mfeName="Cart">
                <Suspense fallback={<LoadingFallback text="Carregando carrinho..." />}>
                  <Cart />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </main>

      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}

export default App;
