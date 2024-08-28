import { Link } from "react-router-dom";
import CategoryBanner from "../components/CategoryBanner";
import AllProductViews from "../components/AllProductViews";
import Footer from "../components/Footer";
import GalleryGrid from "../components/GalleryGrid";
const PageLayout = () => {
    return (
        <div className="px-[3%] bg-white">
            <GalleryGrid/>
            <CategoryBanner/>  
            <AllProductViews/>
            <Link to={'/dashboard'} className="text-green-500">User Dashboard</Link>
            <Footer/>
        </div>
    );
};

export default PageLayout;