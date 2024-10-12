import Footer from "../components/Utilities/Footer";
import AllProductViews from "./AllProductViews";
import GalleryGrid from "./GalleryGrid";

const PageLayout = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-[3%] bg-white">
      <GalleryGrid />
      <AllProductViews />
      <Footer />
    </div>
  );
};

export default PageLayout;
