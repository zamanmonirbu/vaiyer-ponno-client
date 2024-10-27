// ChatBox.js (Modified for Seller View)
import { useEffect, useState, useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [customerData, setCustomerData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { customer } = useSelector((state) => state.customer);
  const scroll = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Fetch customer data and messages
  useEffect(() => {
    setCustomerData(customer);

    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (chat) fetchMessages();
  }, [chat, customer]);

  // Scroll to the latest message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await addMessage(message);
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {chat ? (
        <>
          <div className="flex items-center p-4 border-b border-gray-300">
            <img src={customerData?.img} alt="Profile" className="rounded-full w-12 h-12 mr-4" />
            <span className="text-lg font-semibold">{customerData?.name}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message._id}
                ref={scroll}
                className={`mb-4 p-2 rounded-lg max-w-xs ${
                  message.senderId === currentUser
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <span>{message.text}</span>
                <span className="block text-xs mt-1">{format(message.createdAt)}</span>
              </div>
            ))}
          </div>

          <div className="p-4 flex items-center border-t border-gray-300">
            <label htmlFor="file-upload" className="mr-4 cursor-pointer">
              <FaPaperclip className="text-gray-600 hover:text-gray-800" />
              <input type="file" id="file-upload" className="hidden" />
            </label>
            <InputEmoji value={newMessage} onChange={handleChange} cleanOnEnter onEnter={handleSend} />
            <button className="ml-4 text-blue-500 hover:text-blue-700" onClick={handleSend}>
              <FaPaperPlane size={24} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">Select a customer to start conversation...</span>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
