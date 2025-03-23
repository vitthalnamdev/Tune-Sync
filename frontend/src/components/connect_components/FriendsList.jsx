import React from 'react';

function FriendsList({ friends, onRemove }) {
  if (friends.length === 0) {
    return (
      <div className="bg-gray-700 rounded-lg p-8 text-center">
        <p className="text-gray-400 italic">No friends yet</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-600">
        {friends.map(friend => (
          <li key={friend.id} className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                <span className="text-lg font-bold">{friend.user.username.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-gray-200">{friend.user.username}</span>
            </div>
            <button 
              onClick={() => onRemove(friend.id)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;