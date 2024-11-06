import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners"; // Import react spinner
import { getBanners } from "../actions/bannerActions";

const CategoryAdds = () => {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.banner.banners);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <PulseLoader color="#033B4C" size={15} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative w-full h-96 my-4 group">
      {banners.length > 0 && (
        <div className="relative h-full w-full ml-4 transition-opacity duration-300  hover:opacity-80">
          <img
            src={banners[0]?.imageUrl} // Use the first banner only
            alt="Banner"
            className="h-full w-full mx-auto object-cover"
          />
          {/* Overlay Div */}
          <div className="absolute inset-0  opacity-30 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link to="/about/us" className="px-4 py-2 bg-teal-500 text-white rounded-md">
              About Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryAdds;
