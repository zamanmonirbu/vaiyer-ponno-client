import BannerAndOfferView from "./BannerAndOfferView";
import CategoriesHorizontal from "./CategoriesHorizontal ";
import CategoryBanner from "./CategoryBanner";
import GetCategoriesWithLimitedProducts from "./getCategoriesWithLimitedProducts";
import ProductGridView from "./ProductGridView";
import MostRatedProducts from "./Seller/MostRatedProducts";

const AllProductViews = () => {
  return (
    <div className="bg-white">
      <CategoriesHorizontal />
      <ProductGridView/>
      <CategoryBanner />
      <MostRatedProducts/>
      <BannerAndOfferView />
      <GetCategoriesWithLimitedProducts/>
    </div>
  );
};

export default AllProductViews;
