'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Terminal, AlertCircle, Database, Search, Send } from 'lucide-react'

interface ChatMessage {
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function CheckAWS() {
  const [query, setQuery] = useState('')
  const [activeChat, setActiveChat] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)

  const predefinedQueries = [
    "Show my EC2 cost breakdown",
    "List unused resources",
    "Security recommendations",
    "Optimization opportunities",
  ]

  const handleSend = async () => {
    if (!query.trim()) return

    const newMessage: ChatMessage = {
      type: 'user',
      content: query,
      timestamp: new Date()
    }

    setActiveChat(prev => [...prev, newMessage])
    setLoading(true)

    // TODO: Implement actual AWS API call
    setTimeout(() => {
      const response: ChatMessage = {
        type: 'assistant',
        content: 'Here is your AWS analysis...',
        timestamp: new Date()
      }
      setActiveChat(prev => [...prev, response])
      setLoading(false)
      setQuery('')
    }, 1000)
  }

  return (
    <div className="grid grid-cols-4 gap-6 p-6 h-[calc(100vh-4rem)]">
      <div className="col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {predefinedQueries.map((q, i) => (
              <Button 
                key={i} 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => setQuery(q)}
              >
                <Search className="w-4 h-4 mr-2" />
                {q}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                <span>EC2 Instances</span>
              </div>
              <span className="font-medium">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="w-4 h-4 mr-2" />
                <span>RDS Databases</span>
              </div>
              <span className="font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>Alerts</span>
              </div>
              <span className="font-medium text-yellow-600">3</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-3">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>AWS Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="flex-grow overflow-y-auto mb-4 space-y-4">
              {activeChat.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    Analyzing...
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about your AWS infrastructure..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}