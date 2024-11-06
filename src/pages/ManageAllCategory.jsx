import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../actions/categoryActions";
import FilterComponent from "../components/Filter/FilterComponent";
import CategoryProducts from "./CategoryProducts";
import BreadcrumbComponent from "../components/Utilities/BreadcrumbComponent";
import { FaHome } from "react-icons/fa";

const ManageAllCategory = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { productsByCategory } = useSelector((state) => state.categories);

  const [productsByCategoryAll, setProductsByCategoryAll] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [customPriceRange, setCustomPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");

  // Fetch products based on category
  useEffect(() => {
    dispatch(getProductsByCategory(categoryName));
  }, [dispatch, categoryName]);

  // Set products based on the fetched category data
  useEffect(() => {
    if (productsByCategory?.products) {
      setProductsByCategoryAll(productsByCategory.products);
      setFilteredProducts(productsByCategory.products);
    }
  }, [productsByCategory]);

  // Memoized filtered products to avoid unnecessary calculations
  const filteredProductsMemo = useMemo(() => {
    let tempProducts = [...productsByCategoryAll];

    if (selectedRating) {
      const rating = parseInt(selectedRating.split("-")[0], 10);
      tempProducts = tempProducts.filter((product) => product.rating >= rating);
    }
    if (selectedGenders.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedGenders.includes(product.gender)
      );
    }
    if (selectedPriceRange) {
      let [min, max] = selectedPriceRange.replace("$", "").split("-").map(Number);
      tempProducts = tempProducts.filter(
        (product) => product.price >= min && (!max || product.price <= max)
      );
    }
    if (customPriceRange.min || customPriceRange.max) {
      const min = customPriceRange.min ? parseFloat(customPriceRange.min) : 0;
      const max = customPriceRange.max ? parseFloat(customPriceRange.max) : Infinity;
      tempProducts = tempProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }
    if (sortBy) {
      tempProducts = tempProducts.sort((a, b) => {
        if (sortBy === "priceLowHigh") return a.price - b.price;
        if (sortBy === "priceHighLow") return b.price - a.price;
        if (sortBy === "mostRated") return b.rating - a.rating;
        return 0;
      });
    }

    return tempProducts;
  }, [selectedRating, selectedGenders, selectedPriceRange, customPriceRange, sortBy, productsByCategoryAll]);

  // Set filtered products whenever filters change
  useEffect(() => {
    setFilteredProducts(filteredProductsMemo);
  }, [filteredProductsMemo]);


    // Define breadcrumb items
    const breadcrumbItems = [
      { label: <><FaHome className="inline mr-1" /> Home</>, link: "/" },
      { label: `${categoryName}`, link: `/category/${categoryName}` },
    ];

  return (
    <div>
      <BreadcrumbComponent items={breadcrumbItems} />
    <div className="container mx-auto px-4">
      <div className="text-2xl font-bold mt-6">{categoryName}</div>
      <div className="my-4">
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

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/5 p-4">
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

        <div className="md:flex-1 p-4">
          <hr className="border-t-2 border-gray-300 mb-6" />
          {filteredProducts.length > 0 ? (
            <CategoryProducts productsByCategoryAll={filteredProducts} />
          ) : (
            <p className="text-center text-gray-500">No products match your criteria.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ManageAllCategory;
