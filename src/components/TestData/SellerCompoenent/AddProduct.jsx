// AddProduct.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { createProduct } from "../../../actions/productActions";
import { fetchCategories } from "../../../actions/categoryActions";
import { uploadImageToImgBB } from "../../../actions/imageService";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

const AddProduct = ({ seller }) => {
  const { storeId, storeName } = useParams();
  const [product, setProduct] = useState({
    storeId, // Include storeId here
    name: "",
    imageURL: "",
    subImages: [],
    unitPrice: "",
    description: "",
    video: "",
    category: "",
    subCategory: "",
    offer: "",
    gender: "",
    sellerLocation: {
      lat: "",
      lng: "",
      city: "",
      road: "",
      postalCode: "",
    },
    area: "",
    quantity: "",
  });

  const [selectedCategory, setSelectedCategory] = useState([]);
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (seller?.location) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        sellerLocation: seller.location,
      }));
    }
  }, [seller]);

  useEffect(() => {
    if (product.category) {
      const selectedCat = categories.find((cat) => cat._id === product.category);
      setSelectedCategory(
        selectedCat && Array.isArray(selectedCat.subCategories)
          ? selectedCat.subCategories
          : []
      );
    }
  }, [product.category, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: categoryId,
      subCategory: "",
    }));

    const selectedCat = categories.find((cat) => cat._id === categoryId);
    setSelectedCategory(
      selectedCat && Array.isArray(selectedCat.subCategories)
        ? selectedCat.subCategories
        : []
    );
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const randomNineDigitNumber = Math.floor(
          100000000 + Math.random() * 900000000
        );
        const newImageName = `${randomNineDigitNumber}-${file.name}`;
        return await uploadImageToImgBB(file, newImageName);
      })
    );

    if (!product.imageURL && uploadedUrls.length > 0) {
      setProduct((prev) => ({
        ...prev,
        imageURL: uploadedUrls[0],
      }));
    }

    setProduct((prev) => ({
      ...prev,
      subImages: [
        ...prev.subImages,
        ...uploadedUrls.slice(1).filter(Boolean),
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProduct(product));
      setProduct({
        storeId, // Reset with storeId still included
        name: "",
        imageURL: "",
        subImages: [],
        unitPrice: "",
        description: "",
        video: "",
        category: "",
        subCategory: "",
        offer: "",
        gender: "",
        sellerLocation: {
          lat: "",
          lng: "",
          city: "",
          road: "",
          postalCode: "",
        },
        area: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  return (
    <div>
        {/* <p>Add Product on {storeName}</p> */}
      <ProductForm
        product={product}
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        handleImageUpload={handleImageUpload}
        selectedCategory={selectedCategory}
        categories={categories}
        storeName={storeName}
      />
      <div className="mb-4 col-span-2">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full p-2 bg-[#3b4d66] text-white rounded hover:bg-[#222c3a]"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

AddProduct.propTypes = {
  seller: PropTypes.object,
};

export default AddProduct;
