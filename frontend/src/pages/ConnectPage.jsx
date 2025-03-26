import React, { useState } from 'react';
import FriendRequestForm from '../components/connect_components/FriendRequestForm';
import PendingRequests from '../components/connect_components/PendingRequests';
import FriendsList from '../components/connect_components/FriendsList';

import Navbar from '../components/connect_components/Navbar';

function ConnectPage() {
  // Mock user data - would come from API in a real application
  const mockUsers = [
    { id: 1, username: 'alex123' },
    { id: 2, username: 'taylor_smith' },
    { id: 3, username: 'jordan42' },
    { id: 4, username: 'casey_j' }
  ];
  
  const currentUser = { id: 5, username: 'currentUser' };
  
  // State for pending requests and friends
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, from: mockUsers[0], to: currentUser, status: 'pending' },
    { id: 2, from: mockUsers[1], to: currentUser, status: 'pending' }
  ]);
  
  const [friends, setFriends] = useState([
    { id: 1, user: mockUsers[2] },
    { id: 2, user: mockUsers[3] }
  ]);

  // State for active tab
  const [activeTab, setActiveTab] = useState('friends'); // 'friends', 'pending', 'request'

  // Function to send a friend request
  const sendFriendRequest = (username) => {
    // Check if user exists
    const user = mockUsers.find(user => user.username === username);
    
    if (!user) {
      alert('User not found');
      return false;
    }
    
    // Check if already friends
    const alreadyFriend = friends.some(friend => friend.user.username === username);
    
    if (alreadyFriend) {
      alert('You are already friends with this user');
      return false;
    }
    
    // Check if request is already pending
    const requestPending = pendingRequests.some(
      req => (req.from.username === username && req.to.username === currentUser.username) || 
            (req.from.username === currentUser.username && req.to.username === username)
    );
    
    if (requestPending) {
      alert('A friend request is already pending with this user');
      return false;
    }
    
    // In a real app, this would send an API request
    alert(`Friend request sent to ${username}`);
    setActiveTab('friends'); // Go back to friends list after sending request
    return true;
  };

  // Function to accept a friend request
  const acceptFriendRequest = (requestId) => {
    const request = pendingRequests.find(req => req.id === requestId);
    
    if (!request) return;
    
    // Add to friends list
    const newFriend = {
      id: Date.now(), // Simple way to generate unique ID
      user: request.from
    };
    
    setFriends([...friends, newFriend]);
    
    // Remove from pending requests
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    
    alert(`You are now friends with ${request.from.username}`);
  };

  // Function to reject a friend request
  const rejectFriendRequest = (requestId) => {
    const request = pendingRequests.find(req => req.id === requestId);
    
    if (!request) return;
    
    // Remove from pending requests
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    
    alert(`Friend request from ${request.from.username} rejected`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black w-full text-white">
      {/* Main Content */}

      <div className="flex flex-col max-w-[1400px] m-auto  h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Connect Friends
          </h2>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full bg-gray-800 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center py-8 text-purple-400">Friend Connection System</h1>
        
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full">
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            pendingCount={pendingRequests.length}
          />
          
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
    </div>
  );
};

export default ConnectPage;
