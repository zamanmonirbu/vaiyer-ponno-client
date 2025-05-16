"use client"

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductsByCategory } from "../actions/categoryActions"
import FilterComponent from "../components/Filter/FilterComponent"
import CategoryProducts from "./CategoryProducts"
import BreadcrumbComponent from "../components/Utilities/BreadcrumbComponent"
import { FaHome, FaFilter } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

const ManageAllCategory = () => {
  const { categoryName } = useParams()
  const dispatch = useDispatch()
  const { productsByCategory } = useSelector((state) => state.categories)

  const [productsByCategoryAll, setProductsByCategoryAll] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedRating, setSelectedRating] = useState("")
  const [selectedGenders, setSelectedGenders] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [customPriceRange, setCustomPriceRange] = useState({ min: "", max: "" })
  const [sortBy, setSortBy] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null })

  // Fetch products based on category
  useEffect(() => {
    dispatch(getProductsByCategory(categoryName))

    // Get user location
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
  }, [dispatch, categoryName])

  // Set products based on the fetched category data
  useEffect(() => {
    if (productsByCategory?.products) {
      setProductsByCategoryAll(productsByCategory.products)
      setFilteredProducts(productsByCategory.products)
    }
  }, [productsByCategory])

  // Memoized filtered products to avoid unnecessary calculations
  const filteredProductsMemo = useMemo(() => {
    let tempProducts = [...productsByCategoryAll]

    if (selectedRating) {
      const rating = Number.parseInt(selectedRating.split("-")[0], 10)
      tempProducts = tempProducts.filter((product) => product.rating >= rating)
    }
    if (selectedGenders.length > 0) {
      tempProducts = tempProducts.filter((product) => selectedGenders.includes(product.gender))
    }
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.replace("$", "").split("-").map(Number)
      tempProducts = tempProducts.filter((product) => product.price >= min && (!max || product.price <= max))
    }
    if (customPriceRange.min || customPriceRange.max) {
      const min = customPriceRange.min ? Number.parseFloat(customPriceRange.min) : 0
      const max = customPriceRange.max ? Number.parseFloat(customPriceRange.max) : Number.POSITIVE_INFINITY
      tempProducts = tempProducts.filter((product) => product.price >= min && product.price <= max)
    }
    if (sortBy) {
      tempProducts = tempProducts.sort((a, b) => {
        if (sortBy === "priceLowHigh") return a.price - b.price
        if (sortBy === "priceHighLow") return b.price - a.price
        if (sortBy === "mostRated") return b.rating - a.rating
        return 0
      })
    }

    return tempProducts
  }, [selectedRating, selectedGenders, selectedPriceRange, customPriceRange, sortBy, productsByCategoryAll])

  // Set filtered products whenever filters change
  useEffect(() => {
    setFilteredProducts(filteredProductsMemo)
  }, [filteredProductsMemo])

  // Define breadcrumb items
  const breadcrumbItems = [
    { label: <FaHome className="inline mr-1" /> + " Home", link: "/" },
    { label: `${categoryName}`, link: `/category/${categoryName}` },
  ]

  // Toggle filter sidebar on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbComponent items={breadcrumbItems} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6">{categoryName}</div>

        {/* Subcategory buttons - Horizontal scrollable on mobile */}
        <div className="my-3 sm:my-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          {/* Button to show all products in the category */}
          <button
            className="text-[#033B4C] px-3 py-1.5 sm:px-4 sm:py-2 m-1 rounded border-2 border-[#033B4C] text-sm sm:text-base font-semibold hover:text-white hover:bg-[#033B4C] transition-colors"
            onClick={() => setProductsByCategoryAll(productsByCategory.products)}
          >
            All Products
          </button>

          {/* Subcategory buttons */}
          {productsByCategory?.subCategories?.map((subCategory, index) => (
            <button
              key={index}
              className="text-[#033B4C] px-3 py-1.5 sm:px-4 sm:py-2 m-1 rounded border-2 border-[#033B4C] text-sm sm:text-base font-semibold hover:text-white hover:bg-[#033B4C] transition-colors"
              onClick={() => setProductsByCategoryAll(subCategory.products)}
            >
              {subCategory.name}
            </button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleFilters}
            className="flex items-center justify-center w-full bg-[#033B4C] text-white py-2 px-4 rounded-md shadow-md"
          >
            <FaFilter className="mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Responsive Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Mobile Filter Sidebar - Overlay */}
          {showFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleFilters}></div>
          )}

          {/* Filter Sidebar */}
          <div
            className={`${
              showFilters ? "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform translate-x-0" : "hidden"
            } md:block md:relative md:w-1/4 lg:w-1/5 md:transform-none md:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto`}
          >
            {/* Close button for mobile */}
            {showFilters && (
              <button
                onClick={toggleFilters}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 md:hidden"
                aria-label="Close filters"
              >
                <IoMdClose size={24} />
              </button>
            )}

            <div className="p-4">
              <FilterComponent
                setSelectedRating={setSelectedRating}
                setSelectedGenders={setSelectedGenders}
                setSelectedPriceRange={setSelectedPriceRange}
                setCustomPriceRange={setCustomPriceRange}
                setSortBy={setSortBy}
                selectedRating={selectedRating}
                selectedGenders={selectedGenders}
                selectedPriceRange={selectedPriceRange}
                customPriceRange={customPriceRange}
                sortBy={sortBy}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:flex-1 p-2 sm:p-4">
            <hr className="border-t-2 border-gray-300 mb-4 sm:mb-6" />
            {filteredProducts.length > 0 ? (
              <CategoryProducts
                productsByCategoryAll={filteredProducts}
                userLat={userLocation.lat}
                userLng={userLocation.lng}
              />
            ) : (
              <p className="text-center text-gray-500 py-8">No products match your criteria.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageAllCategory
