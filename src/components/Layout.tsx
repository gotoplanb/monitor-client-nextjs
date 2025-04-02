import { Monitor } from '@/types/monitor';
import { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  monitors: Monitor[];
  onFilterChange: (search: string, selectedTags: string[]) => void;
}

export default function Layout({ children, monitors, onFilterChange }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Extract unique tags from monitors
  useEffect(() => {
    const tags = new Set<string>();
    monitors.forEach(monitor => {
      monitor.tags.forEach(tag => tags.add(tag));
    });
    setAllTags(Array.from(tags).sort());
  }, [monitors]);

  // Handle search and tag selection changes
  useEffect(() => {
    onFilterChange(searchQuery, selectedTags);
  }, [searchQuery, selectedTags, onFilterChange]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search monitors..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Tags */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Tags</h2>
          <div className="space-y-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tag}
                <span className="float-right">
                  {monitors.filter(m => m.tags.includes(tag)).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
