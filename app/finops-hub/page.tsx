'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Info, ChevronRight, AlertCircle, CheckCircle2, Bell } from 'lucide-react'

const potentialSavingsData = [
  { name: 'Savings not specific to a project', value: 2000 },
  { name: 'committed-use-discount-test2', value: 1200 },
  { name: 'committed-use-discount-test1', value: 800 },
];

const topServiceRecommendations = [
  { save: '$337.06', service: 'Compute Engine', description: 'Purchase a 3 year new standard CUD for A2RAM memory' },
  { save: '$202.11', service: 'Compute Engine', description: 'Purchase a 1 year new standard CUD for A2Core CPU' },
  { save: '$127.30', service: 'Cloud SQL', description: 'Purchase a 3 year new Cloud SQL Database VM' },
  { save: '$37.55', service: 'Compute Engine', description: 'Save cost by stopping idle VM "instance-5"' },
  { save: '$37.55', service: 'Compute Engine', description: 'Save cost by stopping idle VM "instance-14"' },
  { save: '$33.97', service: 'Compute Engine', description: 'Save cost by stopping idle VM "instance-16"' },
  { save: '$26.45', service: 'Compute Engine', description: 'Save cost by changing machine type from e2-standard-2 to e2-medium' },
  { save: '$22.46', service: 'Cloud SQL', description: 'Purchase a 3 year new Cloud SQL Database VM' },
  { save: '$18.72', service: 'Cloud SQL', description: 'Purchase a 3 year additional Cloud SQL Database VM' },
  { save: '$14.23', service: 'Compute Engine', description: 'Save cost by changing machine type from e2-medium to e2-small' },
];

const carbonData = [
  { region: 'us-central1', value: 0.35 },
  { region: 'us-west1', value: 0.15 },
  { region: 'us-east1', value: 0.08 },
  { region: 'asia-east1', value: 0.02 },
];

export default function FinOpsHub() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">FinOps hub</h1>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-4">Optimization summary</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">Last month's realized savings</p>
                  <p className="text-2xl font-bold mt-1">$2,071.29</p>
                </div>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">Active recommendations</p>
                  <p className="text-2xl font-bold mt-1">43</p>
                </div>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">Potential savings/month</p>
                  <p className="text-2xl font-bold mt-1">$1,020.97</p>
                </div>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-base font-medium mb-2">Potential savings/month</h3>
              <Tabs defaultValue="services" className="w-full">
                <TabsList className="w-auto">
                  <TabsTrigger value="services" className="px-4">SERVICES</TabsTrigger>
                  <TabsTrigger value="projects" className="px-4">PROJECTS</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={potentialSavingsData} barSize={90}>
                  <XAxis dataKey="name" axisLine={false} />
                  <YAxis axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                  View all recommendations
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-base font-medium mb-4">Top recommendations</h3>
            <div className="bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="text-sm text-gray-500">
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Potential savings/month</th>
                    <th className="text-left py-3 px-4">Service</th>
                    <th className="text-left py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {topServiceRecommendations.map((rec, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 px-4">
                        <span className="text-blue-600">Save {rec.save}</span>
                      </td>
                      <td className="py-2 px-4">{rec.service}</td>
                      <td className="py-2 px-4">{rec.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
              <Bell className="w-6 h-6 text-blue-500" />
              <h3 className="font-medium">High-priority tasks</h3>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">You are all caught up</h4>
                <p className="text-sm text-gray-600">
                  High-priority tasks like expiring CUDs and budget overspends will trigger reminders here.
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium flex items-center gap-2">
                  FinOps score
                  <Info className="h-4 w-4 text-gray-400" />
                </h3>
                <span className="text-2xl font-bold">3.5<span className="text-sm text-gray-500">/5.0</span></span>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Your score</span>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="mb-1">
                    <span className="text-sm text-gray-600">FinOps maturity: Medium</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '70%' }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    You can continue to improve your FinOps practices
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Peer benchmark</span>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="mb-1">
                    <span className="text-sm text-gray-600">FinOps maturity: Not available</span>
                  </div>
                </div>

                <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                  Improve your score
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  Committed Use Discount (CUD) optimization
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last month's realized CUD savings</p>
                  <p className="text-2xl font-bold">$2,071.29</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Optimization rate</p>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-sm mb-1">Your billing account</p>
                      <p className="text-xl font-bold">56%</p>
                    </div>
                    <div>
                      <p className="text-sm mb-1">Peer benchmark</p>
                      <p className="text-xl font-bold">—</p>
                    </div>
                  </div>
                </div>

                <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                  View CUD analysis
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  Carbon footprint
                  <Info className="h-4 w-4 text-gray-400" />
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold">0.43</p>
                <p className="text-sm text-gray-500">tCO₂e</p>
                <p className="text-sm text-green-600 mt-2">-9.22% improvement comparing to June 2024</p>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={carbonData} layout="vertical" margin={{ left: 80 }}>
                  <XAxis type="number" domain={[0, 0.4]} />
                  <YAxis dataKey="region" type="category" />
                  <Bar dataKey="value" fill="#0F766E" />
                </BarChart>
              </ResponsiveContainer>

              <Button variant="link" className="text-blue-600 p-0 h-auto font-normal mt-4">
                View details on carbon dashboard
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}