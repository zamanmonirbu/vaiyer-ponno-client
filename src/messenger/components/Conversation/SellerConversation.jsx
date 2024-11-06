import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../actions/userActions";

const SellerConversation = ({ data, sellerId, online }) => {
  const [customerData, setCustomerData] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.user);

  // Get the user ID of the chat partner (customer in this case)
  useEffect(() => {
    const id = data.members.find((id) => id !== sellerId); // customer ID in chat
    setCustomerId(id);

    if (id) {
      dispatch(getUserProfile(id));
    }
  }, [sellerId, data.members, dispatch]);

  // Update component state when customer data is fetched
  useEffect(() => {
    if (userProfile && userProfile._id === customerId) {
      setCustomerData(userProfile);
    }
  }, [userProfile, customerId]);

  return (
    <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition duration-150 ease-in-out">
      {/* Online status indicator */}
      {online && <div className="bg-green-400 w-3 h-3 rounded-full mr-2"></div>}
      
      {/* Profile Image */}
      <img
        src={customerData?.img || "https://via.placeholder.com/150"} // Placeholder if no image
        alt="Profile"
        className="rounded-full w-10 h-10 mr-3"
      />
      
      <div className="flex flex-col">
        {/* Customer Name */}
        <span className="text-base font-semibold">{customerData?.name || "Customer"}</span>
        {/* Online/Offline Status */}
        <span className={`text-sm ${online ? "text-green-500" : "text-gray-500"}`}>
          {online ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

// Prop validation
SellerConversation.propTypes = {
  data: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  sellerId: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
};

export default SellerConversation;
