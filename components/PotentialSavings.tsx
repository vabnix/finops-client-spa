import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function PotentialSavings() {
  const data = [
    { name: 'Savings not specific to a project', value: 450 },
    { name: 'committed-use-discount-test2', value: 320 },
    { name: 'committed-use-discount-test1', value: 250 }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium mb-4">Potential savings/month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => `$${value}`}
            />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}