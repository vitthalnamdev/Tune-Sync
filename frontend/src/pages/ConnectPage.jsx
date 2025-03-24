import React, { useEffect, useState } from "react";

import FriendsList from "../components/connect_components/FriendsList";
import { X, UserPlus, Users, Bell, Search } from "lucide-react";
import FriendCard from "../components/connect_components/FriendCard";
import {
  accept_friend_request,
  get_friends_list,
  get_pedding_request,
  search_friend,
  send_request,
} from "../services/operations/friends";

const FriendConnectSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("suggested");
  const [searchQuery, setSearchQuery] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [suggestedFriends, setSuggestedFriend] = useState([]);

  const mockUsers = [
    { id: 1, username: "alex123" },
    { id: 2, username: "taylor_smith" },
    { id: 3, username: "jordan42" },
    { id: 4, username: "casey_j" },
  ];

  const currentUser = { id: 5, username: "currentUser" };

  // State for pending requests and friends
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, from: mockUsers[0], to: currentUser, status: "pending" },
    { id: 2, from: mockUsers[1], to: currentUser, status: "pending" },
  ]);

  const [friends, setFriends] = useState([]);

  //fetch friends
  useEffect(()=>{
     const fetch = async()=>{
       try {
        const response = await get_friends_list(token);
        console.log("list",response);
          setFriends(response);
       } catch (error) {
          console.log(error);
       }
     }
     fetch();
  },[friendRequests]);

  // Function to remove a friend
  const removeFriend = (friendId) => {
    const friend = friends.find((f) => f.id === friendId);

    if (!friend) return;

    // Remove from friends list
    setFriends(friends.filter((f) => f.id !== friendId));
    
    alert(`${friend.user.username} has been removed from your friends list`);
  };

 

  const token = localStorage.getItem("token");
  useEffect(() => {
    const search = async () => {
      const response = await search_friend(token, searchQuery);
      console.log("response-friend", response);
      setSuggestedFriend(response.data);
      
    };
    search();
  }, [searchQuery]);

  useEffect(() => {
    const search = async () => {
      const response = await get_pedding_request(token);
      console.log("pedding req",response);
      setFriendRequests(response);
      
    };
    search();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


 

  return (
    <div className="relative min-h-screen bg-gray-900 w-[1080px] text-white">
      {/* Main content - would contain your game or app content */}
      <div className="p-6">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            My Friends
          </h2>
          <FriendsList friends={friends} onRemove={removeFriend} />
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="fixed z-10 right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-l-md shadow-lg"
        >
          {isOpen ? <X size={20} /> : <Users size={20} />}
        </button>
      </div>

      {/* Friend Connect Sidebar */}
      <div
        className={`fixed top-20 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold">Connect Friends</h2>
            <button
              onClick={closeSidebar}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search friends..."
                className="w-full bg-gray-800 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "suggested"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => handleTabChange("suggested")}
            >
              <div className="flex items-center justify-center space-x-2">
                <UserPlus size={18} />
                <span>Suggested</span>
              </div>
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "requests"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => handleTabChange("requests")}
            >
              <div className="flex items-center justify-center space-x-2">
                <Bell size={18} />
                <span>Requests</span>
                <span className="bg-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {friendRequests.length}
                </span>
              </div>
            </button>
          </div>

          {/* Friend List */}
          <div className="flex-1 overflow-y-auto p-4">
            {
              activeTab === "suggested" ? (
                  suggestedFriends.length > 0 ? (
                  suggestedFriends.map((friend) => (
                    <FriendCard
                      key={friend._id}
                      friend={friend}
                      isPending={activeTab === "requests"}
                    />
                  ))
                  ) : (
                  <div className="text-center text-gray-500 mt-10">
                    {searchQuery
                      ? "No friends match your search"
                      : `No ${activeTab} available`}
                  </div>
                )
              ):(
                friendRequests.length > 0 ? (
                friendRequests.map((friend) => (
                  <FriendCard
                    key={friend._id}
                    id = {friend._id}
                    friend={friend.sender}
                    setFriendRequests
                    friendRequests
                    isPending={activeTab === "requests"}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  {searchQuery
                    ? "No friends match your search"
                    : `No ${activeTab} available`}
                </div>
              )
              )
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendConnectSidebar;
