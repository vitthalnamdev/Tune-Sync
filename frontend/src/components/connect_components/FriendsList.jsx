import React, { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";

function FriendsList({ friends,onlineUsers, onRemove,openChatBox ,changeChatUser}) {
 
  if (friends.length === 0) {
    return (
      <div className="bg-gray-700 rounded-lg p-8 text-center">
        <p className="text-gray-400 italic">No friends yet</p>
      </div>
    );
  }

  const changeUserChat = (friend)=>{
       changeChatUser(friend)
       openChatBox(true);
  }

  return (
    <div className=" ">
      <ul className="divide-y divide-gray-600">
        {friends.map((friend) => (
          <li
            key={friend._id}
            onClick={()=>changeUserChat(friend)}
            className="p-4 mb-2 cursor-pointer bg-gray-800 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center">
              <div className=" relative flex items-center justify-center mr-3">
                <img className="w-12 h-12 rounded-full" src={friend.image} />
                <span
                 className={`${onlineUsers.includes(friend._id) ? "bg-green-500":"bg-red-500"} w-[15px] h-[15px] border-2 border-[#3a364f] rounded-full absolute bottom-[3px] right-[-3px] `}
                ></span>
              </div>
              <div className="">
                <h3 className="text-white font-medium">{`${friend.firstName} ${friend.lastName}`}</h3>
                <p className="text-gray-400 text-xs"> {friend.Username}</p>
              </div>
            </div>
            {/* <button
              onClick={() => onRemove(friend._id)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Remove
            </button> */}
            <button>
              <PlusIcon color="white"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;
