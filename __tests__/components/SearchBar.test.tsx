import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';
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

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input', () => {
    render(<SearchBar monitors={mockMonitors} onSearch={mockOnSearch} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('filters monitors by name', () => {
    render(<SearchBar monitors={mockMonitors} onSearch={mockOnSearch} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'Test' } });

    expect(mockOnSearch).toHaveBeenCalledWith([mockMonitors[0]]);
  });

  it('filters monitors by state', () => {
    render(<SearchBar monitors={mockMonitors} onSearch={mockOnSearch} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'Warning' } });

    expect(mockOnSearch).toHaveBeenCalledWith([mockMonitors[1]]);
  });

  it('filters monitors by tag', () => {
    render(<SearchBar monitors={mockMonitors} onSearch={mockOnSearch} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'critical' } });

    expect(mockOnSearch).toHaveBeenCalledWith([mockMonitors[0]]);
  });

  it('performs case-insensitive search', () => {
    render(<SearchBar monitors={mockMonitors} onSearch={mockOnSearch} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'NORMAL' } });

    expect(mockOnSearch).toHaveBeenCalledWith([mockMonitors[0]]);
  });

  it('returns all monitors when search is empty', () => {
    render(<SearchBar monitors={mockMonitors} onSearch={mockOnSearch} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: '' } });

    expect(mockOnSearch).toHaveBeenCalledWith(mockMonitors);
  });

  it('returns empty array when no matches found', () => {
    render(<SearchBar monitors={mockMonitors} onSearch={mockOnSearch} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(mockOnSearch).toHaveBeenCalledWith([]);
  });
});
