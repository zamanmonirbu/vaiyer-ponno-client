import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../actions/categoryActions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StrikeLine from "./StrikeLine";
import { Link } from "react-router-dom";

const CategoriesHorizontal = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const itemsPerPage = 13; // Set the number of items to show per page

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Logic to handle pagination
  const totalPages = Math.ceil(categories?.length / itemsPerPage);
  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const visibleCategories = categories?.slice(startIdx, endIdx);

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <StrikeLine />
      <div className="flex items-center relative">
        {/* Previous Button */}
        {currentPage > 0 && (
          <FaChevronLeft
            onClick={handlePrevClick}
            className="text-2xl cursor-pointer hover:text-[#033B4C] hover:shadow-lg transition-all absolute left-0 z-10"
          />
        )}

        {/* Category Buttons */}
        <div className="flex-1 flex space-x-3 overflow-x-hidden">
          {visibleCategories?.map((category) => (
            <div
              key={category?._id}
              className="px-4 text-[#033B4C] rounded cursor-pointer hover:shadow-2xl hover:shadow-gray-400 transition-transform duration-300 ease-in-out transform hover:scale-110 mx-10"
            >
              <Link to={`category/${category?.name}`}>
                <img
                  src={category?.categoryImage}
                  alt={category?.category}
                  className="h-8 w-8 transition-transform duration-300 ease-in-out transform hover:scale-110 mx-auto"
                />
                {category?.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Next Button */}
        {currentPage < totalPages - 1 && (
          <FaChevronRight
            onClick={handleNextClick}
            className="text-2xl cursor-pointer hover:text-[#033B4C] hover:shadow-lg transition-all absolute right-0 z-10"
          />
        )}
      </div>
      <StrikeLine />
    </div>
  );
};

export default CategoriesHorizontal;
