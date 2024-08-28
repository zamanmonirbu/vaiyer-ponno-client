import BannerAndOfferView from "./BannerAndOfferView";
import CategoryProductView from "./CategoryProductView";
import FeaturedImage from "./FeaturedImage";
import MostLovedCategories from "./CategoriesHorizontal ";

const AllProductViews = () => {
    return (
        <div className="bg-white">
            <MostLovedCategories/>
            <CategoryProductView/>
            <BannerAndOfferView/>
            <FeaturedImage/>
        </div>
    );
};

export default AllProductViews;