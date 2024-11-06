// UserDashboard.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userActions";
import { getUserLocation } from "../../actions/locationActions";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt, FaMapMarkerAlt, FaImage } from "react-icons/fa";
import { removeCookie, getCookie } from "../../actions/cookieUtils";
import { fetchOrdersByUserId } from "../../actions/orderAction";
import { uploadImageToImgBB } from "../../actions/imageService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import the icons

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [mobile, setMobile] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const { userProfile, loading, error } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);

  const userAuthCookie = getCookie("userAuth");
  const userId = userAuthCookie ? JSON.parse(userAuthCookie)?.id : null;

  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(fetchOrdersByUserId(userId));
  }, [dispatch, userId]);

useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      setEmail(userProfile.email || "");
      setAddress(userProfile.address || "");
      setImageUrl(userProfile.img || "");
      setLat(userProfile.location?.lat || "");
      setLng(userProfile.location?.lng || "");
      setMobile(userProfile.mobile || "");
    }
  }, [userProfile]);

  const handleLocationClick = () => {
    dispatch(getUserLocation(userProfile?._id));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a 9-digit random number
      const randomNineDigitNumber = Math.floor(100000000 + Math.random() * 900000000);
  
      // Construct a new image name with the random number and original file name
      const newImageName = `${randomNineDigitNumber}-${file.name}`;
  
      // Upload image with new image name
      const uploadedUrl = await uploadImageToImgBB(file, newImageName);
      if (uploadedUrl) setImageUrl(uploadedUrl);
      else alert("Image upload failed. Please try again.");
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      firstName,
      lastName,
      email,
      address,
      img: imageUrl,
      location: { lat, lng },
      mobile,
    };
    dispatch(updateUserProfile(userId, updatedData, navigate));
    setIsEditMode(false);
  };

  const handleLogout = () => {
    removeCookie("userAuth");
    removeCookie("authToken");
    dispatch({ type: "RESET_USER" });
    navigate("/");
  };

  return (
    <div className="flex">
      <div className="max-w-md bg-gray-100 shadow-xl rounded-lg overflow-hidden my-4 p-6">
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
                alt={firstName}
              />
            </div>
            <div className="p-4">
              <h1 className="text-center text-2xl font-bold mb-4">
                {firstName} Profile
              </h1>
              <table className="table-auto w-full text-left border">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold">
                      <FaMapMarkerAlt
                        className="mr-2 cursor-pointer"
                        onClick={handleLocationClick}
                      />{" "}
                    </td>
                    <td className="px-4 py-2">
                      {userProfile
                        ? userProfile?.location?.city
                        : "No location"}
                    </td>
                  </tr>
                  {/* First Name field */}
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold">First Name:</td>
                    <td className="px-4 py-2">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        firstName
                      )}
                    </td>
                  </tr>

                  {/* Last Name field */}
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold">Last Name:</td>
                    <td className="px-4 py-2">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        lastName
                      )}
                    </td>
                  </tr>

                  {/* Image Upload field */}
                  <tr className="border-b">
                    {isEditMode ? (
                      <>
                        <td className="px-4 py-2 font-semibold">Image:</td>
                        <td className="px-4 py-2 flex items-center">
                          <label className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100">
                            <FaImage
                              className="mr-2"
                              size={20}
                              color="#3498db"
                            />
                            <span className="text-sm font-semibold">
                              Choose Image
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </td>
                      </>
                    ) : null}
                  </tr>

                  {/* Email field */}
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold">Email:</td>
                    <td className="px-4 py-2">
                      {isEditMode ? (
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
                      {isEditMode ? (
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
                      {isEditMode ? (
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

              <div className="flex justify-between items-center mt-6">
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
                <button
                  onClick={handleLogout}
                  className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white font-semibold px-4 py-2 rounded flex items-center"
                >
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Orders List */}
      <div className="w-full mx-4 my-4">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Order Date</th>{" "}
              {/* New column for Order Date */}
              <th className="border px-4 py-2">Products</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Unit Price</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order.tran_id}</td>
                  <td className="border px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {/* Display formatted Order Date */}
                  </td>
                  <td className="border px-4 py-2">
                    {order.products.map((product, index) => (
                      <div key={index}>{product.productName}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {order.products.map((product, index) => (
                      <div key={index}>{product.qty}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {order.products.map((product, index) => (
                      <div key={index}>{product.price}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">{order.totalAmount}</td>

                  <td className="border px-4 py-2">
                    {order.status ? (
                      <span className="text-green-500 flex items-center">
                        <FaCheckCircle className="mr-1" /> Completed
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center">
                        <FaTimesCircle className="mr-1" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2" colSpan="7">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
