import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userActions";
import { getUserLocation } from "../../actions/locationActions"; // Import location actions
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt, FaMapMarkerAlt } from "react-icons/fa";
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
  const [mobile, setMobile] = useState(""); // Mobile state
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
    dispatch(updateUserProfile(userId, updatedData, navigate));
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
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">
                        <FaMapMarkerAlt
                          className="mr-2 cursor-pointer"
                          onClick={handleLocationClick}
                        />{" "}
                        {/* Location icon */}{" "}
                      </td>
                      <td className="px-4 py-2">
                        {userProfile ? userProfile?.location?.city : "No location"}
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
      </div>
    </>
  );
};

export default UserDashboard;
