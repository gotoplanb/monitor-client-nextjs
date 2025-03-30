import { Monitor } from '@/types/monitor';

interface MonitorDetailProps {
  monitor: Monitor;
  history?: Monitor[];
}

const formatTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  return date.toLocaleDateString();
};

const MonitorDetail = ({ monitor, history }: MonitorDetailProps) => {
  const getStateColors = (state: string) => {
    switch (state) {
      case 'Normal':
        return 'bg-success-100 text-success-800 border border-success-200';
      case 'Warning':
        return 'bg-warning-100 text-warning-800 border border-warning-200';
      case 'Error':
        return 'bg-error-100 text-error-800 border border-error-200';
      case 'Missing Data':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      data-testid="monitor-detail"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black mb-2" data-testid="monitor-name">
            {monitor.name}
          </h1>
          <p className="text-gray-800 font-medium">
            Last updated {formatTimeAgo(monitor.timestamp)}
          </p>
          {monitor.message && (
            <p className="mt-2 text-gray-800" data-testid="monitor-message">
              {monitor.message}
            </p>
          )}
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStateColors(monitor.state)}`}
          data-testid="monitor-state"
        >
          {monitor.state}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-black mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {monitor.tags.map(tag => (
              <span
                key={tag}
                className="bg-primary-100 px-3 py-1 rounded-full text-sm font-medium text-primary-800 border border-primary-200"
                data-testid="monitor-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">Details</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
              <dt className="text-sm font-medium text-gray-800">ID</dt>
              <dd className="mt-1 text-base font-semibold text-black" data-testid="monitor-id">
                {monitor.id}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
              <dt className="text-sm font-medium text-gray-800">Last Check</dt>
              <dd className="mt-1 text-base font-semibold text-black">
                {new Date(monitor.timestamp).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">Status History</h2>
          <div className="space-y-2">
            {history?.map(record => (
              <div
                key={record.timestamp}
                className="flex justify-between items-start p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div>
                  <span className="text-gray-800">
                    {new Date(record.timestamp).toLocaleString()}
                  </span>
                  {record.message && (
                    <p className="mt-1 text-gray-800" data-testid="history-message">
                      {record.message}
                    </p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStateColors(record.state)}`}
                >
                  {record.state}
                </span>
              </div>
            ))}
            {!history ||
              (history.length === 0 && <p className="text-gray-600">No history records found</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorDetail;
