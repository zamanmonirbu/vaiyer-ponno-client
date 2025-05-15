"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getCategoriesWithLimitedProducts } from "../actions/categoryActions"
import { ClipLoader } from "react-spinners"
import { getIpLocation } from "../actions/IpLocation"
import { MdLocationOn } from "react-icons/md"

const CategoryFourProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { limitedCategoriesWithProducts, loading, error } = useSelector((state) => state.categories)

  const [userLat, setUserLat] = useState(null)
  const [userLng, setUserLng] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3) // Default to 3

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1) // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2) // Tablet: 2 items
      } else {
        setItemsPerPage(3) // Desktop: 3 items
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    dispatch(getCategoriesWithLimitedProducts())

    const fetchLocation = async () => {
      const location = await getIpLocation()
      if (location) {
        const [lat, lng] = location.split(",")
        setUserLat(Number.parseFloat(lat))
        setUserLng(Number.parseFloat(lng))
      } else {
        console.log("Could not fetch user location.")
      }
    }
    fetchLocation()
  }, [dispatch])

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return null

    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(1)
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const categoriesToDisplay = Array.isArray(limitedCategoriesWithProducts) ? limitedCategoriesWithProducts : []

  // Pagination logic
  const paginatedCategories = categoriesToDisplay.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage,
  )

  const handleNext = () => {
    if ((currentIndex + 1) * itemsPerPage < categoriesToDisplay.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 sm:h-60">
        <ClipLoader color="#f59e0b" size={40} />
      </div>
    )
  }

  if (error) return <p className="text-red-500 text-center py-4">Error: {error}</p>

  return (
    <div className="mx-auto px-2 sm:px-4 my-4 sm:my-6">
      <h3 className="font-bold mb-3 sm:mb-4 text-xl sm:text-2xl text-center">
        <span className="text-yellow-400">Explore Categories</span> and Their Products
      </h3>

      {/* Responsive grid for categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {paginatedCategories.map((category) => (
          <div key={category._id} className="p-3 sm:p-4 bg-slate-200 rounded-lg shadow-sm">
            <p className="text-center my-2 sm:my-4">
              <Link
                to={`/category/${category.name}`}
                className="font-semibold text-lg sm:text-xl text-green-500 hover:underline"
              >
                {category.name}
              </Link>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 bg-white p-2 sm:p-4 rounded-lg">
              {category.products.slice(0, 4).map((product) => {
                const distance = calculateDistance(
                  userLat,
                  userLng,
                  product.sellerLocation?.lat,
                  product.sellerLocation?.lng,
                )

                return (
                  <div
                    key={product._id}
                    className="border rounded-lg p-1 sm:p-2 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-105 w-full"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <div className="relative pt-[100%] w-full">
                      <img
                        src={product.imageURL || "/placeholder.svg"}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="text-xs sm:text-sm md:text-md font-medium text-black mt-2 line-clamp-2 h-8 sm:h-10">
                      {product.name.length > 15 ? product.name.slice(0, 20) + "..." : product.name}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs sm:text-sm text-teal-600 mt-1">
                      <span className="font-bold">${product.unitPrice}</span>

                      {distance && (
                        <div className="text-xs sm:text-sm text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
                          <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-teal-500 text-white rounded-full shadow-md">
                            <MdLocationOn className="text-xs sm:text-sm" />
                          </div>
                          <span className="text-teal-600 font-medium">{distance} km</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Next and Previous Buttons */}
      <div className="flex justify-center space-x-4 mt-4 sm:mt-6">
        <button
          onClick={handlePrev}
          className={`${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          } bg-gray-200 hover:bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm`}
          disabled={currentIndex === 0}
          aria-label="Previous page"
        >
          &#8249;
        </button>

        <button
          onClick={handleNext}
          className={`${
            (currentIndex + 1) * itemsPerPage >= categoriesToDisplay.length ? "opacity-50 cursor-not-allowed" : ""
          } bg-gray-200 hover:bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm`}
          disabled={(currentIndex + 1) * itemsPerPage >= categoriesToDisplay.length}
          aria-label="Next page"
        >
          &#8250;
        </button>
      </div>
    </div>
  )
}

export default CategoryFourProduct
