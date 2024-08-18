'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, Download } from 'lucide-react'
import Link from 'next/link'

// Mock data for the invoice
const invoiceData = {
  id: 'INV-001',
  date: '2023-08-01',
  dueDate: '2023-08-15',
  clientName: 'Acme Corporation',
  clientAddress: '123 Business Ave, Tech City, TC 12345',
  items: [
    { description: 'Web Development Services', quantity: 1, unitPrice: 5000, total: 5000 },
    { description: 'Hosting (Annual)', quantity: 1, unitPrice: 200, total: 200 },
    { description: 'Domain Registration', quantity: 1, unitPrice: 15, total: 15 },
  ],
  subtotal: 5215,
  tax: 521.50,
  total: 5736.50,
}

export default function InvoicePage() {
  const params = useParams()
  const { id } = params

  // In a real application, you would fetch the invoice data based on the id
  // For now, we'll use the mock data

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <Link href="/billing" className="flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Back to Billing
        </Link>
        <h1 className="text-3xl font-bold">Invoice #{id}</h1>
        <div className="space-x-2">
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
          <CardDescription>Invoice for {invoiceData.clientName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold">Bill To:</h3>
              <p>{invoiceData.clientName}</p>
              <p>{invoiceData.clientAddress}</p>
            </div>
            <div className="text-right">
              <p><span className="font-semibold">Invoice Date:</span> {invoiceData.date}</p>
              <p><span className="font-semibold">Due Date:</span> {invoiceData.dueDate}</p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 text-right">
            <p><span className="font-semibold">Subtotal:</span> ${invoiceData.subtotal.toFixed(2)}</p>
            <p><span className="font-semibold">Tax (10%):</span> ${invoiceData.tax.toFixed(2)}</p>
            <p className="text-xl font-bold mt-2"><span className="font-semibold">Total:</span> ${invoiceData.total.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-gray-500">Thank you for your business!</p>
          <Button>Pay Now</Button>
        </CardFooter>
      </Card>
    </div>
  )
}