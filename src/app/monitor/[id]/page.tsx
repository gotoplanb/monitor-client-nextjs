import { fetchMonitor, fetchMonitorHistory } from '../../../utils/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: { page?: string };
}

export default async function MonitorDetailPage({ params, searchParams }: PageProps) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const page = parseInt(searchParams.page || '1', 10);
    const limit = 10;
    
    if (isNaN(id)) {
      notFound();
    }

    const [monitor, history] = await Promise.all([
      fetchMonitor(id),
      fetchMonitorHistory(id, page, limit)
    ]);

    const stateColors = {
      Normal: 'bg-green-100 text-green-800',
      Warning: 'bg-yellow-100 text-yellow-800',
      Error: 'bg-red-100 text-red-800',
    };

    return (
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800"
        >
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
                {monitor.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Status History</h2>
              <div className="space-y-2">
                {history.map((record, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded"
                  >
                    <span className={`px-2 py-1 rounded-full text-sm ${stateColors[record.state]}`}>
                      {record.state}
                    </span>
                    <span className="text-sm text-gray-600">
                      {new Date(record.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/monitor/${id}?page=${page - 1}`}
                    className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Previous
                  </Link>
                )}
                {history.length === limit && (
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
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
} 