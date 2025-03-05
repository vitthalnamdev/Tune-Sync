import React, { useState } from 'react'

const Search = () => {
  const [query , setQuery] = useState("") 
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
     <div className="p-10 max-w-md bg-gray-800">
    <input
      type="text"
      placeholder="Search..."
      className="w-full p-2 border rounded-lg shadow-sm bg-gray-900 focus:outline-none focus:ring-2 "
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
   </div>
  </div>
  )
}

export default Search