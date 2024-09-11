import AllProductViews from "../components/AllProductViews";
import Footer from "../components/Footer";
import GalleryGrid from "../components/GalleryGrid";
const PageLayout = () => {
    return (
        <div className="px-[3%] bg-white">
            <GalleryGrid/>
            <AllProductViews/>
            <Footer/>
        </div>
    );
};

export default PageLayout;