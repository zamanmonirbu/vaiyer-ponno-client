"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PulseLoader } from "react-spinners" // Import react spinner
import { getBanners } from "../actions/bannerActions"

const CategoryAdds = () => {
  const dispatch = useDispatch()
  const banners = useSelector((state) => state.banner.banners)
  const loading = useSelector((state) => state.categories.loading)
  const error = useSelector((state) => state.categories.error)

  useEffect(() => {
    dispatch(getBanners())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 sm:h-60 md:h-80">
        <PulseLoader color="#033B4C" size={15} />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>
  }

  return (
    <div className="relative w-full h-40 sm:h-60 md:h-80 my-4 group mx-auto px-2">
      {banners.length > 0 && (
        <div className="relative h-full w-full transition-opacity duration-300 hover:opacity-90 rounded-lg overflow-hidden shadow-md">
          <img
            src={banners[0]?.imageUrl || "/placeholder.svg"} // Use the first banner only
            alt="Banner"
            className="h-full w-full object-cover object-center"
          />
          {/* Overlay Div */}
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              to="/about/us"
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-500 text-white text-sm sm:text-base rounded-md hover:bg-teal-600 transition-colors shadow-lg"
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryAdds
