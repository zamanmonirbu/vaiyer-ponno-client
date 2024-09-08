import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StrikeLine from "./StrikeLine";
import { getOfferBanners } from "../actions/offerBannerActions";
import { getProductsWithHighOffer } from "../actions/productActions";
import { Link } from "react-router-dom";

const BannerAndOfferView = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfferBanners());
    dispatch(getProductsWithHighOffer());
  }, [dispatch]);

  const {
    offerBanners,
    loading: bannerLoading,
    error: bannerError,
  } = useSelector((state) => state.offerBanner);
  const {
    highOfferProducts,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (offerBanners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % offerBanners.length);
      }, 3000); // Change banner every 3 seconds

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [offerBanners]);

  const handleNextProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct + 1) % highOfferProducts.length);
  };

  const handlePrevProduct = () => {
    setCurrentProduct(
      (prevProduct) => (prevProduct - 1 + highOfferProducts.length) % highOfferProducts.length
    );
  };

  return (
    <div>
      <StrikeLine />
      <h3 className="font-bold mb-4 text-2xl text-center">
        <span className="text-yellow-400">High Offers </span>Product Details
      </h3>

      <div className="flex w-full p-4 space-x-4">
        {/* Left Side: Rotating Banner */}
        <div className="w-1/5 h-64 relative">
          {bannerLoading ? (
            <p>Loading...</p>
          ) : bannerError ? (
            <p>Error: {bannerError}</p>
          ) : (
            offerBanners.length > 0 && (
              <div className="relative">
                <img
                  src={offerBanners[currentBanner]?.imageUrl}
                  alt={`Banner ${currentBanner + 1}`}
                  className="w-full h-72 object-cover rounded-lg"
                />
              </div>
            )
          )}
        </div>

        {/* Right Side: Offered Products */}
        <div className="w-4/5 relative">
          {productLoading ? (
            <p>Loading...</p>
          ) : productError ? (
            <p>Error: {productError}</p>
          ) : (
            <div className="relative overflow-hidden">
              <div
                className="flex space-x-4"
                style={{
                  transform: `translateX(-${currentProduct * 100}%)`,
                  transition: "transform 0.3s ease",
                }}
              >
                {highOfferProducts.map((product) => (
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <div className="bg-white border rounded-lg p-4 w-72 flex-shrink-0">
                      <img
                        src={product.imageURL}
                        alt={product.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                      />
                      <div className="text-lg font-semibold mb-2">
                        {product.name.substring(0, 50)}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="w-1/2">
                          <div className="text-lg font-bold line-through">
                            ${product.unitPrice}
                          </div>
                        </div>
                        <div className="text-yellow-500 ">
                          ★ {product.rating}
                        </div>
                        <div className="text-sm text-gray-500 ml-2">
                          ({product.reviews || 0})
                        </div>
                      </div>
                      <span className="text-sm text-green-600 mb-1">
                        ${Math.round(
                          product.unitPrice - product.unitPrice * (product.offer / 100)
                        )}{" "}
                        with {product.offer}% off
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Previous Button */}
              <button
                onClick={handlePrevProduct}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full mr-8"
              >
                &#8249; {/* Left-pointing triangle */}
              </button>
              {/* Next Button */}
              <button
                onClick={handleNextProduct}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
              >
                &#8250; {/* Right-pointing triangle */}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerAndOfferView;
