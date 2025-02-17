import { Monitor } from '../types/monitor';

const API_BASE_URL = process.env.API_BASE_URL;

export async function fetchMonitors(): Promise<Monitor[]> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL environment variable is not set');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/v1/monitors/statuses/`);
  if (!response.ok) {
    throw new Error('Failed to fetch monitors');
  }
  return response.json();
}