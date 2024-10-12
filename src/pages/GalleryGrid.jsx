import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGalleryItems } from "../actions/galleryActions";

const GalleryGrid = () => {
  const dispatch = useDispatch();
  const galleryItems = useSelector((state) => state.galleryItems.galleryItems);

  useEffect(() => {
    dispatch(fetchGalleryItems());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 py-4">
      {galleryItems?.map((item) => {
        const gridClasses = item.isLarge
          ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2"
          : item.isMedium
            ? "col-span-2 lg:col-span-1"
            : "col-span-1";

        return (
          <Link
            key={item._id}
            to={`/category/${item.category}`}
            className={`relative min-h-[150px] ${gridClasses} rounded-lg overflow-hidden flex items-center justify-center p-4 text-white transition-transform duration-300 ease-in-out transform hover:scale-105`}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 bg-black bg-opacity-50 p-4 rounded-lg">
              <div style={{ color: item.color }} className="text-center">
                <h2 className="text-xl font-semibold">{item.text}</h2>
                <p>{item.subText}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default GalleryGrid;
