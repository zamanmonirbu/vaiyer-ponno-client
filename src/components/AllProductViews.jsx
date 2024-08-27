import BannerAndOfferView from "./BannerAndOfferView";
import CategoryProductView from "./CategoryProductView";
import FeaturedImage from "./FeaturedImage";
import MostLovedCategories from "./MostLovedCategories ";

const AllProductViews = () => {
    return (
        <div className="bg-gray-200">
            <MostLovedCategories/>
            <CategoryProductView/>
            <BannerAndOfferView/>
            <FeaturedImage/>
        </div>
    );
};

export default AllProductViews;