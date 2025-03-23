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

  // Function to remove a friend
  const removeFriend = (friendId) => {
    const friend = friends.find(f => f.id === friendId);
    
    if (!friend) return;
    
    // Remove from friends list
    setFriends(friends.filter(f => f.id !== friendId));
    
    alert(`${friend.user.username} has been removed from your friends list`);
  };

  // Render the appropriate content based on the active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'pending':
        return (
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Pending Friend Requests</h2>
            <PendingRequests 
              requests={pendingRequests} 
              onAccept={acceptFriendRequest}
              onReject={rejectFriendRequest}
            />
          </div>
        );
      case 'request':
        return (
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Send Friend Request</h2>
            <FriendRequestForm onSendRequest={sendFriendRequest} />
          </div>
        );
      case 'friends':
      default:
        return (
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">My Friends</h2>
            <FriendsList 
              friends={friends}
              onRemove={removeFriend}
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
    </div>
  );
}


export default ConnectPage;
