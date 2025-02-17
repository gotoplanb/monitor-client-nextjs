import Link from 'next/link';
import { Monitor } from '../types/monitor';

interface MonitorCardProps {
  monitor: Monitor;
}

export function MonitorCard({ monitor }: MonitorCardProps) {
  const stateColors = {
    Normal: 'bg-green-100 text-green-800',
    Warning: 'bg-yellow-100 text-yellow-800',
    Error: 'bg-red-100 text-red-800',
  };

  return (
    <Link href={`/monitor/${monitor.id}`} className="block">
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{monitor.name}</h3>
          <span className={`px-2 py-1 rounded-full text-sm ${stateColors[monitor.state]}`}>
            {monitor.state}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>Last updated: {new Date(monitor.timestamp).toLocaleString()}</p>
          <div className="mt-1 flex gap-1">
            {monitor.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
} 