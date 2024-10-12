import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSeller,
  fetchDeactivatedSellers,
  updateSeller,
} from "../../actions/sellerActions";

const SellerRequests = () => {
  const dispatch = useDispatch();
  const { deactivatedSellers, loading, error } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(fetchDeactivatedSellers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      dispatch(deleteSeller(id));
    }
  };

  const handleActivate = (id, seller) => {
    console.log(id);
    const updatedSeller = { ...seller, isSeller: true };
    dispatch(updateSeller(id, updatedSeller));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Seller Requests</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 text-left text-gray-600">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 text-left text-gray-600">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 text-left text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {deactivatedSellers.map((seller) => (
            <tr key={seller._id} className="border-b">
              <td className="px-6 py-4">{seller.name}</td>
              <td className="px-6 py-4">{seller.email}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleActivate(seller._id, seller)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleDelete(seller._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerRequests;
