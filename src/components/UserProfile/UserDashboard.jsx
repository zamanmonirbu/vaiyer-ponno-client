import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt, FaMapMarkerAlt } from "react-icons/fa"; // Added Location Icon
import AllNavSections from "../AllNavSections";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("userAuth"))?.id;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [lat, setLat] = useState(""); // Latitude state
  const [lng, setLng] = useState(""); // Longitude state
  const [showOrders, setShowOrders] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { userProfile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setEmail(userProfile.email || "");
      setAddress(userProfile.address || "");
      setImageUrl(userProfile.image || "");
      setLat(userProfile.location?.lat || ""); // Set latitude from user profile
      setLng(userProfile.location?.lng || ""); // Set longitude from user profile
    }
  }, [userProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { name, email, address, image: imageUrl, location: { lat, lng } };
    dispatch(updateUserProfile(userId, updatedData, navigate)); // Pass updated location
    setIsEditMode(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "RESET_USER" });
    navigate("/");
  };

  const isOwner = userProfile?._id === userId;

  return (
    <>
      <AllNavSections />
      <div
        className={`flex ${!isOwner && !isEditMode ? "justify-center" : ""}`}
      >
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
                    {isOwner && isEditMode && (
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold">
                          Profile Image URL:
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                      </tr>
                    )}
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
                    {/* Location View and Edit */}
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold flex items-center">
                        <FaMapMarkerAlt className="mr-2" /> Location:
                      </td>
                      <td className="px-4 py-2">
                        {isOwner && isEditMode ? (
                          <>
                            <input
                              type="text"
                              placeholder="Latitude"
                              value={lat}
                              onChange={(e) => setLat(e.target.value)}
                              className="border rounded px-2 py-1 w-full mb-2"
                            />
                            <input
                              type="text"
                              placeholder="Longitude"
                              value={lng}
                              onChange={(e) => setLng(e.target.value)}
                              className="border rounded px-2 py-1 w-full"
                            />
                          </>
                        ) : (
                          lat && lng
                            ? `Lat: ${lat}, Lng: ${lng}`
                            : "No location available"
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
              {isOwner && (
                <div className="text-center mt-6">
                  <button
                    className="text-[#033B4C] px-4 py-2 m-1 rounded border-2 border-[#033B4C] text-lg font-semibold hover:text-white hover:bg-[#033B4C]"
                    onClick={() => setShowOrders(!showOrders)}
                  >
                    {showOrders ? "Hide Order History" : "View Order History"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {isOwner && (
          <div className="w-1/2 bg-gray-50 p-6 rounded-lg shadow-md mx-8">
            {showOrders && (
              <>
                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                {userProfile?.order?.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {userProfile.order.map((order, index) => (
                      <li key={index}>Order ID: {order}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No orders yet.</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
