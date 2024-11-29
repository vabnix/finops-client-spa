import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recommendation } from "@/types/finops";
import { ArrowDown } from 'lucide-react'

export function TopRecommendations({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center text-blue-600 mb-2">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span className="font-medium">Save ${rec.savings.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {rec.priority}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}