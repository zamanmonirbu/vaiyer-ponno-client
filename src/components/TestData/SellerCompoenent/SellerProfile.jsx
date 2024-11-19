import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerById } from "../../../actions/sellerActions";
import ClipLoader from "react-spinners/ClipLoader"; 

const SellerProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seller, loading, error } = useSelector((state) => state.seller);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchSellerById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCategory && seller?.products) {
      const categoryProducts = seller.products.filter(
        (product) => product.category === selectedCategory._id
      );
      setFilteredProducts(categoryProducts);
    } else {
      setFilteredProducts(seller?.products || []);
    }
  }, [selectedCategory, seller]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" loading={loading} size={50} /> {/* Spinner */}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
    <div className="flex flex-col min-h-screen">
      {/* Top Section */}
      <div className="flex flex-row flex-grow">
        {/* Video View Section */}
        <div className="w-1/5 h-full p-2 bg-gray-200">
          {seller?.video ? (
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

        {/* Category Section */}
        <div className="flex-grow p-2 bg-gray-100">
          <h2 className="text-2xl font-bold text-[#033B4C] mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-[#033B4C] px-4 py-2 m-1 rounded border-2 border-[#033B4C] text-lg font-semibold hover:text-white hover:bg-[#033B4C]"
            >
              All Products
            </button>
            {seller?.category?.map((category) => (
              
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category)}
                // className={`px-4 py-2 rounded-lg ${
                //   selectedCategory?._id === category._id
                //     ? "bg-blue-600 text-white"
                //     : "bg-blue-500 text-white"
                // } hover:bg-blue-600`}
                className="text-[#033B4C] px-4 py-2 m-1 rounded border-2 border-[#033B4C] text-lg font-semibold hover:text-white hover:bg-[#033B4C]"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-row flex-grow mt-4">
        <div className="w-1/4 h-full p-4 rounded-lg shadow-md">
          <div className="flex flex-col h-full">
            {/* Table-like layout with two columns */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* First Column - Image */}
              <div className="flex justify-center items-center">
                <img
                  src={
                    seller?.img ||
                    "https://cdn-icons-png.flaticon.com/512/5853/5853761.png"
                  }
                  alt={seller?.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>

              {/* Second Column - Name and Star Rating */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  {seller?.name}
                </h2>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 text-2xl">&#9733;</span>
                  <span className="ml-2 text-xl text-gray-700">
                    {seller?.star} Stars
                  </span>
                </div>
                <button className="bg-[#033B4C] text-white rounded-md p-1 text-xl mt-4 hover:bg-gray-300 hover:text-[#033B4C]">
                  Contact
                </button>
              </div>
            </div>

            {/* Rest of the content */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-[#033B4C]">About</h3>
              <p className="text-gray-700 mt-2">
                {seller?.about || "No description available."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-[#033B4C]">
                Contact Information
              </h3>
              <p className="text-gray-700 mt-2">
                Mobile: {seller?.mobile || "N/A"}
              </p>
              <p className="text-gray-700 mt-1">
                Address: {seller?.address || "N/A"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-[#033B4C]">
                Account Numbers
              </h3>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                {seller?.accountNumbers?.length > 0 ? (
                  seller?.accountNumbers?.map((account, index) => (
                    <li key={index} className="mt-1">
                      <span className="font-semibold">{account.name}:</span>{" "}
                      {account.number}
                    </li>
                  ))
                ) : (
                  <li>No account numbers available.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="flex-grow p-6 w-full bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCategory
              ? `${selectedCategory.name} Products`
              : "All Products"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div>
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-48 h-48 m-auto my-8 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        {product.name.slice(0, 33)}
                      </h3>
                      <p className="text-sm text-gray-700 mt-2">
                        {product.description.slice(0, 100)}...
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xl font-semibold text-[#033B4C]">
                          Offer: {product.offer}%
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          ৳{product.unitPrice}
                        </span>
                      </div>
                      <a
                        href={product.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-4 text-blue-500 underline"
                        onClick={(e) => e.stopPropagation()} // Prevents the Link from being triggered
                      >
                        Watch Video
                      </a>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-700">
                No products available for this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SellerProfile;
