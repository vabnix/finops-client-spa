'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, Building, MapPin, Globe, Upload } from 'lucide-react'

export default function ClientProfilePage() {
  const [clientData, setClientData] = useState({
    clientId: 'CL-001',
    name: 'Acme Corporation',
    address: '123 Business Ave',
    city: 'Tech City',
    state: 'TC',
    zipCode: '12345',
    country: 'United States',
    primaryContact: {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      phone: '+1 (555) 123-4567'
    },
    secondaryContact: {
      name: 'Jane Smith',
      email: 'jane.smith@acme.com',
      phone: '+1 (555) 987-6543'
    },
    logo: null
  })

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target
    if (section) {
      setClientData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: value }
      }))
    } else {
      setClientData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setClientData(prev => ({ ...prev, logo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updating client profile:', clientData)
  }

  const InputField = ({ icon: Icon, label, name, value, onChange, section = null }) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-gray-500" />
        <span>{label}</span>
      </Label>
      <Input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e, section)}
        className="w-full"
      />
    </div>
  )

  const ContactCard = ({ title, contact, section }) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputField
          icon={User}
          label="Name"
          name="name"
          value={contact.name}
          onChange={handleInputChange}
          section={section}
        />
        <InputField
          icon={Mail}
          label="Email"
          name="email"
          value={contact.email}
          onChange={handleInputChange}
          section={section}
        />
        <InputField
          icon={Phone}
          label="Phone"
          name="phone"
          value={contact.phone}
          onChange={handleInputChange}
          section={section}
        />
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Client Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Update your company's details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={clientData.logo} alt="Company logo" />
                <AvatarFallback>{clientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{clientData.name}</h3>
                <p className="text-sm text-gray-500">Client ID: {clientData.clientId}</p>
                <label className="cursor-pointer mt-2">
                  <Input 
                    type="file" 
                    className="hidden" 
                    onChange={handleLogoUpload} 
                    accept="image/*" 
                  />
                  <span className="text-sm text-blue-600 hover:underline">Upload company logo</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                icon={Building}
                label="Company Name"
                name="name"
                value={clientData.name}
                onChange={handleInputChange}
              />
              <InputField
                icon={MapPin}
                label="Address"
                name="address"
                value={clientData.address}
                onChange={handleInputChange}
              />
              <InputField
                icon={MapPin}
                label="City"
                name="city"
                value={clientData.city}
                onChange={handleInputChange}
              />
              <InputField
                icon={MapPin}
                label="State"
                name="state"
                value={clientData.state}
                onChange={handleInputChange}
              />
              <InputField
                icon={MapPin}
                label="Zip Code"
                name="zipCode"
                value={clientData.zipCode}
                onChange={handleInputChange}
              />
              <InputField
                icon={Globe}
                label="Country"
                name="country"
                value={clientData.country}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactCard title="Primary Contact" contact={clientData.primaryContact} section="primaryContact" />
          <ContactCard title="Secondary Contact" contact={clientData.secondaryContact} section="secondaryContact" />
        </div>

        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </div>
  )
}