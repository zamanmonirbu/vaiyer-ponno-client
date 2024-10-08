import HighOffersProduct from "./HighOffersProduct";
import CategoriesHorizontal from "./CategoriesHorizontal ";
import CategoryAdds from "./CategoryAdds";
import CategoryFourProduct from "./CategoryFourProduct";
import LatestProduct from "./LatestProduct";
import MostRatedProducts from "./Seller/MostRatedProducts";

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
