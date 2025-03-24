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
          <li key={friend._id} className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center mr-3">
                <img src={friend.image}/>
              </div>
              <div className=''>
                <h3 className="text-white font-medium">{`${friend.firstName} ${friend.lastName}`}</h3>
                <p className="text-gray-400 text-xs"> {friend.Username}</p>
              </div>
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