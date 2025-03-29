import { fetchMonitors } from '../utils/api';
import MonitorCard from '../components/MonitorCard';

// Make this a dynamic route
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  try {
    const monitors = await fetchMonitors();

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">System Monitors</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {monitors.map(monitor => (
            <MonitorCard key={monitor.name} monitor={monitor} />
          ))}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">System Monitors</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Unable to load monitors. Please try again later.</p>
        </div>
      </main>
    );
  }
}
