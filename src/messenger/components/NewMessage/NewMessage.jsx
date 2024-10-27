import { useState } from 'react';
import './NewMessage.css';
import newChat from '../../img/conversation.png';
import { useDispatch, useSelector } from 'react-redux';
import { searchByName, clearSearch } from '../../../actions/searchActions';
import { createChat } from '../../api/ChatRequests';

const NewMessage = ({ onNewChat }) => {
  const [query, setQuery] = useState('');
  const { userProfile } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.search); 
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  // Handle search action
  const handleSearch = async () => {
    if (query.trim()) {
      await dispatch(searchByName(query));
    }
  };

  // Handle clicking on a user to create a new chat
  const handleUserClick = async (receiverId) => {
    try {
      const senderId = userProfile._id;
      const data = { senderId, receiverId };
      const res = await dispatch(createChat(data)); 
      if (res.status === 200) {
        onNewChat(res.data);  // Callback to add the new chat to the list
        setQuery('');
        setErrorMessage('');
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMessage('User is already in your chat list');
      }
    }
  };
  

  // Clear search and error on input reset
  const handleHideError = () => {
    setQuery('');
    setErrorMessage('');
    dispatch(clearSearch());
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full max-w-xs">
        <input
          type="text"
          placeholder="New Chat"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-none outline-none px-2"
        />
        <div className="cursor-pointer" onClick={handleSearch}>
          <img src={newChat} alt="newMessage" className="w-8 h-8 ml-2" />
        </div>
      </div>

      {errorMessage && (
        <div className="mt-2 text-red-500 text-sm" onClick={handleHideError}>
          {errorMessage}
        </div>
      )}

      {/* Search Results */}
      {query && (
        <div className="mt-2 w-full max-w-xs">
          {users.length > 0 ? (
            <div className="bg-white border border-gray-300 rounded-lg shadow-md">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => handleUserClick(user._id)}
                >
                  <img src={user.img} alt="profile" className="rounded-full w-10 h-10 mr-3" />
                  <span className="text-gray-800">{user.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2 text-center text-red-500">No User Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewMessage;
