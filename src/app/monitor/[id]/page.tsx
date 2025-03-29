import { fetchMonitor, fetchMonitorHistory } from '../../../utils/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Make this a dynamic route
export const dynamic = 'force-dynamic';

export default async function MonitorDetailPage({ params, searchParams }: PageProps) {
  try {
    const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
    const id = parseInt(resolvedParams.id, 10);
    const page = parseInt(resolvedSearchParams.page || '1', 10);
    const limit = 10;

    if (isNaN(id)) {
      notFound();
    }

    const [monitor, history] = await Promise.all([
      fetchMonitor(id),
      fetchMonitorHistory(id, page, limit),
    ]);

    if (!monitor) {
      notFound();
    }

    const stateColors = {
      Normal: 'bg-green-100 text-green-800',
      Warning: 'bg-yellow-100 text-yellow-800',
      Error: 'bg-red-100 text-red-800',
    };

    return (
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
          ← Back to monitors
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{monitor.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${stateColors[monitor.state]}`}>
              {monitor.state}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Current Status</h2>
              <p className="text-gray-600">
                Last updated: {new Date(monitor.timestamp).toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Tags</h2>
              <div className="flex gap-2">
                {monitor.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Status History</h2>
              <div className="space-y-2">
                {history?.items?.map(record => (
                  <div
                    key={record.timestamp}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span>{new Date(record.timestamp).toLocaleString()}</span>
                    <span className={`px-2 py-1 rounded text-sm ${stateColors[record.state]}`}>
                      {record.state}
                    </span>
                  </div>
                ))}
              </div>
              {!history?.items ||
                (history.items.length === 0 && (
                  <p className="text-gray-500">No history records found</p>
                ))}
              {page > 1 && (
                <Link
                  href={`/monitor/${id}?page=${page - 1}`}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Previous
                </Link>
              )}
              {history?.items?.length === limit && (
                <Link
                  href={`/monitor/${id}?page=${page + 1}`}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      notFound();
    }
    throw error;
  }
}
