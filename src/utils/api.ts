import { Monitor } from '../types/monitor';

export async function fetchMonitors(): Promise<Monitor[]> {
  const response = await fetch('http://localhost:8000/api/v1/monitors/statuses/');
  if (!response.ok) {
    throw new Error('Failed to fetch monitors');
  }
  return response.json();
}