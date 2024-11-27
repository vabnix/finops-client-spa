import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ChartProps {
  data: {
    month: string;
    expenses: number;
    forecast: number;
  }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis 
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip 
          formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="expenses" 
          stroke="#2563eb" 
          strokeWidth={2}
          name="Actual Spend"
        />
        <Line 
          type="monotone" 
          dataKey="forecast" 
          stroke="#9333ea" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Forecast"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;