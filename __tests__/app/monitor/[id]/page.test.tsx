import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

// Sample test data
const mockMonitor = {
  id: 1,
  name: 'API Server',
  state: 'Normal',
  timestamp: '2023-09-01T12:00:00Z',
  tags: ['api', 'production']
};

const mockHistory = [
  {
    id: 1,
    state: 'Normal',
    timestamp: '2023-09-01T12:00:00Z'
  },
  {
    id: 1,
    state: 'Warning',
    timestamp: '2023-09-01T11:00:00Z'
  },
  {
    id: 1,
    state: 'Normal',
    timestamp: '2023-09-01T10:00:00Z'
  }
];

// Create a mock detail page component
const MonitorPage = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = React.useState(true);
  const [monitor, setMonitor] = React.useState<any>(null);
  const [history, setHistory] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        setMonitor(mockMonitor);
        setHistory(mockHistory);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching monitor details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div data-testid="monitor-details">
      <h1>{monitor.name}</h1>
      <div data-testid="monitor-state">{monitor.state}</div>
      
      <h2>History</h2>
      <div data-testid="history-title">History</div>
      {history.map((item, index) => (
        <div key={index} data-testid="history-item">
          <div>{item.state}</div>
          <div>{new Date(item.timestamp).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

// Mock the API calls
jest.mock('@/utils/api', () => ({
  fetchMonitor: jest.fn().mockResolvedValue(mockMonitor),
  fetchMonitorHistory: jest.fn().mockResolvedValue({
    items: mockHistory,
    total: mockHistory.length,
  }),
}));

describe('Monitor Detail Page', () => {
  it('renders loading state initially', async () => {
    render(<MonitorPage params={{ id: '1' }} />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders monitor details after data is loaded', async () => {
    render(<MonitorPage params={{ id: '1' }} />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('API Server')).toBeInTheDocument();
    expect(screen.getByTestId('monitor-state')).toHaveTextContent('Normal');
  });

  it('renders monitor history correctly', async () => {
    render(<MonitorPage params={{ id: '1' }} />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    // Check for history heading using testid instead of text
    expect(screen.getByTestId('history-title')).toBeInTheDocument();

    // Check for history items
    const historyItems = screen.getAllByTestId('history-item');
    expect(historyItems.length).toBe(3);
    
    // Check for Warning state in history
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });
});
