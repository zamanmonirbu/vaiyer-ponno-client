import AllProductViews from "./AllProductViews";
import Footer from "./Footer";
import GalleryGrid from "./GalleryGrid";
const PageLayout = () => {
  return (
    <div className="px-[3%] bg-white">
      <GalleryGrid />
      <AllProductViews />
      <Footer />
    </div>
  );
};

export default PageLayout;
