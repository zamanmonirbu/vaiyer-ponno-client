"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { getMostRatedProducts } from "../../actions/productActions"
import { MdLocationOn } from "react-icons/md"

// Helper function to calculate distance between two latitude/longitude points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null

  const R = 6371 // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in kilometers
}

const MostRatedProducts = () => {
  const dispatch = useDispatch()
  const [startIndex, setStartIndex] = useState(0)
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null })
  const [visibleItems, setVisibleItems] = useState(4)

  useEffect(() => {
    dispatch(getMostRatedProducts())

    // Fetch user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.log("Geolocation error:", error)
      },
    )

    // Adjust visible items based on screen size
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1) // Mobile: 1 item
      } else if (window.innerWidth < 768) {
        setVisibleItems(2) // Small tablets: 2 items
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3) // Tablets: 3 items
      } else {
        setVisibleItems(4) // Desktop: 4 items
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [dispatch])

  const { mostRatedProducts = [], loading, error } = useSelector((state) => state.product)

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 sm:h-64">
        <ClipLoader color="#033B4C" loading={loading} size={40} />
      </div>
    )

  if (error) return <p className="text-center text-red-500 py-4">An error occurred: {error}</p>

  const handleNext = () => {
    if (startIndex + visibleItems < mostRatedProducts.length) {
      setStartIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1)
    }
  }

  const visibleProducts = mostRatedProducts.slice(startIndex, startIndex + visibleItems)

  return (
    <div className="my-4 sm:my-6 px-2">
      <div className="relative">
        <h3 className="font-bold mb-3 sm:mb-4 text-xl sm:text-2xl text-center">
          <span className="text-yellow-400">Most Rated </span>Product Details
        </h3>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {visibleProducts?.map((product) => {
              const distance =
                userLocation.lat && userLocation.lng
                  ? calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      product?.product?.sellerLocation?.lat,
                      product?.product?.sellerLocation?.lng,
                    )?.toFixed(2)
                  : null

              return (
                <div key={product?.product?._id} className="transition-opacity duration-500">
                  <div className="bg-gray-100 p-2 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Link to={`/product/${product?.product?._id}`}>
                      <div className="bg-white border rounded-lg p-2 sm:p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-[1.02]">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-1/2 mx-auto mb-2 sm:mb-0">
                            <img
                              src={product?.product?.imageURL || "/placeholder.svg"}
                              alt={product?.product?.name}
                              className="w-full h-32 sm:w-28 sm:h-28 mx-auto object-cover rounded"
                            />
                          </div>
                          <div className="w-full sm:w-1/2">
                            <span className="text-yellow-500 text-sm">Rating: ★ {product?.product?.rating}</span>
                            <div className="text-base sm:text-lg font-bold">Price: ${product?.product?.unitPrice}</div>
                            <div className="text-sm sm:text-base text-green-500">Offer: {product?.product?.offer}%</div>
                            <div className="text-sm sm:text-base">
                              <a
                                href={product?.product?.video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-blue-500 underline text-xs sm:text-sm"
                              >
                                Watch Video
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="text-sm sm:text-base font-semibold my-2 text-center line-clamp-2">
                          {product?.product?.name.substring(0, 40)}
                        </div>

                        {/* Display distance if available */}
                        {distance && (
                          <div className="text-xs sm:text-sm text-gray-500 flex items-center justify-center space-x-1 sm:space-x-2 mt-1 sm:mt-2">
                            <div className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full shadow-md">
                              <MdLocationOn className="text-sm sm:text-base" />
                            </div>
                            <span className="text-teal-600 font-medium">{distance} km away</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-1 sm:p-2 rounded-full shadow-lg hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            aria-label="Previous"
          >
            &#8249;
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + visibleItems >= mostRatedProducts.length}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-1 sm:p-2 rounded-full shadow-lg hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  )
}

export default MostRatedProducts
