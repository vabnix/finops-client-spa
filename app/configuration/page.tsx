'use client'

import { useState } from 'react'

export default function Configuration() {
  const [awsKey, setAwsKey] = useState('')
  const [awsSecret, setAwsSecret] = useState('')

  const handleSave = () => {
    // TODO: Implement secure storage of AWS credentials
    console.log('AWS credentials saved')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configuration</h1>
      <div className="space-y-4">
        <input
          type="text"
          value={awsKey}
          onChange={(e) => setAwsKey(e.target.value)}
          placeholder="AWS Access Key"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={awsSecret}
          onChange={(e) => setAwsSecret(e.target.value)}
          placeholder="AWS Secret Key"
          className="w-full p-2 border rounded"
        />
        <button 
          onClick={handleSave}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Configuration
        </button>
      </div>
    </div>
  )
}