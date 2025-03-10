import { fetchMonitors } from '../utils/api';
import MonitorCard from '../components/MonitorCard';

export default async function HomePage() {
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
}
