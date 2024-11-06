import { useEffect, useState } from "react";
import { getCookie } from "../../actions/cookieUtils"; // Import your cookie functions
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { BiCart } from 'react-icons/bi'; // Import an icon from react-icons
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'; // Import left and right chevron icons

const ReturnsAndOrders = () => {
  const [viewedProducts, setViewedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10; // Set to 10 to display two rows of products

  useEffect(() => {
    // Get the viewed products from cookies
    const viewedProductsCookie = getCookie("viewedProducts");
    const viewedProductsArray = viewedProductsCookie ? JSON.parse(viewedProductsCookie) : [];
    setViewedProducts(viewedProductsArray);
  }, []);

  // Calculate the current products to display based on the current page
  const startIndex = currentPage * productsPerPage;
  const currentProducts = viewedProducts.slice(startIndex, startIndex + productsPerPage);

  // Handlers for Next and Previous buttons
  const handleNext = () => {
    if ((currentPage + 1) * productsPerPage < viewedProducts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Viewed items in your <span className="text-[#FACC15]">browsing history</span> also viewed
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="border p-4 rounded-lg bg-white shadow-xl">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-48 object-content rounded-t-lg min-w-[200px] max-w-[300px]"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name.slice(0, 30)}</h2>
              <p className="text-gray-500">${product.unitPrice}</p>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-48 w-3/4 mx-auto">
            <BiCart className="text-6xl text-gray-400" /> {/* Large cart icon */}
            <p className="mt-2 text-gray-500">No viewed products found.</p>
            <p>
              For personalized suggestions, browse products or{" "}
              <Link to="/user/login">
                <button className="text-white bg-[#1e2b47] px-4 py-1 rounded hover:bg-gray-800 transition">
                  Sign In
                </button>
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* Pagination Buttons Centered */}
      <div className="flex justify-center items-center mt-4">
        <button 
          onClick={handlePrevious} 
          disabled={currentPage === 0} 
          className="flex items-center px-4 py-2 bg-[#1e2b47] text-white rounded hover:bg-gray-800 transition disabled:opacity-50 mr-2"
        >
          <BiChevronLeft className="mr-2" /> 
          Previous
        </button>
        <button 
          onClick={handleNext} 
          disabled={(currentPage + 1) * productsPerPage >= viewedProducts.length} 
          className="flex items-center px-4 py-2 bg-[#1e2b47] text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
        >
          Next
          <BiChevronRight className="ml-2" /> 
        </button>
      </div>
    </div>
  );
};

export default ReturnsAndOrders;
