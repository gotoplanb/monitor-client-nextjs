import Link from 'next/link';
import { Monitor } from '@/types/monitor';

interface MonitorCardProps {
  monitor: Monitor;
}

const MonitorCard = ({ monitor }: MonitorCardProps) => {
  // Handling all monitor states including Missing Data
  const getStateColors = (state: string) => {
    switch (state) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Error':
        return 'bg-red-100 text-red-800';
      case 'Missing Data':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link href={`/monitor/${monitor.id}`} className="block" data-testid="monitor-card">
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg" data-testid="monitor-name">
            {monitor.name}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-sm ${getStateColors(monitor.state)}`}
            data-testid="monitor-state"
          >
            {monitor.state}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>Last updated: {new Date(monitor.timestamp).toLocaleString()}</p>
          <div className="mt-1 flex gap-1">
            {monitor.tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                data-testid="monitor-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MonitorCard;
