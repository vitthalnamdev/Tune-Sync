import React, { useState,useEffect } from "react";
import FriendsList from "./FriendsList";
import { X, Users } from "lucide-react";
import {
  
  get_friends_list,
  
  remove_friend,
  
} from "../../services/operations/friends";

const MyFriendButton = () => {
  // Function to remove a friend
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  // Fetch friends
  const token = localStorage.getItem("token");

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await get_friends_list(token);
        console.log("list", response);
        setFriends(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [isOpen]);

  
  const removeFriend = (friendId) => {
    const friend = friends.find((f) => f._id === friendId);
    if (!friend) return;

    // Remove from friends list
    setFriends(friends.filter((f) => f._id !== friendId));
    remove_friend(token, friendId);
  };

  return (
    <div className=" relative z-50">
      <button
        onClick={toggleSidebar}
        className={`fixed ${
          isOpen ? "hidden" : "block"
        } group z-10 right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-transform`}
      >
        {!isOpen && <Users size={24} />}
        <div
          className={`absolute text-white text-sm pointer-events-none border-[1px] border-white px-2 bg-black bg-opacity-50  opacity-0 ${
            !isOpen ? "group-hover:opacity-80" : ""
          }  transition-opacity duration-700 right-16 top-0`}
        >
          Connect Friend
        </div>
      </button>

      {/* Friend Connect Sidebar */}
      <div
        className={`fixed top-20 border border-gray-600 rounded-md right-2  h-[620px] w-[360px] bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-3 w-full mx-auto">
          <div className=" flex border-b border-gray-700 mb-4 justify-between items-start">
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              My Friends
            </h2>
            <button
              onClick={closeSidebar}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <FriendsList friends={friends} onRemove={removeFriend} />
        </div>
      </div>
    </div>
  );
};

export default MyFriendButton;
