import MostRatedProducts from "../components/Seller/MostRatedProducts";
import CategoriesHorizontal from "./CategoriesHorizontal ";
import CategoryAdds from "./CategoryAdds";
import CategoryFourProduct from "./CategoryFourProduct";
import HighOffersProduct from "./HighOffersProduct";
import LatestProduct from "./LatestProduct";

const AllProductViews = () => {
  return (
    <div className="bg-white">
      <CategoriesHorizontal />
      <CategoryFourProduct />
      <CategoryAdds />
      <MostRatedProducts />
      <HighOffersProduct />
      <LatestProduct />
    </div>
  );
};

export default AllProductViews;
