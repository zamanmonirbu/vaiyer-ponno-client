"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { getProduct } from "../../actions/productActions"
import SuggestProducts from "./SuggestProducts"
import ViewSpecificProduct from "./ViewSpecificProduct"
import BreadcrumbComponent from "../Utilities/BreadcrumbComponent"
import { FaHome } from "react-icons/fa" // Import the home icon

const ProductView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProduct(id))
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [dispatch, id])

  const { product, loading, error } = useSelector((state) => state.product)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="mb-2 text-gray-600">Loading</p>
          <ClipLoader color={"#123abc"} loading={loading} size={40} />
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error.message}</div>
  }

  // Define breadcrumb items with home icon
  const breadcrumbItems = [
    { label: <FaHome className="inline mr-1" /> + " Home", link: "/" },
    { label: `${product?.category?.name}`, link: `/category/${product?.category?.name}` },
    { label: "Product", link: `/product/${product?._id}` },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Use the breadcrumb component */}
      <BreadcrumbComponent items={breadcrumbItems} />

      <div className="container mx-auto px-4">
        {product && <ViewSpecificProduct product={product} />}
        <SuggestProducts id={id} />
      </div>
    </div>
  )
}

export default ProductView
