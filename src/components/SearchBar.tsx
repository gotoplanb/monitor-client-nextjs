'use client';

import { useState, useEffect, useCallback } from 'react';
import { Monitor } from '@/types/monitor';

interface SearchBarProps {
  monitors: Monitor[];
  onSearch: (filteredMonitors: Monitor[]) => void;
}

const SearchBar = ({ monitors, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      const filteredMonitors = monitors.filter(monitor => {
        const searchLower = query.toLowerCase();
        return (
          monitor.name.toLowerCase().includes(searchLower) ||
          monitor.state.toLowerCase().includes(searchLower) ||
          monitor.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      });
      onSearch(filteredMonitors);
    },
    [monitors, onSearch]
  );

  // Trigger initial search when component mounts
  useEffect(() => {
    handleSearch('');
  }, [handleSearch]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by name, tag, or status..."
        value={searchQuery}
        onChange={e => handleSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        data-testid="search-input"
      />
    </div>
  );
};

export default SearchBar;
