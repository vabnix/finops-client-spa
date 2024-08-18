'use client'

import React, { useState } from 'react';
import { User, Mail, Phone, Building, Upload } from 'lucide-react';

export default function Profile() {
    const [clientData, setClientData] = useState({
        clientId: 'CL-001',
        name: 'Acme Corporation',
        address: '123 Business Ave, Tech City, TC 12345',
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
      });

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setClientData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: value }
      }));
    } else {
      setClientData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientData(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const InputField = ({ icon, label, name, value, onChange, type = 'text' }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Client Profile</h1>
      
      <div className="mb-6">
        <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full overflow-hidden mb-4">
          {clientData.logo ? (
            <img src={clientData.logo} alt="Company Logo" className="w-full h-full object-cover" />
          ) : (
            <Building className="w-16 h-16 text-gray-400" />
          )}
        </div>
        <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Upload className="w-5 h-5 mr-2" />
          Upload Logo
          <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={<User className="h-5 w-5 text-gray-400" />}
          label="Client ID"
          name="clientId"
          value={clientData.clientId}
          onChange={handleInputChange}
        />
        <InputField
          icon={<Building className="h-5 w-5 text-gray-400" />}
          label="Client Name"
          name="name"
          value={clientData.name}
          onChange={handleInputChange}
        />
      </div>

      <InputField
        icon={<Building className="h-5 w-5 text-gray-400" />}
        label="Client Address"
        name="address"
        value={clientData.address}
        onChange={handleInputChange}
      />

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Primary Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={<User className="h-5 w-5 text-gray-400" />}
          label="Name"
          name="name"
          value={clientData.primaryContact.name}
          onChange={(e) => handleInputChange(e, 'primaryContact')}
        />
        <InputField
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          label="Email"
          name="email"
          type="email"
          value={clientData.primaryContact.email}
          onChange={(e) => handleInputChange(e, 'primaryContact')}
        />
        <InputField
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          label="Phone"
          name="phone"
          value={clientData.primaryContact.phone}
          onChange={(e) => handleInputChange(e, 'primaryContact')}
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Secondary Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={<User className="h-5 w-5 text-gray-400" />}
          label="Name"
          name="name"
          value={clientData.secondaryContact.name}
          onChange={(e) => handleInputChange(e, 'secondaryContact')}
        />
        <InputField
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          label="Email"
          name="email"
          type="email"
          value={clientData.secondaryContact.email}
          onChange={(e) => handleInputChange(e, 'secondaryContact')}
        />
        <InputField
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          label="Phone"
          name="phone"
          value={clientData.secondaryContact.phone}
          onChange={(e) => handleInputChange(e, 'secondaryContact')}
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}