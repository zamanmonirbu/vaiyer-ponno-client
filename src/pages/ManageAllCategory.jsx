import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../actions/categoryActions";
import FilterComponent from "../components/Filter/FilterComponent";
import CategoryProducts from "./CategoryProducts";
import AllNavSections from "../components/Nav/AllNavSections";

const ManageAllCategory = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { productsByCategory } = useSelector((state) => state.categories);

  const [productsByCategoryAll, setProductsByCategoryAll] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter states (now in ManageAllCategory)
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [customPriceRange, setCustomPriceRange] = useState({
    min: "",
    max: "",
  });
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(getProductsByCategory(categoryName));
  }, [dispatch, categoryName]);

  useEffect(() => {
    if (productsByCategory?.products) {
      setProductsByCategoryAll(productsByCategory.products);
      setFilteredProducts(productsByCategory.products); // Default to all products
    }
  }, [productsByCategory]);

  // Filter products based on selected filters
  useEffect(() => {
    let tempProducts = [...productsByCategoryAll];

    // Apply rating filter
    if (selectedRating) {
      const rating = parseInt(selectedRating.split("-")[0], 10);
      tempProducts = tempProducts.filter((product) => product.rating >= rating);
    }

    // Apply gender filter
    if (selectedGenders.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedGenders.includes(product.gender)
      );
    }

    // Apply price range filter
    if (selectedPriceRange) {
      let [min, max] = selectedPriceRange
        .replace("$", "")
        .split("-")
        .map(Number);
      tempProducts = tempProducts.filter(
        (product) => product.price >= min && (max ? product.price <= max : true)
      );
    }

    // Apply custom price range filter
    if (customPriceRange.min || customPriceRange.max) {
      const min = customPriceRange.min ? parseFloat(customPriceRange.min) : 0;
      const max = customPriceRange.max
        ? parseFloat(customPriceRange.max)
        : Infinity;
      tempProducts = tempProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Apply sorting
    if (sortBy === "priceLowHigh") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "mostRated") {
      tempProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(tempProducts);
  }, [
    selectedRating,
    selectedGenders,
    selectedPriceRange,
    customPriceRange,
    sortBy,
    productsByCategoryAll,
  ]);

  return (
    <div>
      <AllNavSections />

      <div className="w-full p-4 text-2xl font-bold pl-[12%]">
        {categoryName}
      </div>

      <div className="w-full p-4 pl-[12%] mx-auto">
        {productsByCategory?.subCategories?.map((subCategory, index) => (
          <button
            key={index}
            className="text-[#033B4C] px-4 py-2 m-1 rounded border-2 border-[#033B4C] text-lg font-semibold hover:text-white hover:bg-[#033B4C]"
            onClick={() => setProductsByCategoryAll(subCategory.products)}
          >
            {subCategory.name}
          </button>
        ))}
      </div>

      {/* Layout: Filter on the left, products on the right */}
      <div className="flex mx-[10%]">
        <div className="w-1/5 p-4">
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

        <div className="flex-1 p-4">
          <hr className="border-t-2 border-gray-300 mb-6" />
          <CategoryProducts productsByCategoryAll={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ManageAllCategory;
