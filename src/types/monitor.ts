export interface Monitor {
  id?: number; // Used internally for API calls
  name: string;
  state: 'Normal' | 'Warning' | 'Error' | 'Missing Data';
  timestamp: string;
  tags: string[];
}
