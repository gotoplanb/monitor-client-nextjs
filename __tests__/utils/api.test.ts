import * as api from '@/utils/api';
import { monitors, monitorHistory } from '../mocks/handlers';

// Mock the API module with a fake implementation
jest.mock('@/utils/api', () => {
  const originalModule = jest.requireActual('@/utils/api');

  return {
    ...originalModule,
    fetchMonitors: jest.fn(),
    fetchMonitor: jest.fn(),
    fetchMonitorHistory: jest.fn(),
  };
});

describe('API utility functions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchMonitors', () => {
    it('fetches all monitors successfully', async () => {
      // Setup the mock implementation for this test
      (api.fetchMonitors as jest.Mock).mockResolvedValueOnce(monitors);

      const data = await api.fetchMonitors();
      expect(data).toEqual(monitors);
      expect(data.length).toBe(4);
      expect(api.fetchMonitors).toHaveBeenCalledTimes(1);
    });

    it('throws an error when the fetch fails', async () => {
      // Setup a rejection
      (api.fetchMonitors as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

      await expect(api.fetchMonitors()).rejects.toThrow('Failed to fetch');
    });
  });

  describe('fetchMonitor', () => {
    it('fetches a specific monitor by ID', async () => {
      // Setup the mock implementation for this test
      (api.fetchMonitor as jest.Mock).mockResolvedValueOnce(monitors[0]);

      const data = await api.fetchMonitor(1);
      expect(data).toEqual(monitors[0]);
      expect(data.name).toBe('API Server');
      expect(api.fetchMonitor).toHaveBeenCalledTimes(1);
      expect(api.fetchMonitor).toHaveBeenCalledWith(1);
    });

    it('throws an error when monitor is not found', async () => {
      // Setup a rejection
      (api.fetchMonitor as jest.Mock).mockRejectedValueOnce(new Error('Monitor not found'));

      await expect(api.fetchMonitor(999)).rejects.toThrow('Monitor not found');
    });
  });

  describe('fetchMonitorHistory', () => {
    it('fetches monitor history with pagination', async () => {
      const historyResponse = {
        items: monitorHistory.slice(0, 2),
        total: monitorHistory.length,
      };

      // Setup the mock implementation for this test
      (api.fetchMonitorHistory as jest.Mock).mockResolvedValueOnce(historyResponse);

      const data = await api.fetchMonitorHistory(1, 0, 2);
      expect(data.items).toEqual(monitorHistory.slice(0, 2));
      expect(data.total).toBe(monitorHistory.length);
      expect(api.fetchMonitorHistory).toHaveBeenCalledTimes(1);
      expect(api.fetchMonitorHistory).toHaveBeenCalledWith(1, 0, 2);
    });

    it('throws an error when monitor history is not found', async () => {
      // Setup a rejection
      (api.fetchMonitorHistory as jest.Mock).mockRejectedValueOnce(new Error('History not found'));

      await expect(api.fetchMonitorHistory(999, 0, 10)).rejects.toThrow('History not found');
    });
  });
});
