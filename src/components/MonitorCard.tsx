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
        return 'bg-success-100 text-success-700 border border-success-200';
      case 'Warning':
        return 'bg-warning-100 text-warning-700 border border-warning-200';
      case 'Error':
        return 'bg-error-100 text-error-700 border border-error-200';
      case 'Missing Data':
        return 'bg-gray-100 text-gray-700 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <Link href={`/monitor/${monitor.id}`} className="block" data-testid="monitor-card">
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg text-gray-900" data-testid="monitor-name">
            {monitor.name}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStateColors(monitor.state)}`}
            data-testid="monitor-state"
          >
            {monitor.state}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>Last updated: {new Date(monitor.timestamp).toLocaleString()}</p>
          {monitor.message && (
            <p className="mt-1 text-gray-800 font-medium" data-testid="monitor-message">
              {monitor.message}
            </p>
          )}
          <div className="mt-1 flex gap-1">
            {monitor.tags.map(tag => (
              <span
                key={tag}
                className="bg-primary-100 px-2 py-1 rounded-full text-xs text-primary-700 border border-primary-200"
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
