// Mock data for testing

export const monitors = [
  {
    id: 1,
    name: 'API Server',
    state: 'Normal',
    timestamp: '2023-09-01T12:00:00Z',
    tags: ['api', 'production'],
  },
  {
    id: 2,
    name: 'Database',
    state: 'Warning',
    timestamp: '2023-09-01T11:45:00Z',
    tags: ['database', 'production'],
  },
  {
    id: 3,
    name: 'Frontend',
    state: 'Error',
    timestamp: '2023-09-01T11:30:00Z',
    tags: ['frontend', 'production'],
  },
  {
    id: 4,
    name: 'Background Worker',
    state: 'Missing Data',
    timestamp: '2023-09-01T10:00:00Z',
    tags: ['worker', 'staging'],
  },
];

export const monitorHistory = [
  {
    id: 1,
    state: 'Normal',
    timestamp: '2023-09-01T12:00:00Z',
  },
  {
    id: 1,
    state: 'Warning',
    timestamp: '2023-09-01T11:00:00Z',
  },
  {
    id: 1,
    state: 'Normal',
    timestamp: '2023-09-01T10:00:00Z',
  },
];

// This file is not a test, but we add a dummy test to satisfy Jest
describe('Mocks', () => {
  it('should provide mock data', () => {
    expect(monitors.length).toBe(4);
    expect(monitorHistory.length).toBe(3);
  });
});
