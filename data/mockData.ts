import { Recommendation, SavingsData } from "@/types/finops";

export const mockSavingsData: SavingsData[] = [
    { savings: 1200, date: '2024-01', service: 'Compute Engine' },
    { savings: 800, date: '2024-01', service: 'Cloud SQL' },
    { savings: 400, date: '2024-01', service: 'Cloud Run' },
    { savings: 1400, date: '2024-02', service: 'Compute Engine' },
    { savings: 900, date: '2024-02', service: 'Cloud SQL' },
    { savings: 500, date: '2024-02', service: 'Cloud Run' },
  ];
  
  export const mockRecommendations: Recommendation[] = [
    {
      id: 'rec1',
      savings: 337.06,
      service: 'Compute Engine',
      description: 'Purchase a 3 year new standard CUD for A2RAM memory',
      priority: 'high',
      status: 'active'
    },
    {
      id: 'rec2',
      savings: 202.11,
      service: 'Compute Engine',
      description: 'Purchase a 1 year new standard CUD for A2Core CPU',
      priority: 'high',
      status: 'active'
    },
    {
      id: 'rec3',
      savings: 127.30,
      service: 'Cloud SQL',
      description: 'Purchase a 3 year new Cloud SQL Database VM',
      priority: 'medium',
      status: 'active'
    },
    {
      id: 'rec4',
      savings: 37.55,
      service: 'Compute Engine',
      description: 'Save cost by stopping idle VM "instance-5"',
      priority: 'low',
      status: 'active'
    },
    {
      id: 'rec5',
      savings: 37.55,
      service: 'Compute Engine',
      description: 'Save cost by stopping idle VM "instance-14"',
      priority: 'low',
      status: 'active'
    }
  ];