import { render, screen, fireEvent } from '@testing-library/react';
import MonitorsGrid from '@/components/MonitorsGrid';
import { Monitor } from '@/types/monitor';

const mockMonitors: Monitor[] = [
  {
    id: 1,
    name: 'Test Monitor 1',
    state: 'Normal',
    timestamp: '2024-03-20T10:00:00Z',
    tags: ['production', 'critical'],
  },
  {
    id: 2,
    name: 'Warning Monitor',
    state: 'Warning',
    timestamp: '2024-03-20T10:00:00Z',
    tags: ['staging', 'important'],
  },
  {
    id: 3,
    name: 'Error Monitor',
    state: 'Error',
    timestamp: '2024-03-20T10:00:00Z',
    tags: ['development', 'urgent'],
  },
];

describe('MonitorsGrid', () => {
  it('renders all monitors initially', () => {
    render(<MonitorsGrid initialMonitors={mockMonitors} />);

    // Check if all monitor cards are rendered
    expect(screen.getAllByTestId('monitor-card')).toHaveLength(3);

    // Verify monitor names are present
    expect(screen.getByText('Test Monitor 1')).toBeInTheDocument();
    expect(screen.getByText('Warning Monitor')).toBeInTheDocument();
    expect(screen.getByText('Error Monitor')).toBeInTheDocument();
  });

  it('filters monitors when searching', () => {
    render(<MonitorsGrid initialMonitors={mockMonitors} />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Warning' } });

    // Check if only the warning monitor is shown
    expect(screen.getAllByTestId('monitor-card')).toHaveLength(1);
    expect(screen.getByText('Warning Monitor')).toBeInTheDocument();
  });

  it('shows no monitors when search has no matches', () => {
    render(<MonitorsGrid initialMonitors={mockMonitors} />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    // Check if no monitor cards are rendered
    expect(screen.queryAllByTestId('monitor-card')).toHaveLength(0);
  });

  it('restores all monitors when search is cleared', () => {
    render(<MonitorsGrid initialMonitors={mockMonitors} />);

    const searchInput = screen.getByTestId('search-input');

    // First search for something
    fireEvent.change(searchInput, { target: { value: 'Warning' } });
    expect(screen.getAllByTestId('monitor-card')).toHaveLength(1);

    // Then clear the search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getAllByTestId('monitor-card')).toHaveLength(3);
  });
});
