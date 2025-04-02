'use client';

import { useState } from 'react';
import { Monitor } from '@/types/monitor';
import MonitorCard from './MonitorCard';
import SearchBar from './SearchBar';

interface MonitorsGridProps {
  initialMonitors: Monitor[];
}

const MonitorsGrid = ({ initialMonitors }: MonitorsGridProps) => {
  const [filteredMonitors, setFilteredMonitors] = useState(initialMonitors);

  return (
    <>
      <SearchBar monitors={initialMonitors} onSearch={setFilteredMonitors} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="monitors-grid">
        {filteredMonitors.map(monitor => (
          <MonitorCard key={monitor.name} monitor={monitor} />
        ))}
      </div>
    </>
  );
};

export default MonitorsGrid;
