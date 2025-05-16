"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PulseLoader } from "react-spinners"
import { getSuggestedProducts } from "../../actions/productActions"
import { AiOutlineShopping } from "react-icons/ai"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const SuggestProducts = ({ id }) => {
  const dispatch = useDispatch()
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [visibleItems, setVisibleItems] = useState(1)
  const containerRef = useRef(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  useEffect(() => {
    dispatch(getSuggestedProducts(id))

    // Determine number of visible items based on screen width
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1) // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2) // Tablet: 2 items
      } else if (window.innerWidth < 1280) {
        setVisibleItems(3) // Small desktop: 3 items
      } else {
        setVisibleItems(4) // Large desktop: 4 items
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [dispatch, id])

  const { suggestedProducts, loading, error } = useSelector((state) => state.product)

  const handleNextProduct = () => {
    if (suggestedProducts.length <= visibleItems) return
    setCurrentProductIndex((prevIndex) => {
      const nextIndex = prevIndex + 1
      return nextIndex >= suggestedProducts.length - visibleItems + 1 ? 0 : nextIndex
    })
  }

  const handlePrevProduct = () => {
    if (suggestedProducts.length <= visibleItems) return
    setCurrentProductIndex((prevIndex) => {
      const nextIndex = prevIndex - 1
      return nextIndex < 0 ? suggestedProducts.length - visibleItems : nextIndex
    })
  }

  // Touch event handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNextProduct()
    }
    if (isRightSwipe) {
      handlePrevProduct()
    }
  }

  // Calculate item width based on container width and visible items
  const getItemWidth = () => {
    if (!containerRef.current) return "100%"
    const containerWidth = containerRef.current.offsetWidth
    const gap = 16 // 1rem = 16px
    return `${(containerWidth - gap * (visibleItems - 1)) / visibleItems}px`
  }

  return (
    <div className="my-4 sm:my-6 md:my-8">
      <div className="w-full relative">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <PulseLoader color="#033B4C" size={15} />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : suggestedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <AiOutlineShopping size={48} className="text-gray-500 mb-4" />
            <p className="text-gray-600 text-base sm:text-lg">No suggested products found</p>
          </div>
        ) : (
          <div className="relative">
            <h3 className="font-bold text-xl sm:text-2xl mb-4 text-center text-yellow-500">Suggested Products</h3>

            {/* Carousel Container */}
            <div
              ref={containerRef}
              className="relative overflow-hidden px-2"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-in-out gap-4"
                style={{
                  transform: `translateX(-${currentProductIndex * (100 / visibleItems)}%)`,
                }}
              >
                {suggestedProducts.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="flex-shrink-0"
                    style={{ width: `calc(100% / ${visibleItems})` }}
                  >
                    <div className="bg-white border rounded-lg p-3 sm:p-4 h-full shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative pt-[100%] mb-3">
                        <img
                          src={product.imageURL || "/placeholder.svg"}
                          alt={product.name}
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-sm sm:text-base font-semibold mb-2 line-clamp-2 h-10 sm:h-12">
                        {product.name.substring(0, 50)}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <div className="text-base sm:text-lg font-bold line-through text-gray-500">
                          ${product.unitPrice}
                        </div>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <div className="text-yellow-500 text-sm sm:text-base">★ {product.rating}</div>
                          <div className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">({product.reviews || 0})</div>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm text-green-600 block">
                        ${Math.round(product.unitPrice - product.unitPrice * (product.offer / 100))}{" "}
                        <span className="whitespace-nowrap">with {product.offer}% off</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Navigation Buttons - Only show if there are more items than visible slots */}
              {suggestedProducts.length > visibleItems && (
                <>
                  <button
                    onClick={handlePrevProduct}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white z-10 shadow-md"
                    aria-label="Previous product"
                  >
                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    onClick={handleNextProduct}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white z-10 shadow-md"
                    aria-label="Next product"
                  >
                    <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Pagination Dots for Mobile */}
            {suggestedProducts.length > visibleItems && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: suggestedProducts.length - visibleItems + 1 }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentProductIndex === index ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentProductIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SuggestProducts
