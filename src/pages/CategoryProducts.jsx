"use client"

import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { MdLocationOn } from "react-icons/md"

const CategoryProducts = ({ productsByCategoryAll, userLat, userLng }) => {
  // Function to calculate distance using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return null

    const R = 6371 // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(1) // Return distance in km with 1 decimal
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {productsByCategoryAll.length > 0 ? (
          productsByCategoryAll?.map((product) => {
            // Assuming product.sellerLocation has lat and lng
            const distance = calculateDistance(
              userLat,
              userLng,
              product.sellerLocation?.lat,
              product.sellerLocation?.lng,
            )

            return (
              <Link to={`/product/${product._id}`} key={product._id} className="block h-full">
                <div className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden h-full transition-transform duration-300 transform hover:scale-[1.02]">
                  <div className="relative pt-[75%]">
                    <img
                      src={product.imageURL || "/placeholder.svg"}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 h-12">
                      {product.name.substring(0, 50)}
                    </h3>
                    <div className="mt-2 sm:mt-4 flex items-center justify-between">
                      <span className="text-base sm:text-lg font-semibold text-gray-900">${product.unitPrice}</span>
                    </div>
                    {/* Display the distance */}
                    {distance !== null && distance !== undefined && (
                      <div className="mt-2 text-xs sm:text-sm text-gray-500 flex items-center">
                        <MdLocationOn className="text-teal-600 mr-1" />
                        <span className="text-teal-600 font-medium">{distance} km away</span>
                      </div>
                    )}
                    <a
                      href={product.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 sm:mt-4 text-xs sm:text-sm text-blue-500 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">No products in this subcategory</p>
        )}
      </div>
    </div>
  )
}

CategoryProducts.propTypes = {
  productsByCategoryAll: PropTypes.array.isRequired,
  userLat: PropTypes.number, // Make optional
  userLng: PropTypes.number, // Make optional
}

// Default props
CategoryProducts.defaultProps = {
  userLat: null,
  userLng: null,
}

export default CategoryProducts
