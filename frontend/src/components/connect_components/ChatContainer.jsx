import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { sendMessage, getMessages, checkLastOnline } from "../../services/operations/messages";

import { useSocket } from "../../pages/contexts/SocketContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const ChatContainer = ({ currentChat, currentUser,closeChatBox }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastOnline,setLastOnline] = useState();
  const socket = useSocket();

  useEffect(() => {
    if (socket && currentChat) {
      socket.emit("check-online", currentChat._id);

      socket.on("user-online-status", ({ userId, isOnline }) => {
        if (userId === currentChat._id) {
          setIsOnline(isOnline);
        }
      });

      socket.on("user-online", (userId) => {
        if (userId === currentChat._id) {
          setIsOnline(true);
        }
      });

      socket.on("user-offline", (userId) => {
        if (userId === currentChat._id) {
          setIsOnline(false);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("user-online-status");
        socket.off("user-online");
        socket.off("user-offline");
      }
    };
  }, [currentChat, socket]);

  const handleSendMsg = async (msg) => {
    socket.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });

    const response = await sendMessage({
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
     console.log("send message",response);

    setMessages([...messages, { fromSelf: true, message: msg }]);
  };

  useEffect(() => {
      const fatch = async()=>{
        const response = checkLastOnline({userId: currentChat._id});
      }
  },[isOnline]);

  useEffect(() => {
    const fetchMessages = async () => {
        console.log( currentUser._id, currentChat._id);
      const response = await getMessages({
        from: currentUser._id,
        to: currentChat._id,
      });
      console.log("messages",response);
      if (response.data) setMessages(response.data);
    };
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format the timestamp using dayjs
  const formattedTime = dayjs(currentChat.lastOnline).fromNow();

  return (
    <div className="grid grid-rows-[10%_80%_10%] gap-1 h-full overflow-hidden md:grid-rows-[15%_70%_15%]">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <div
           onClick={()=>closeChatBox(false)}
          ><IoMdArrowRoundBack color="white" size={25}/></div>
          <div>
            <img
              src={currentChat.image}
              alt=""
              className="h-12 rounded-full"
            />
          </div>
          <div>
            <h3 className="text-white text-lg">{currentChat.firstName} {currentChat.lastName}</h3>
            <span className={`${isOnline ? "text-green-500" : "text-red-500"} text-sm`}>
              {isOnline ? "Online" : formattedTime}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-auto text-white scrollbar-thin scrollbar-thumb-gray-500">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={scrollRef}
            className={`flex ${
              message.fromSelf ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[40%] px-2 py-1 text-base rounded-lg ${
                message.fromSelf ? "bg-blue-600" : "bg-purple-600"
              }`}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
