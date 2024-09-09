import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../actions/productActions";
import { useEffect } from "react";
// import ProductDetails from "./Product/ProductDetails";

const ProductGridView = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleProductClick = (productId) => {
    // Navigate to the specific product view
    navigate(`/product/${productId}`);
  };

  // Arrange products in a 4-column layout
  const columns = [];
  for (let i = 0; i < products.length; i += 4) {
    columns.push(products.slice(i, i + 4));
  }

  // console.log(products);

  return (
    <div>
      <h3 className="font-bold mb-4 text-2xl text-center">
        <span className="text-yellow-400">Latest Loved </span>Product Details
      </h3>
      <div className="flex w-full flex-wrap justify-between">
        {columns?.map((column, colIndex) => (
          <div
            key={colIndex}
            className="w-1/4 px-2 mb-4 transition-opacity duration-500"
          >
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-1">
                {column.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border rounded-lg p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-full h-32 object-cover mb-4"
                    />
                    <div className="text-sm text-gray-600">
                      {product.name.length > 15
                        ? product.name.slice(0, 20) + "..."
                        : product.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGridView;
