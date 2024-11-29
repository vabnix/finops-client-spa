export interface SavingsData {
    savings: number;
    date: string;
    service: 'Compute Engine' | 'Cloud SQL' | 'Cloud Run';
  }
  
  export interface Recommendation {
    id: string;
    savings: number;
    service: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    status: 'active' | 'implemented';
  }