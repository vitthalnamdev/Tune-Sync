import React from 'react';

function Navbar({ activeTab, setActiveTab, pendingCount }) {
  return (
    <div className="bg-gray-700 px-4 py-3 flex justify-between border-b border-gray-600">
      <div className="flex space-x-1">
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            activeTab === 'friends' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
          }`}
        >
          Friends
        </button>
        
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg transition duration-200 relative ${
            activeTab === 'pending' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
          }`}
        >
          Pending Requests
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </button>
      </div>
      
      <button
        onClick={() => setActiveTab('request')}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
      >
        Add Friend
      </button>
    </div>
  );
}

export default Navbar;