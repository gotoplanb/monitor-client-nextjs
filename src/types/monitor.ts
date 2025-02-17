export interface Monitor {
  name: string;
  state: 'Normal' | 'Warning' | 'Error' | 'Missing Data';
  timestamp: string;
  tags: string[];
} 