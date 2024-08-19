'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { Cloud, Server, DollarSign, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/app/services/api'

// Dynamically import the Chart component with ssr option set to false
const DynamicChart = dynamic(() => import('../components/Chart'), { ssr: false });

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

interface AWSMetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  color: string;
}

const AWSMetricCard: React.FC<AWSMetricCardProps> = ({ icon, title, value, change, color }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </p>
    </CardContent>
  </Card>
);

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      console.log('Checking authentication...')
      const token = localStorage.getItem('token')
      if (!token) {
        console.log('No token found, redirecting to login')
        router.push('/login')
        return
      }

      try {
        console.log('Token found, fetching user data')
        const response = await getCurrentUser()
        console.log('User data received:', response.data)
        setUser(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        localStorage.removeItem('token')
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AWSMetricCard 
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          title="Current Month's Expenses"
          value="$25,000"
          change="+5.2%"
          color="green"
        />
        <AWSMetricCard 
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          title="Previous Month's Bill"
          value="$23,500"
          change="-2.1%"
          color="red"
        />
        <AWSMetricCard 
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          title="Year-to-Date Expenses"
          value="$216,000"
          change="+8.7%"
          color="green"
        />
        <AWSMetricCard 
          icon={<Server className="h-4 w-4 text-muted-foreground" />}
          title="Total EC2 Servers"
          value="128"
          change="+3"
          color="green"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Forecasted Monthly AWS Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <DynamicChart data={mockChartData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Utilized AWS Services</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{service.name}</span>
                  <span className="text-blue-500 font-semibold">{service.usage}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Instance Type Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Reserved</p>
                <p className="text-xl font-bold text-green-500">35%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">On-Demand</p>
                <p className="text-xl font-bold text-blue-500">45%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Savings Plan</p>
                <p className="text-xl font-bold text-purple-500">20%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Storage Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">S3</p>
                <p className="text-xl font-bold text-blue-500">500 TB</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">EBS</p>
                <p className="text-xl font-bold text-green-500">200 TB</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Glacier</p>
                <p className="text-xl font-bold text-purple-500">1 PB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}