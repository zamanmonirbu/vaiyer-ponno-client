import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerById } from "../../../actions/sellerActions";

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  const seller = useSelector((state) => state.seller.seller);

  // Get the user ID of the chat partner
  useEffect(() => {
    const id = data.members.find((id) => id !== currentUser);
    setUserId(id);

    if (id) {
      dispatch(fetchSellerById(id));
    }
  }, [currentUser, data.members, dispatch]);

  // Set user data when seller changes
  useEffect(() => {
    if (seller && seller._id === userId) {
      setUserData(seller);
    }
  }, [seller, userId]);

  return (
    <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition duration-150 ease-in-out">
      {/* Online status indicator */}
      {online && <div className="bg-green-400 w-3 h-3 rounded-full mr-2"></div>}
      {/* Profile Image */}
      <img
        src={userData?.img || "https://via.placeholder.com/150"} // Fallback image
        alt="Profile"
        className="rounded-full w-10 h-10 mr-3"
      />
      <div className="flex flex-col">
        {/* User Name */}
        <span className="text-base font-semibold">{userData?.name || "Unknown User"}</span>
        {/* Online/Offline Status */}
        <span className={`text-sm ${online ? "text-green-500" : "text-gray-500"}`}>
          {online ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default Conversation;
