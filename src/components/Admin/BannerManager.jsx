import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBanner,
  deleteBanner,
  getBanners,
} from "../../actions/bannerActions";

const BannerManager = () => {
  const [bannerUrl, setBannerUrl] = useState("");
  const dispatch = useDispatch();
  const { banners, error } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleAddBanner = () => {
    if (bannerUrl) {
      dispatch(createBanner(bannerUrl));
      setBannerUrl("");
    } else {
      alert("Please enter a banner URL.");
    }
  };

  const handleDeleteBanner = (id) => {
    dispatch(deleteBanner(id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Banner Manager</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          placeholder="Enter banner URL"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddBanner}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Banner
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        <h3 className="text-xl mb-2">Current Banners:</h3>
        <ul className="list-disc pl-6">
          {banners.map((banner) => (
            <li
              key={banner._id}
              className="flex justify-between items-center mb-2"
            >
              <a
                href={banner.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <img src={banner.imageUrl} alt="" />
              </a>
              <button
                onClick={() => handleDeleteBanner(banner._id)}
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BannerManager;
