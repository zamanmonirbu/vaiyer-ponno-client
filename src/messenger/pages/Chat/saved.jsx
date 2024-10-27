import { useRef, useState, useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import { createChat, userChats } from "../../api/ChatRequests"; 
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import NewMessage from "../../components/NewMessage/NewMessage";
import { fetchSellerById } from "../../../actions/sellerActions";
import { useParams } from "react-router-dom"; 
import { ClipLoader } from "react-spinners"; // Import the spinner

const Chat = () => {
  const socket = useRef();
  const { userProfile } = useSelector((state) => state.user);
  const { seller, loading, error } = useSelector((state) => state.seller); 
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const dispatch = useDispatch();
  
  const { sellerId } = useParams(); 

  // Fetch chats for the user
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(userProfile._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [userProfile._id]);

  // Fetch seller info using Redux action if sellerId is present in URL
  useEffect(() => {
    if (sellerId) {
      dispatch(fetchSellerById(sellerId)); // Dispatch Redux action to fetch the seller
    }
  }, [sellerId, dispatch]);

// Once seller data is fetched, create a new chat
useEffect(() => {
  const createNewChat = async () => {
    if (seller) {
      try {
        const data = { senderId: userProfile?._id, receiverId: seller?._id }; 
        console.log(data);
        const res = await dispatch(createChat(data)); 
        if (res.status === 200) { // Check if status is 200 (successful response)
          console.log(res.data);
          setCurrentChat(res.data); // Set the current chat if creation is successful
        } 
      } catch (error) {
        console.error("Error creating chat:", error.message);
      }
    }
  };

  createNewChat();
}, [seller, dispatch, userProfile._id]);


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
    <div className="flex flex-col md:flex-row h-screen">
      {loading ? (
        // Display spinner while loading
        <div className="flex justify-center items-center w-full h-screen">
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      ) : error ? (
        // Display error message if there's an error
        <div className="text-red-500 text-center w-full">{error}</div>
      ) : (
        // Display the actual chat content once the seller data is loaded
        <>
          <div className="w-full md:w-1/5 p-4 border-r border-gray-300">
            <NewMessage onNewChat={handleNewChat} existingChats={chats} />
            <h2 className="text-xl font-semibold mt-4">Chats</h2>
            <div className="overflow-y-auto mt-4 h-[calc(100vh-150px)]">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => setCurrentChat(chat)}
                  className="cursor-pointer mb-4 hover:bg-gray-100 p-2 rounded"
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

          <div className="w-full md:w-4/5 p-4">
            <ChatBox
              chat={currentChat}
              currentUser={userProfile._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
