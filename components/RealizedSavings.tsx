import { Card, CardContent } from "@/components/ui/card"
import { SavingsData } from "@/types/finops";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function RealizedSavings({ data }: { data: SavingsData[] }) {
  const chartData = data.reduce((acc, curr) => {
    const existingEntry = acc.find(entry => entry.date === curr.date);
    if (existingEntry) {
      existingEntry.total += curr.savings;
    } else {
      acc.push({ date: curr.date, total: curr.savings });
    }
    return acc;
  }, [] as { date: string; total: number }[]);

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium mb-4">Last month's realized savings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}