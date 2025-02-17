import { Monitor } from '../types/monitor';

const API_BASE_URL = process.env.API_BASE_URL;

// Helper function to extract ID from monitor name
function getMonitorId(monitors: Monitor[], name: string): number | undefined {
  const index = monitors.findIndex(m => m.name === name);
  return index !== -1 ? index + 1 : undefined;
}

export async function fetchMonitors(): Promise<Monitor[]> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL environment variable is not set');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/v1/monitors/statuses/`);
  if (!response.ok) {
    throw new Error('Failed to fetch monitors');
  }
  const monitors = await response.json();
  // Add numeric IDs based on array position
  return monitors.map((monitor, index) => ({
    ...monitor,
    id: index + 1
  }));
}

export async function fetchMonitor(id: number): Promise<Monitor> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL environment variable is not set');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/v1/monitors/${id}/state/`);
  if (!response.ok) {
    throw new Error('Failed to fetch monitor');
  }
  return response.json();
}

export async function fetchMonitorHistory(
  id: number,
  page: number = 1,
  limit: number = 10
): Promise<Monitor[]> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL environment variable is not set');
  }
  
  const skip = (page - 1) * limit;
  const response = await fetch(
    `${API_BASE_URL}/api/v1/monitors/${id}/history/?skip=${skip}&limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch monitor history');
  }
  return response.json();
}