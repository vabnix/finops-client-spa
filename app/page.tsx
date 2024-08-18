'use client'

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Cloud, Server, DollarSign, BarChart2 } from 'lucide-react';

const mockChartData = [
  { month: 'Jan', expenses: 12000 },
  { month: 'Feb', expenses: 15000 },
  { month: 'Mar', expenses: 18000 },
  { month: 'Apr', expenses: 16000 },
  { month: 'May', expenses: 21000 },
  { month: 'Jun', expenses: 19000 },
  { month: 'Jul', expenses: 22000 },
  { month: 'Aug', expenses: 25000 },
  { month: 'Sep', expenses: 23000 },
  { month: 'Oct', expenses: 20000 },
  { month: 'Nov', expenses: 18000 },
  { month: 'Dec', expenses: 24000 },
];

const topServices = [
  { name: 'EC2', usage: '45%' },
  { name: 'S3', usage: '20%' },
  { name: 'RDS', usage: '15%' },
  { name: 'Lambda', usage: '10%' },
  { name: 'CloudFront', usage: '5%' },
];

const AWSMetricCard = ({ icon, title, value, change }) => (
  <div className="bg-white rounded-lg p-4 shadow-md">
    {icon}
    <h3 className="text-gray-500 text-sm mt-2">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
    <p className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
      {change}
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AWSMetricCard 
          icon={<DollarSign className="w-8 h-8 text-blue-500" />}
          title="Current Month's Expenses"
          value="$25,000"
          change="+5.2%"
        />
        <AWSMetricCard 
          icon={<DollarSign className="w-8 h-8 text-green-500" />}
          title="Previous Month's Bill"
          value="$23,500"
          change="-2.1%"
        />
        <AWSMetricCard 
          icon={<DollarSign className="w-8 h-8 text-purple-500" />}
          title="Year-to-Date Expenses"
          value="$216,000"
          change="+8.7%"
        />
        <AWSMetricCard 
          icon={<Server className="w-8 h-8 text-red-500" />}
          title="Total EC2 Servers"
          value="128"
          change="+3"
        />
      </div>
      
      {/* Rest of the component remains the same */}
      
    </div>
  );
}