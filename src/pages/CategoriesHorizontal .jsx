"use client"

import { useEffect, useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { fetchCategories } from "../actions/categoryActions"

const CategoriesHorizontal = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories.categories)
  const loading = useSelector((state) => state.categories.loading)
  const error = useSelector((state) => state.categories.error)

  // Ref for the scroll container
  const scrollContainerRef = useRef(null)
  const [showPrevButton, setShowPrevButton] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current
        setShowPrevButton(scrollLeft > 0)
        setShowNextButton(scrollLeft + clientWidth < scrollWidth)
      }
    }

    // Initial check
    handleScroll()

    // Add scroll event listener
    const container = scrollContainerRef.current
    container?.addEventListener("scroll", handleScroll)

    // Clean up the event listener
    return () => {
      container?.removeEventListener("scroll", handleScroll)
    }
  }, [categories])

  // Return loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-20 sm:h-32">
        <ClipLoader color="#033B4C" loading={loading} size={30} />
      </div>
    )
  }

  // Return error state
  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>
  }

  // Handlers for scrolling
  const handlePrevClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const handleNextClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div className="relative flex items-center my-2 sm:my-4">
      {/* Previous Button */}
      {showPrevButton && (
        <button
          onClick={handlePrevClick}
          className="absolute left-0 z-10 bg-white/80 rounded-full p-1 sm:p-2 shadow-md hover:bg-white transition-all"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-lg sm:text-2xl text-[#033B4C]" />
        </button>
      )}

      {/* Category Buttons */}
      <div
        className="flex overflow-x-auto space-x-2 sm:space-x-3 scrollbar-hide w-full py-2 px-6 sm:px-8"
        ref={scrollContainerRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {categories?.map((category, index) => (
          <Link to={`category/${category?.name}`} key={index}>
            <button
              className="flex items-center h-10 sm:h-12 space-x-1 sm:space-x-2 text-[#033B4C] px-2 sm:px-4 py-1 sm:py-2 rounded border-2 border-[#033B4C] text-sm sm:text-base font-semibold hover:text-white hover:bg-[#033B4C] transition-colors whitespace-nowrap"
              style={{ minWidth: "120px", maxWidth: "200px" }}
            >
              <img
                src={category?.categoryImage || "/placeholder.svg"}
                alt={category?.category}
                className="h-6 w-6 sm:h-8 sm:w-8 transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <span className="truncate">{category?.name}</span>
            </button>
          </Link>
        ))}
      </div>

      {/* Next Button */}
      {showNextButton && (
        <button
          onClick={handleNextClick}
          className="absolute right-0 z-10 bg-white/80 rounded-full p-1 sm:p-2 shadow-md hover:bg-white transition-all"
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-lg sm:text-2xl text-[#033B4C]" />
        </button>
      )}
    </div>
  )
}

export default CategoriesHorizontal
