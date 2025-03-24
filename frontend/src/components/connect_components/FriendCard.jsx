import React, { useState } from 'react'
import { accept_friend_request, send_request } from '../../services/operations/friends';
import { UserPlus } from 'lucide-react';
import { GiCheckMark } from "react-icons/gi";

const FriendCard = ({id, friend, setFriendRequests,friendRequests, isPending }) => {
    const token = localStorage.getItem("token");
    const [accepted, setAccepted] = useState([]);

    const handleSendFriendReq = (userId) => {
        send_request(token, userId);
    };

    const handleAcceptReq = async(id) =>{
       try {
          console.log(id);
          const response = await accept_friend_request(token,id);
          setAccepted((prevAccepted) => [...prevAccepted, id]);
          setFriendRequests(friendRequests.filter((f)=>f._id !== id));
          console.log("accepted",accepted)
       } catch (error) {
          console.log( error);
       }
    }

  return (
    <div className="flex items-center justify-between p-3 mb-2 bg-gray-800 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={friend.image}
            alt={friend.firstName}
            className="w-12 h-12 rounded-full bg-gray-700"
          />
        </div>
        <div>
          <h3 className="text-white font-medium">{`${friend.firstName} ${friend.lastName}`}</h3>
          <p className="text-gray-400 text-xs"> {friend.Username}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        {isPending ? (
            accepted.includes(id) ? (
               <div><GiCheckMark/></div>
            ):(
            <>
                <button
                onClick={()=>handleAcceptReq(id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
                Accept
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm">
                Decline
                </button>
            </>
            )
          
        ) : (
          <button
            onClick={() => handleSendFriendReq(friend._id)}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
          >
            <UserPlus size={14} />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default FriendCard