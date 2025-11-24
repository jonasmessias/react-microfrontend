import { FormEvent } from 'react';
import { CATEGORIES } from '../constants';

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
        <button
          type="submit"
          className="bg-microshop-yellow hover:bg-microshop-yellow-hover px-4 py-2 rounded-r transition-colors focus:outline-none focus:ring-2 focus:ring-microshop-orange"
          aria-label="Buscar"
        >
          <svg
            className="w-5 h-5 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {isSearchActive && (
        <div className="mt-2 flex items-center gap-2 text-white">
          <span className="text-xs">
            🔍 <span className="font-semibold">{activeSearchTerm}</span>
            {selectedCategory !== 'Todos' && (
              <span className="text-gray-300"> em {selectedCategory}</span>
            )}
          </span>
          <button
            type="button"
            onClick={onClearSearch}
            className="text-xs text-microshop-yellow-bright hover:text-microshop-yellow hover:underline focus:outline-none transition-colors"
          >
            Limpar ✕
          </button>
        </div>
      )}
    </form>
  );
}
