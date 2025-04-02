import { fetchMonitors } from '../utils/api';
import MonitorsGrid from '../components/MonitorsGrid';

// Make this a dynamic route
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  try {
    const monitors = await fetchMonitors();

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">System Monitors</h1>
        <MonitorsGrid initialMonitors={monitors} />
      </main>
    );
  } catch (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">System Monitors</h1>
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded">
          <p>Unable to load monitors. Please try again later.</p>
        </div>
      </main>
    );
  }
}
