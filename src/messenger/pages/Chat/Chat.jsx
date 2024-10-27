import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import { userChats } from "../../api/ChatRequests";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import NewMessage from "../../components/NewMessage/NewMessage";
import { FaHome } from "react-icons/fa"; // Import the Home icon

const Chat = () => {
  const socket = useRef();
  const { userProfile } = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch chats for the user
  useEffect(() => {
    let isMounted = true;
    const getChats = async () => {
      try {
        const { data } = await userChats(userProfile._id);
        if (isMounted) {
          setChats(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
    return () => {
      isMounted = false;
    };
  }, [userProfile._id]);

  // Socket connection
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", userProfile._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userProfile._id]);

  // Sending messages via socket
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Receiving messages via socket
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setReceivedMessage(data);
    };

    socket.current.on("receive-message", handleReceiveMessage);

    return () => {
      socket.current.off("receive-message", handleReceiveMessage);
    };
  }, []);

  // Check if a chat member is online
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userProfile._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // Handle new chat creation
  const handleNewChat = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-100 rounded-lg mb-10">
      <div className="w-full md:w-1/5 p-4 border-r border-gray-300 shadow-lg">
        <div className="flex items-center mb-4">
          <FaHome
            className="cursor-pointer text-3xl hover:text-gray-600"
            onClick={() => navigate("/")} 
          />
          <NewMessage onNewChat={handleNewChat} existingChats={chats} />
        </div>
       
        <h2 className="text-xl font-semibold mt-4">Chats</h2>
        <div className="overflow-y-auto mt-4 h-[calc(100vh-150px)] shadow-lg rounded-lg">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setCurrentChat(chat)}
              className="cursor-pointer mb-4 hover:bg-gray-100 p-2 rounded shadow-sm"
            >
              <Conversation
                data={chat}
                currentUser={userProfile._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-4/5 p-4 shadow-lg rounded-lg ml-4">
        <ChatBox
          chat={currentChat}
          currentUser={userProfile._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
