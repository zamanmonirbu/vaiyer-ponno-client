import BannerAndOfferView from "./BannerAndOfferView";
import MostLovedCategories from "./CategoriesHorizontal ";
import CategoryBanner from "./CategoryBanner";
import FeaturedImage from "./FeaturedImage";
import CategoryProductView from "./Seller/CategoryProductView";

const AllProductViews = () => {
  return (
    <div className="bg-white">
      <MostLovedCategories />
      <CategoryBanner />
      <CategoryProductView />
      <BannerAndOfferView />
      <FeaturedImage />
    </div>
  );
};

export default AllProductViews;
