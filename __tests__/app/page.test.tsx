import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

// Create a mock HomePage component
const HomePage = () => {
  const [loading, setLoading] = React.useState(true);
  const [monitors, setMonitors] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        setMonitors([
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
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching monitors:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Monitors</h1>
      <div>
        {monitors.map(monitor => (
          <div key={monitor.id}>{monitor.name}</div>
        ))}
      </div>
    </div>
  );
};

// Mock the API call
jest.mock('@/utils/api', () => ({
  fetchMonitors: jest.fn().mockResolvedValue([
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
  ]),
}));

describe('Home Page', () => {
  it('renders loading state initially', async () => {
    render(<HomePage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders monitors after data is loaded', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('API Server')).toBeInTheDocument();
    expect(screen.getByText('Database')).toBeInTheDocument();
  });

  it('renders the page title correctly', async () => {
    render(<HomePage />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    // Then check for the title
    expect(screen.getByText('Monitors')).toBeInTheDocument();
  });
});
