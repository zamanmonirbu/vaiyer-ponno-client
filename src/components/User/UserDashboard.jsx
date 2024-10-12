import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userActions";
import { getUserLocation } from "../../actions/locationActions";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt, FaMapMarkerAlt } from "react-icons/fa";
import { removeCookie, getCookie } from "../../actions/cookieUtils";
import { fetchOrdersByUserId } from "../../actions/orderAction";
import AllNavSections from "../Nav/AllNavSections";


const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [lat, setLat] = useState(""); // Latitude state
  const [lng, setLng] = useState(""); // Longitude state
  const [mobile, setMobile] = useState(""); // Mobile state
  const [isEditMode, setIsEditMode] = useState(false);

  const { userProfile, loading, error } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  console.log(orders);
  const userId = JSON.parse(getCookie("userAuth"))?.id;

  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(fetchOrdersByUserId(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setEmail(userProfile.email || "");
      setAddress(userProfile.address || "");
      setImageUrl(userProfile.image || "");
      setLat(userProfile.location?.lat || "");
      setLng(userProfile.location?.lng || "");
      setMobile(userProfile.mobile || ""); // Set mobile number
    }
  }, [userProfile]);

  // Fetch and set location when the icon is clicked
  const handleLocationClick = () => {
    dispatch(getUserLocation(userProfile?._id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      email,
      address,
      image: imageUrl,
      location: { lat, lng },
      mobile, // Include mobile in the updated data
    };
    const userId = JSON.parse(getCookie("userAuth"))?.id; // Get user ID from cookies for updating profile
    dispatch(updateUserProfile(userId, updatedData, navigate));
    setIsEditMode(false);
  };

  const handleLogout = () => {
    // Clear cookies instead of localStorage
    removeCookie("userAuth");
    removeCookie("authToken"); // Clear auth token as well
    dispatch({ type: "RESET_USER" });
    navigate("/");
  };

  const isOwner = userProfile?._id === userId;

  return (
    <>
      <AllNavSections />
      <div className="flex">
        {/* User Profile Section */}
        <div
          className={`w-1/3 bg-white shadow-md rounded-lg overflow-hidden my-4 p-6 ${
            !isOwner && !isEditMode ? "mx-auto" : ""
          }`}
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="flex items-center justify-center p-4">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={imageUrl || "https://via.placeholder.com/150"}
                  alt={name}
                />
              </div>
              <div className="p-4">
                <h1 className="text-center text-2xl font-bold mb-4">
                  {name} Profile
                </h1>
                <table className="table-auto w-full text-left border">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">
                        <FaMapMarkerAlt
                          className="mr-2 cursor-pointer"
                          onClick={handleLocationClick}
                        />{" "}
                        {/* Location icon */}
                      </td>
                      <td className="px-4 py-2">
                        {userProfile
                          ? userProfile?.location?.city
                          : "No location"}
                      </td>
                    </tr>
                    {/* Name field */}
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Name:</td>
                      <td className="px-4 py-2">
                        {isOwner && isEditMode ? (
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          name
                        )}
                      </td>
                    </tr>
                    {/* Email field */}
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Email:</td>
                      <td className="px-4 py-2">
                        {isOwner && isEditMode ? (
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          email
                        )}
                      </td>
                    </tr>
                    {/* Address field */}
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Address:</td>
                      <td className="px-4 py-2">
                        {isOwner && isEditMode ? (
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          address || "No address available"
                        )}
                      </td>
                    </tr>
                    {/* Mobile field */}
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Mobile:</td>
                      <td className="px-4 py-2">
                        {isOwner && isEditMode ? (
                          <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          userProfile?.mobile || "No mobile number available"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {isOwner && (
                  <div className="text-center mt-6">
                    {isEditMode ? (
                      <button
                        onClick={handleSubmit}
                        className="text-[#033B4C] px-4 py-2 m-1 rounded border-2 border-[#033B4C] text-lg font-semibold hover:text-white hover:bg-[#033B4C]"
                      >
                        Save Changes
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditMode(true)}
                        className="text-[#033B4C] px-4 py-2 m-1 rounded border-2 border-[#033B4C] text-lg font-semibold hover:text-white hover:bg-[#033B4C] flex items-center justify-center"
                      >
                        <FaEdit className="mr-2" /> Edit Profile
                      </button>
                    )}
                  </div>
                )}
                {isOwner && (
                  <div className="text-center mt-6">
                    <button
                      onClick={handleLogout}
                      className="text-[#DC2626] px-4 py-2 m-1 rounded border-2 border-[#DC2626] text-lg font-semibold hover:text-white hover:bg-[#DC2626] flex items-center justify-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Orders Section */}
        <div className="w-2/3 bg-white shadow-md rounded-lg overflow-hidden my-4 p-6">
          <h2 className="text-center text-2xl font-bold mb-4">Your Orders</h2>
          {orders && orders.length > 0 ? (
            <table className="table-auto w-full border border-gray-300 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 text-left px-4 py-2">
                    #
                  </th>
                  {/* Index Column */}
                  <th className="border border-gray-300 text-left px-4 py-2">
                    Order ID
                  </th>
                  <th className="border border-gray-300 text-left px-4 py-2">
                    Transaction ID
                  </th>
                  <th className="border border-gray-300 text-left px-4 py-2">
                    Total Amount
                  </th>
                  <th className="border border-gray-300 text-left px-4 py-2">
                    Shipping Address
                  </th>
                  <th className="border border-gray-300 text-left px-4 py-2">
                    Products
                  </th>
                  <th className="border border-gray-300 text-left px-4 py-2">
                    Ordered Date
                  </th>
                  <th className="border border-gray-300 text-left px-4 py-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    {/* Display index */}
                    <td className="border border-gray-300 px-4 py-2">
                      {order._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.transactionId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.totalAmount} {order.currency}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.customerAddress}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.products.map((p) => (
                        <div key={p.productId}>
                          {p.productName} (Qty: {p.qty}, Price: {p.price})
                        </div>
                      ))}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* Display ordered date */}
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 flex items-center">
                      {order.status ? (
                        <>
                          <svg
                            className="w-5 h-5 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.293-11.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414L10 9.414l-1.293 1.293a1 1 0 01-1.414-1.414l2-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 text-red-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.293-11.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L10 9.414l1.293 1.293a1 1 0 001.414-1.414l-2-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Pending</span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
