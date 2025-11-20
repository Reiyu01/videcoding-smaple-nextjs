'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface ProductFilterProps {
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (search: string) => void;
}

export function ProductFilter({ onCategoryChange, onSearchChange }: ProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'ALL', name: '全部', label: '全部商品' },
    { id: 'DRINK', name: '飲料', label: '飲料' },
    { id: 'MAIN', name: '主食', label: '主食' },
    { id: 'SIDE', name: '配菜', label: '配菜' },
  ];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
    setShowFilters(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="搜尋商品..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all active:scale-95 flex items-center gap-2"
        >
          <Filter size={20} />
          篩選
        </button>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all active:scale-95 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
