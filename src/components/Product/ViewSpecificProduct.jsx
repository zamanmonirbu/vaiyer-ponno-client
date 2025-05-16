"use client"

import { useEffect, useState } from "react"
import ProductViewLeft from "./ProductViewLeft"
import { addToCart, getCartProducts } from "../../actions/cartActions"
import { useDispatch, useSelector } from "react-redux"
import ProductDetails from "./ProductDetails"
import PropTypes from "prop-types"
import AddToCartSection from "./AddToCartSection"
import CartSection from "./CartSection"
import { getCookie, setCookie } from "../../actions/cookieUtils"

const ViewSpecificProduct = ({ product }) => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [activeTab, setActiveTab] = useState("details") // For mobile view tabs

  // Fetch cart products on mount
  useEffect(() => {
    dispatch(getCartProducts())

    // Store product details in cookies when the component mounts
    const viewedProductsCookie = getCookie("viewedProducts")
    const viewedProducts = viewedProductsCookie ? JSON.parse(viewedProductsCookie) : []

    // Check if the product is already in the viewed list
    const productExists = viewedProducts.some((item) => item._id === product?._id)

    // If the product is not already viewed, add it
    if (!productExists) {
      viewedProducts.push({
        _id: product._id,
        name: product.name,
        imageURL: product.imageURL,
        unitPrice: product.unitPrice,
      })
      setCookie("viewedProducts", JSON.stringify(viewedProducts), 30) // Set cookie to expire in 30 days
    }
  }, [dispatch, product])

  // Add to cart handler
  const handleAddToCart = (quantity) => {
    dispatch(addToCart(product?._id, quantity))
  }

  // Handle quantity change in the cart
  const handleQuantityChange = (productId, quantity) => {
    dispatch(addToCart(productId, quantity))
  }

  const totalOrders = product?.order?.length

  // Mobile tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <ProductDetails
            key={product?._id}
            productId={product?._id}
            name={product?.name}
            sellerId={product?.seller._id}
            description={product?.description}
            unitPrice={product?.unitPrice}
            offer={product?.offer}
            rating={product?.rating}
            comment={product?.comment}
            order={totalOrders}
            sellerLocation={product?.sellerLocation}
            quantity={product?.quantity}
            area={product?.area}
            cities={product?.cities}
          />
        )
      case "cart":
        return (
          <div className="mt-4">
            <AddToCartSection
              unitPrice={product?.unitPrice}
              offer={product?.offer}
              stock={product?.quantity}
              handleAddToCart={handleAddToCart}
              sellerLocation={product?.sellerLocation}
              maxDistance={product?.area}
            />
            {cartItems.length > 0 && (
              <div className="mt-4">
                <CartSection cartItems={cartItems} onQuantityChange={handleQuantityChange} stocks={product?.quantity} />
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="py-4 sm:py-6">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Section: Images View */}
        <div className="w-full lg:w-1/3 bg-gray-100 p-3 sm:p-4 rounded-lg">
          <ProductViewLeft mainImageView={product?.imageURL} videoUrl={product?.video} subImages={product?.subImages} />
        </div>

        {/* Center Section: Product Information */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg">
          <ProductDetails
            key={product?._id}
            productId={product?._id}
            name={product?.name}
            sellerId={product?.seller._id}
            description={product?.description}
            unitPrice={product?.unitPrice}
            offer={product?.offer}
            rating={product?.rating}
            comment={product?.comment}
            order={totalOrders}
            sellerLocation={product?.sellerLocation}
            quantity={product?.quantity}
            area={product?.area}
            cities={product?.cities}
          />
        </div>

        {/* Right Section: Add to Cart and Cart Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <AddToCartSection
            unitPrice={product?.unitPrice}
            offer={product?.offer}
            stock={product?.quantity}
            handleAddToCart={handleAddToCart}
            sellerLocation={product?.sellerLocation}
            maxDistance={product?.area}
          />
          {cartItems.length > 0 && (
            <CartSection cartItems={cartItems} onQuantityChange={handleQuantityChange} stocks={product?.quantity} />
          )}
        </div>
      </div>

      // Divider for mobile version 

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Product Images */}
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <ProductViewLeft mainImageView={product?.imageURL} videoUrl={product?.video} subImages={product?.subImages} />
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "details" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "cart" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("cart")}
          >
            Add to Cart
          </button>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  )
}

// PropTypes validation to ensure correct prop types
ViewSpecificProduct.propTypes = {
  product: PropTypes.object.isRequired, // Make sure product is an object
}

export default ViewSpecificProduct
