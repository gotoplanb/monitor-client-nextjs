import { fetchMonitor, fetchMonitorHistory } from '../../../utils/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MonitorDetail from '../../../components/MonitorDetail';

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
    const skip = (page - 1) * limit;

    if (isNaN(id)) {
      notFound();
    }

    const [monitor, history] = await Promise.all([
      fetchMonitor(id),
      fetchMonitorHistory(id, skip, limit),
    ]);

    if (!monitor) {
      notFound();
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center mb-6 text-primary-600 hover:text-primary-800"
        >
          ← Back to monitors
        </Link>

        <MonitorDetail monitor={monitor} history={history} />

        {history?.length === limit && (
          <div className="mt-6 flex gap-2">
            {page > 1 && (
              <Link
                href={`/monitor/${id}?page=${page - 1}`}
                className="px-4 py-2 bg-primary-100 rounded hover:bg-primary-200 text-primary-800"
              >
                Previous
              </Link>
            )}
            <Link
              href={`/monitor/${id}?page=${page + 1}`}
              className="px-4 py-2 bg-primary-100 rounded hover:bg-primary-200 text-primary-800"
            >
              Next
            </Link>
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error fetching monitor:', error);
    notFound();
  }
}
