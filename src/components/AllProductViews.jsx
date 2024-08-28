import BannerAndOfferView from "./BannerAndOfferView";
import CategoryProductView from "./CategoryProductView";
import FeaturedImage from "./FeaturedImage";
import MostLovedCategories from "./CategoriesHorizontal ";
import CategoryBanner from "./CategoryBanner";

const AllProductViews = () => {
    return (
        <div className="bg-white">
            <MostLovedCategories/>
            <CategoryBanner/>
            <CategoryProductView/>
            <BannerAndOfferView/>
            <FeaturedImage/>
        </div>
    );
};

export default AllProductViews;