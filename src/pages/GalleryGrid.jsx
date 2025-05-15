"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchGalleryItems } from "../actions/galleryActions"

const GalleryGrid = () => {
  const dispatch = useDispatch()
  const { galleryItems = [] } = useSelector((state) => state.galleryItems)

  useEffect(() => {
    dispatch(fetchGalleryItems())
  }, [dispatch])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 py-2 sm:py-4">
      {galleryItems?.map((item) => {
        // Responsive grid classes
        const gridClasses = item.isLarge
          ? "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2"
          : item.isMedium
            ? "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-1"
            : "col-span-1"

        return (
          <Link
            key={item._id}
            to={`/category/${item.category}`}
            className={`relative min-h-[120px] sm:min-h-[150px] ${gridClasses} rounded-lg overflow-hidden flex items-center justify-center p-2 sm:p-4 text-white transition-transform duration-300 ease-in-out transform hover:scale-[1.02] shadow-sm hover:shadow-md`}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 bg-black bg-opacity-50 p-2 sm:p-4 rounded-lg">
              <div style={{ color: item.color }} className="text-center">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold">{item.text}</h2>
                <p className="text-xs sm:text-sm">{item.subText}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default GalleryGrid
