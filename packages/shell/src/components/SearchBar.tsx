import { FormEvent } from 'react';
import { CATEGORIES } from '../constants';
import { Button } from './Button';
import { SearchIcon } from './Icons';

export interface SearchBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (searchTerm: string) => void;
  isSearchActive: boolean;
  activeSearchTerm: string;
  onClearSearch: () => void;
}

export function SearchBar({
  selectedCategory,
  onCategoryChange,
  onSearch,
  isSearchActive,
  activeSearchTerm,
  onClearSearch,
}: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;

    if (searchTerm?.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const searchInfo =
    selectedCategory !== 'Todos'
      ? `${activeSearchTerm} em ${selectedCategory}`
      : activeSearchTerm;

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-3xl mx-4">
      <div className="flex">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-gray-200 text-gray-800 px-3 py-2 rounded-l border-r-2 border-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-microshop-orange focus:ring-offset-2 focus:ring-offset-microshop-dark"
        >
          {CATEGORIES.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <input
          type="text"
          name="search"
          placeholder="Buscar produtos"
          className="flex-1 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-microshop-orange"
        />
        <Button
          type="submit"
          className="rounded-l-none px-4"
          aria-label="Buscar"
        >
          <SearchIcon className="w-5 h-5" />
        </Button>
      </div>

      {isSearchActive && (
        <div className="mt-2 flex items-center gap-2 text-white">
          <span className="text-xs">
            🔍 <span className="font-semibold">{searchInfo}</span>
          </span>
          <Button
            type="button"
            onClick={onClearSearch}
            variant="link"
            className="text-xs"
          >
            Limpar ✕
          </Button>
        </div>
      )}
    </form>
  );
}
