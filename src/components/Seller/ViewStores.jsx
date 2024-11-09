import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores } from "../../actions/sellerActions"; // Import the action to fetch stores

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "react-toastify/dist/ReactToastify.css";

const ViewStores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch loading, error, stores data from Redux
  const { stores, loading, error } = useSelector((state) => state.seller);

  // Fetch stores on component mount
  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  useEffect(() => {
    if (!error && stores.length > 0) {
      toast.success("Stores loaded successfully!", { autoClose: 2000 });
    }
  }, [stores, error]); // Only show success toast when stores are fetched successfully

  // Handle click on a store card
  const handleStoreClick = (storeId, name) => {
    navigate(`/seller/store/${storeId}/${name}`); // Navigate to specific store route
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <ToastContainer /> {/* Toastify Container for notifications */}
      <h2 className="text-2xl font-semibold mb-6">View Stores</h2>
      {loading ? (
        <p className="text-gray-500">Loading stores...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {stores && stores.length > 0 ? (
            stores.map((store) => (
              <button
                key={store.id}
                onClick={() => handleStoreClick(store._id, store.name)} // Call handleStoreClick on click
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start hover:bg-gray-50 transition hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-[#3b4d66] text-center">
                  {store.name}
                </h3>
                <p className="text-gray-600 mt-2">{store.description}</p>
                <p className="text-gray-500 mt-2">Address: {store.address}</p>
                <p className="text-gray-500 mt-2">Phone: {store.phone}</p>
                {store?.products.length > 0 ? (
                  <p className="text-gray-500 mt-2">
                    Total Products: {store.products.length}
                  </p>
                ) : (
                  "No product in this store"
                )}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No stores available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewStores;
