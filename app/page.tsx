'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const DynamicChart = dynamic(() => import('../components/Chart'), { 
  ssr: false,
  loading: () => <div>Loading chart...</div>
});

const DynamicPieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { 
  ssr: false,
  loading: () => <div>Loading chart...</div>
});

const DynamicPie = dynamic(() => import('recharts').then(mod => mod.Pie), { 
  ssr: false 
});

const DynamicTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { 
  ssr: false 
});

const DynamicCell = dynamic(() => import('recharts').then(mod => mod.Cell), { 
  ssr: false 
});

const mockChartData = [
  { month: 'Jan', expenses: 12000, forecast: 12500 },
  { month: 'Feb', expenses: 15000, forecast: 15200 },
  { month: 'Mar', expenses: 18000, forecast: 18400 },
  { month: 'Apr', expenses: 16000, forecast: 16800 },
  { month: 'May', expenses: 21000, forecast: 21500 },
  { month: 'Jun', expenses: 19000, forecast: 19800 },
  { month: 'Jul', expenses: 22000, forecast: 22500 },
  { month: 'Aug', expenses: 25000, forecast: 25800 },
  { month: 'Sep', expenses: 23000, forecast: 23900 },
  { month: 'Oct', expenses: 20000, forecast: 21000 },
  { month: 'Nov', expenses: 18000, forecast: 19200 },
  { month: 'Dec', expenses: 24000, forecast: 25000 },
];

const costByServiceData = [
  { name: 'EC2', value: 45, color: '#0088FE' },
  { name: 'S3', value: 20, color: '#00C49F' },
  { name: 'RDS', value: 15, color: '#FFBB28' },
  { name: 'Lambda', value: 10, color: '#FF8042' },
  { name: 'CloudFront', value: 5, color: '#8884D8' },
];

const savingsOpportunities = [
  {
    title: "EC2 Reserved Instances",
    potential: "$12,500",
    description: "Convert On-Demand instances to Reserved Instances",
    severity: "high"
  },
  {
    title: "Unused EBS Volumes",
    potential: "$2,300",
    description: "Delete or snapshot unused EBS volumes",
    severity: "medium"
  },
  {
    title: "S3 Lifecycle Policies",
    potential: "$1,800",
    description: "Implement lifecycle policies for infrequently accessed data",
    severity: "low"
  }
];

interface AWSMetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  description?: string;
}

const AWSMetricCard: React.FC<AWSMetricCardProps> = ({ 
  icon, 
  title, 
  value, 
  change,
  description 
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-2">
        <p className={`text-xs ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => (
  <div className="flex space-x-2">
    {[
      { label: '7D', value: '7d' },
      { label: '30D', value: '30d' },
      { label: '90D', value: '90d' },
      { label: '12M', value: '1y' },
    ].map((range) => (
      <Button
        key={range.value}
        variant={selectedRange === range.value ? "default" : "outline"}
        size="sm"
        onClick={() => onRangeChange(range.value)}
      >
        {range.label}
      </Button>
    ))}
  </div>
);

const SavingsOpportunityCard = ({ opportunity }) => (
  <Card className="bg-white border-l-4 border-blue-500">
    <CardContent className="pt-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{opportunity.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{opportunity.description}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">{opportunity.potential}</p>
          <p className="text-xs text-muted-foreground">Potential savings</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CostByServiceChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={costByServiceData}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
        label={({name, value}) => `${name} (${value}%)`}
      >
        {costByServiceData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${value}%`} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [timeRange, setTimeRange] = useState('30d')
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AWS Cost Management</h1>
        <div className="flex items-center space-x-4">
          <TimeRangeSelector
            selectedRange={timeRange}
            onRangeChange={setTimeRange}
          />
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>
      
      {/* Rest of the components remain the same */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AWSMetricCard 
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          title="Month-to-Date Spend"
          value="$25,000"
          change="+5.2% from last month"
          description="Projected: $32,000"
        />
        <AWSMetricCard 
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          title="Daily Average"
          value="$834"
          change="+2.1% from last week"
        />
        <AWSMetricCard 
          icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
          title="Cost Anomalies"
          value="3"
          change="+2 new"
          description="Requires attention"
        />
        <AWSMetricCard 
          icon={<PieChart className="h-4 w-4 text-green-500" />}
          title="Savings Identified"
          value="$16,600"
          change="+$2,400 available"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Cost Trend & Forecast</CardTitle>
                <CardDescription>Monthly spend with forecasted values</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DynamicChart data={mockChartData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cost by Service</CardTitle>
            <CardDescription>Top services by spend</CardDescription>
          </CardHeader>
          <CardContent>
            <CostByServiceChart />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Savings Opportunities</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-500">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {savingsOpportunities.map((opportunity, index) => (
              <SavingsOpportunityCard key={index} opportunity={opportunity} />
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Resource Optimization</CardTitle>
            <CardDescription>Instance and storage recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Reserved Instance Coverage</p>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
                <span className="text-lg font-bold">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Storage Utilization</p>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
                <span className="text-lg font-bold">82%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Compute Optimization</p>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <span className="text-lg font-bold">45%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}