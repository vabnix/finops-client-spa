'use client'

import { useState } from 'react'

export default function CheckAWS() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')

  const handleSearch = async () => {
    // TODO: Implement AWS Bedrock or Lex API call
    setResult('AWS response will appear here')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check My AWS</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your AWS query"
          className="flex-grow p-2 border rounded"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow">{result}</div>
    </div>
  )
}