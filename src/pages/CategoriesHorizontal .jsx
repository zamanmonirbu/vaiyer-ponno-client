import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchCategories } from "../actions/categoryActions";

const CategoriesHorizontal = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  
  // Ref for the scroll container
  const scrollContainerRef = useRef(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
        setShowPrevButton(scrollLeft > 0);
        setShowNextButton(scrollLeft + clientWidth < scrollWidth);
      }
    };

    // Add scroll event listener
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [categories]);

  // Return loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <ClipLoader color="#033B4C" loading={loading} size={50} />
      </div>
    );
  }

  // Return error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handlers for scrolling
  const handlePrevClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleNextClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center my-4">
      {/* Previous Button */}
      {showPrevButton && (
        <FaChevronLeft
          onClick={handlePrevClick}
          className="text-2xl cursor-pointer hover:text-[#033B4C] hover:shadow-lg transition-all absolute left-0 z-10"
        />
      )}

      {/* Category Buttons */}
      <div
        className="flex overflow-x-auto space-x-3 scrollbar-hide"
        ref={scrollContainerRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {categories?.map((category, index) => (
          <Link to={`category/${category?.name}`} key={index}>
            <button
              className="flex items-center w-full h-12 space-x-2 text-[#033B4C] px-4 py-2 rounded border-2 border-[#033B4C] text-lg font-semibold hover:text-white hover:bg-[#033B4C]"
              style={{ minWidth: "150px" }}
            >
              <img
                src={category?.categoryImage}
                alt={category?.category}
                className="h-8 w-8 transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <span>{category?.name}</span>
            </button>
          </Link>
        ))}
      </div>

      {/* Next Button */}
      {showNextButton && (
        <FaChevronRight
          onClick={handleNextClick}
          className="text-2xl cursor-pointer hover:text-[#033B4C] hover:shadow-lg transition-all absolute right-0 z-10"
        />
      )}
    </div>
  );
};

export default CategoriesHorizontal;
