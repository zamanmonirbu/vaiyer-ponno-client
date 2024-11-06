import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import react-spinner

import {
  clearSearchedProducts,
  searchProducts,
} from "../actions/productActions"; // Import clearSearchedProducts

const ProductSearch = ({ active, handleClick }) => {
  const dispatch = useDispatch();
  const { searchedProducts, loading, error } = useSelector(
    (state) => state.product
  );

  const categories = useSelector((state) => state.categories.categories);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleAllClick = () => {
    setIsCategoriesModalOpen(true);
  };

  const closeCategoriesModal = () => {
    setIsCategoriesModalOpen(false);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery(""); // Clear the search query when closing the modal
    dispatch(clearSearchedProducts()); // Clear searched products when modal closes
  };

  const handleSearch = (query) => {
    if (query) {
      dispatch(searchProducts(query));
    }
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 1000); // Wait for 1 second before searching

    setDebounceTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId); // Clean up on unmount or query change
    };
  }, [searchQuery, dispatch]);

  return (
    <div className="flex flex-1 ml-8">
      {/* Trigger for Categories Modal */}
      <button
        className="bg-gray-200 text-gray-700 px-4 sm:px-14 hover:bg-yellow-400 hover:text-black"
        onClick={handleAllClick}
      >
        All
      </button>

      {/* This input now triggers the search modal */}
     <div className="w-full sm:w-1/5 md:w-2/5 lg:w-3/5 xl:w-4/5">
     
     <input
        type="text"
        placeholder="Search vaiyer-ponno"
        className="flex-1 p-3 w-full border-none outline-none"
        onClick={() => setIsSearchModalOpen(true)} // Opens modal when clicked
        readOnly // Makes input read-only so the modal handles input
      />

     </div>
      <button
        className="bg-yellow-400 p-2 flex items-center justify-center"
        onClick={() => handleSearch(searchQuery)} // Allow manual search
      >
        <IoSearchOutline className="text-xl sm:text-3xl" />
      </button>

      {/* Categories Modal */}
      <Modal
        isOpen={isCategoriesModalOpen}
        onRequestClose={closeCategoriesModal}
        contentLabel="Categories"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">All Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category._id}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            >
              <Link to={`/category/${category.name}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
        <button
          onClick={closeCategoriesModal}
          className="mt-4 bg-gray-800 text-white p-2 rounded-md"
        >
          Close
        </button>
      </Modal>

      {/* Search Modal */}
      <Modal
        isOpen={isSearchModalOpen}
        onRequestClose={closeSearchModal}
        contentLabel="Search Results"
        className="modal-content modal-wide " // Set modal width to 70% with Tailwind
        overlayClassName="modal-overlay"
      >
        <div className="modal-header flex items-center">
          <input
            type="text"
            placeholder="Search vaiyer-ponno"
            className="w-full p-2 border border-gray-300 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-yellow-400 p-2 flex items-center justify-center ml-2"
            onClick={() => handleSearch(searchQuery)} // Allow manual search
          >
            <IoSearchOutline className="text-xl sm:text-3xl" />
          </button>
        </div>

        {/* Conditionally render the search results section */}
        {searchQuery && (
          <>
            <h2 className="text-xl font-bold mt-4 mb-4">Search Results</h2>

            {/* Loading spinner */}
            {loading && (
              <div className="flex justify-center items-center my-4">
                <ClipLoader color="#fbbf24" size={40} />
              </div>
            )}

            {/* Error message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* No results found */}
            {searchedProducts?.length === 0 && !loading && (
              <p className="text-gray-500">No results found.</p>
            )}

            {/* Search results list */}
            <ul>
              {searchedProducts?.map((product) => (
                <li
                  key={product._id}
                  className="py-2 px-4 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  <IoSearchOutline className="text-xl mr-2 text-yellow-500" />
                  <Link
                    to={`/product/${product._id}`}
                    onClick={closeSearchModal}
                    className="text-gray-800 hover:bg-yellow-500 px-4 py-2 rounded-lg"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Close button with icon */}
        <button
          onClick={closeSearchModal}
          className="mt-4 bg-gray-800 text-white p-2 rounded-md flex items-center"
        >
          <IoSearchOutline className="text-xl mr-2" />
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ProductSearch;
