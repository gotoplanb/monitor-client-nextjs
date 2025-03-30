export interface Monitor {
  id: number;
  name: string;
  state: 'Normal' | 'Warning' | 'Error' | 'Missing Data';
  timestamp: string;
  tags: string[];
  message?: string;
}
