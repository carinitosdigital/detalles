import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="mb-10 md:mb-16 max-w-3xl mx-auto">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-5">
          <svg className="h-7 w-7 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Buscar tazas, peluches, joyería..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-14 pr-5 py-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-fuchsia focus:border-transparent text-xl"
        />
      </div>
    </div>
  );
};

export default SearchBar;