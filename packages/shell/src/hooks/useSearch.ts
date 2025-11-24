import { useCallback, useState } from 'react';
import { EVENT_NAMES } from '../lib/config';

export interface UseSearchReturn {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isSearchActive: boolean;
  activeSearchTerm: string;
  handleSearch: (searchTerm: string) => void;
  clearSearch: () => void;
}

/**
 * Hook to manage search state and emit search events
 */
export function useSearch(): UseSearchReturn {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeSearchTerm, setActiveSearchTerm] = useState('');

  const handleSearch = useCallback(
    (searchTerm: string) => {
      if (!searchTerm.trim()) {
        return;
      }

      const searchEvent = new CustomEvent(EVENT_NAMES.PRODUCT_SEARCH, {
        detail: { searchTerm, category: selectedCategory },
      });
      window.dispatchEvent(searchEvent);

      setIsSearchActive(true);
      setActiveSearchTerm(searchTerm);
    },
    [selectedCategory]
  );

  const clearSearch = useCallback(() => {
    setSelectedCategory('Todos');
    setIsSearchActive(false);
    setActiveSearchTerm('');

    const searchInput = document.querySelector('input[name="search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }

    const clearEvent = new CustomEvent(EVENT_NAMES.PRODUCT_SEARCH_CLEAR);
    window.dispatchEvent(clearEvent);
  }, []);

  return {
    selectedCategory,
    setSelectedCategory,
    isSearchActive,
    activeSearchTerm,
    handleSearch,
    clearSearch,
  };
}
