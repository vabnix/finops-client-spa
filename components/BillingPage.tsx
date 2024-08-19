'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, DollarSign, MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface CreditCardDisplayProps {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cardType: string;
}

const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({ cardNumber, cardName, expiryDate, cardType }) => {
  const getCardColor = () => {
    switch(cardType.toLowerCase()) {
      case 'visa': return 'bg-blue-500';
      case 'mastercard': return 'bg-green-500';
      case 'amex': return 'bg-gray-500';
      default: return 'bg-purple-500';
    }
  }

  const formatCardNumber = (number: string) => {
    return number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  return (
    <div className={`w-96 h-56 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105 ${getCardColor()}`}>
      <div className="w-full px-8 absolute top-8">
        <div className="flex justify-between">
          <div className="">
            <p className="font-light">Card Number</p>
            <p className="font-medium tracking-widest">{formatCardNumber(cardNumber)}</p>
          </div>
          {cardType === 'visa' && (
            <img className="w-16 h-16" src="/visa-white.png" alt="Visa" />
          )}
          {cardType === 'mastercard' && (
            <div className="flex space-x-1">
              <div className="w-8 h-8 rounded-full bg-red-500 opacity-75"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 opacity-75"></div>
            </div>
          )}
        </div>
        <div className="pt-1">
          <p className="font-light">Card Holder</p>
          <p className="font-medium tracking-wider">{cardName}</p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div>
              <p className="font-light text-xs">Expires</p>
              <p className="font-medium tracking-wider text-sm">{expiryDate}</p>
            </div>
            <MoreVertical className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

const mockInvoices = [
  { id: 'INV-001', date: '2023-07-01', amount: 150.00, status: 'Paid' },
  { id: 'INV-002', date: '2023-08-01', amount: 175.00, status: 'Paid' },
  { id: 'INV-003', date: '2023-09-01', amount: 200.00, status: 'Unpaid' },
]

interface CardDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cardType: string;
}

export default function BillingPage() {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '**** **** **** 1234',
    cardName: 'John Doe',
    expiryDate: '12/25',
    cardType: 'Visa'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the card details to your backend
    console.log('Updating card details:', cardDetails)
  }

  const handleMakePayment = () => {
    // Here you would typically initiate a payment process
    console.log('Initiating payment with card on record')
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Billing Dashboard</h1>

      <Tabs defaultValue="card-details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="card-details">Card Details</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="card-details">
          <Card>
            <CardHeader>
              <CardTitle>Update Card Details</CardTitle>
              <CardDescription>Update your card information here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CreditCardDisplay {...cardDetails} />
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" name="cardNumber" placeholder="**** **** **** ****" onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" name="cardName" placeholder="John Doe" onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardType">Card Type</Label>
                    <Input id="cardType" name="cardType" placeholder="Visa/Mastercard/Amex" onChange={handleInputChange} />
                  </div>
                </div>
                <Button type="submit">Update Card</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View your past and current invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                      <TableCell>
                        <Link href={`/invoice/${invoice.id}`} className="text-blue-600 hover:underline">
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button onClick={handleMakePayment} className="w-full">
                <DollarSign className="mr-2 h-4 w-4" /> Make Payment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}