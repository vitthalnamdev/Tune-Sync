import React from 'react';

function PendingRequests({ requests, onAccept, onReject }) {
  if (requests.length === 0) {
    return (
      <div className="bg-gray-700 rounded-lg p-8 text-center">
        <p className="text-gray-400 italic">No pending friend requests</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-600">
        {requests.map(request => (
          <li key={request.id} className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                <span className="text-lg font-bold">{request.from.username.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-gray-200">{request.from.username}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onAccept(request.id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Accept
              </button>
              <button 
                onClick={() => onReject(request.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingRequests;
