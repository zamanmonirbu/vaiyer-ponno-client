import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerById } from "../../actions/sellerActions";

const SellerProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seller, loading, error } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(fetchSellerById(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Top Section */}
      <div className="flex flex-row flex-grow">
        {/* Video View Section */}
        <div className="w-1/5 h-full p-2 bg-gray-200">
          {seller.video ? (
            <video
              className="w-full h-full rounded-lg"
              src={seller.video}
              controls
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No video available
            </div>
          )}
        </div>

        {/* About Information Section */}
        <div className="flex-grow p-2 bg-gray-100">
          {/* <h2 className="text-2xl font-bold mb-2">{seller.name}</h2> */}
          <p>category</p>
          {/* <p className="text-gray-700">
            {seller.about || "No description available."}
          </p> */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-row flex-grow mt-4">
        {/* User Information Section */}
        <div className="w-1/5 h-full p-2 bg-gray-200">
          <img
            src={
              seller.img ||
              "https://cdn-icons-png.flaticon.com/512/5853/5853761.png"
            }
            alt={seller.name}
            className="w-32 h-32 rounded-full my-4 mx-auto"
          />

<div>
          <h2 className="text-2xl font-bold mb-2">{seller.name}</h2>
          <p className="text-gray-600 mb-4">{seller.email}</p>
          <p className="text-gray-700">{seller.about || 'No description available.'}</p>
        </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Star Rating</h3>
            <div className="flex items-center">
              <span className="text-yellow-500 text-xl">&#9733;</span>
              <span className="ml-2 text-gray-700">{seller.star} Stars</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold">Contact Information</h3>
          <p className="text-gray-700">Mobile: {seller.mobile || "N/A"}</p>
          <p className="text-gray-700">Address: {seller.address || "N/A"}</p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Account Numbers</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {seller.accountNumbers.length > 0 ? (
                seller.accountNumbers.map((account, index) => (
                  <li key={index}>
                    {account.name}: {account.number}
                  </li>
                ))
              ) : (
                <li>No account numbers available.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Product and Account Information Section */}
        <div className="flex-grow p-2 bg-gray-100">
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <p className="text-gray-700">
            {seller.products.length
              ? `${seller.products.length} Products available`
              : seller.productMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
