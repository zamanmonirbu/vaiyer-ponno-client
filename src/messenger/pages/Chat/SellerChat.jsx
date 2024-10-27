// SellerChat.js
import { useEffect, useState, useRef } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
// import Conversation from "../../components/Conversation/Conversation";
import { userChats } from "../../api/ChatRequests"; // API to get chats for the seller
// import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SellerConversation from "../../components/Conversation/SellerConversation";

const SellerChat = ({seller}) => {
  const socket = useRef();
  // const { seller } = useSelector((state) => state.seller);
  const [chats, setChats] = useState([]);
  const [onlineCustomers, setOnlineCustomers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Fetch chats for the seller
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(seller._id);
        setChats(data);
      } catch (error) {
        console.error(error);
      }
    };
    getChats();
  }, [seller._id]);

  // Initialize socket and manage online status
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", seller._id);
    socket.current.on("get-users", (users) => {
      setOnlineCustomers(users);
    });
    return () => {
      socket.current.disconnect();
    };
  }, [seller._id]);

  // Send and receive messages through socket
  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);


  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-100 border-4 rounded-xl">
      <div className="w-full md:w-1/4 p-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold">Customers</h2>
        <div className="overflow-y-auto mt-4 h-[calc(100vh-150px)]">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setCurrentChat(chat)}
              className="cursor-pointer mb-4 hover:bg-gray-100 p-2 rounded"
            >
              <SellerConversation
                data={chat}
                currentUser={seller._id}
                online={onlineCustomers.some((user) => user.userId === chat.members.find((member) => member !== seller._id))}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-3/4 p-4">
        <ChatBox
          chat={currentChat}
          currentUser={seller._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default SellerChat;
