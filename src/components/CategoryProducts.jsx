import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CategoryProducts = ({ productsByCategoryAll }) => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          productsByCategoryAll.length > 0 ? (
            productsByCategoryAll?.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.name.substring(0, 50)}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2">
                      {product.description.substring(0, 50)}...
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        ৳{product.unitPrice}
                      </span>
                    </div>
                    <a
                      href={product.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-4 text-blue-500 underline"
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products in this subcategory</p>
          )
        }
      </div>
    </div>
  );
};

CategoryProducts.propTypes = {
  productsByCategoryAll: PropTypes.array.isRequired, // PropTypes.arrayOf(PropTypes.object) if each product is an object
};

export default CategoryProducts;
