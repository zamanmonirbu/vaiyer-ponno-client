import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSeller,
  fetchSellerById,
  fetchSellers,
  updateSeller,
} from "../../actions/sellerActions";

const SellerManager = () => {
  const dispatch = useDispatch();
  const { sellers, seller, loading, error } = useSelector(
    (state) => state.seller
  );

  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerImg, setSellerImg] = useState("");

  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);

  useEffect(() => {
    if (seller) {
      setSellerName(seller.name);
      setSellerEmail(seller.email);
      setSellerImg(seller.img);
    }
  }, [seller]);

  const handleView = (id) => {
    dispatch(fetchSellerById(id));
    setSelectedSellerId(id);
    setUpdateMode(false);
  };

  const handleUpdate = () => {
    const updatedSeller = {
      name: sellerName,
      email: sellerEmail,
      img: sellerImg,
    };
    dispatch(updateSeller(selectedSellerId, updatedSeller));
    setUpdateMode(false);
  };

  const handleDeactivate = (id) => {
    const updatedSeller = {
      isSeller: false,
    };
    dispatch(updateSeller(id, updatedSeller));
  };

  const handleActivate = (id) => {
    const updatedSeller = {
      isSeller: true,
    };
    dispatch(updateSeller(id, updatedSeller));
  };

  const handleDelete = (id) => {
    dispatch(deleteSeller(id));
    setSelectedSellerId(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Seller Manager</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-2 border border-gray-300">#</th>
              <th className="p-2 border border-gray-300">Image</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller._id} className="border-b border-gray-300">
                <td className="p-2 border border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <img
                    src={seller.img}
                    alt={seller.name}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {seller.name}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {seller.email}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    onClick={() => handleView(seller._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(seller._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                  {seller.isSeller ? (
                    <button
                      onClick={() => handleDeactivate(seller._id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(seller._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSellerId && (
        <div className="mt-6">
          {updateMode ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Update Seller</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={sellerImg}
                  onChange={(e) => setSellerImg(e.target.value)}
                />
              </div>
              <div className="flex">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setUpdateMode(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Seller Details</h2>
              <img
                src={sellerImg}
                alt={sellerName}
                className="w-48 h-48 object-cover mb-2 rounded"
              />
              <p className="text-lg font-semibold">{sellerName}</p>
              <p>{sellerEmail}</p>
              <div className="mt-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setUpdateMode(true)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeactivate(selectedSellerId)}
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerManager;
