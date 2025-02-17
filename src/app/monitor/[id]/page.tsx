import { fetchMonitor } from '../../../utils/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MonitorDetailPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    
    if (isNaN(id)) {
      notFound();
    }

    const monitor = await fetchMonitor(id);

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
              <h2 className="text-lg font-semibold mb-2">Status Details</h2>
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
          </div>
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
} 