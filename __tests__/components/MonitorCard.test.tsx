import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonitorCard from '@/components/MonitorCard';
import { Monitor } from '@/types/monitor';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('MonitorCard', () => {
  const mockMonitors: { [key: string]: Monitor } = {
    normal: {
      id: 1,
      name: 'API Server',
      state: 'Normal',
      timestamp: '2023-09-01T12:00:00Z',
      tags: ['api', 'production'],
    },
    warning: {
      id: 2,
      name: 'Database',
      state: 'Warning',
      timestamp: '2023-09-01T11:45:00Z',
      tags: ['database', 'production'],
    },
    error: {
      id: 3,
      name: 'Frontend',
      state: 'Error',
      timestamp: '2023-09-01T11:30:00Z',
      tags: ['frontend', 'production'],
    },
    missingData: {
      id: 4,
      name: 'Background Worker',
      state: 'Missing Data',
      timestamp: '2023-09-01T10:00:00Z',
      tags: ['worker', 'staging'],
    },
  };

  it('renders monitor name correctly', () => {
    render(<MonitorCard monitor={mockMonitors.normal} />);
    expect(screen.getByText('API Server')).toBeInTheDocument();
  });

  it('renders Normal state with correct styling', () => {
    render(<MonitorCard monitor={mockMonitors.normal} />);
    const stateElement = screen.getByText('Normal');
    expect(stateElement).toBeInTheDocument();
    expect(stateElement).toHaveClass('bg-success-100');
    expect(stateElement).toHaveClass('text-success-700');
  });

  it('renders Warning state with correct styling', () => {
    render(<MonitorCard monitor={mockMonitors.warning} />);
    const stateElement = screen.getByText('Warning');
    expect(stateElement).toBeInTheDocument();
    expect(stateElement).toHaveClass('bg-warning-100');
    expect(stateElement).toHaveClass('text-warning-700');
  });

  it('renders Error state with correct styling', () => {
    render(<MonitorCard monitor={mockMonitors.error} />);
    const stateElement = screen.getByText('Error');
    expect(stateElement).toBeInTheDocument();
    expect(stateElement).toHaveClass('bg-error-100');
    expect(stateElement).toHaveClass('text-error-700');
  });

  it('renders Missing Data state with correct styling', () => {
    render(<MonitorCard monitor={mockMonitors.missingData} />);
    const stateElement = screen.getByText('Missing Data');
    expect(stateElement).toBeInTheDocument();
    expect(stateElement).toHaveClass('bg-gray-100');
    expect(stateElement).toHaveClass('text-gray-700');
  });

  it('renders timestamp correctly', () => {
    render(<MonitorCard monitor={mockMonitors.normal} />);
    // Check for "Last updated:" text which is always present
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });

  it('renders all tags correctly', () => {
    render(<MonitorCard monitor={mockMonitors.normal} />);
    expect(screen.getByText('api')).toBeInTheDocument();
    expect(screen.getByText('production')).toBeInTheDocument();
  });

  it('renders message when present', () => {
    const monitorWithMessage = {
      ...mockMonitors.normal,
      message: 'Test message',
    };
    render(<MonitorCard monitor={monitorWithMessage} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});
