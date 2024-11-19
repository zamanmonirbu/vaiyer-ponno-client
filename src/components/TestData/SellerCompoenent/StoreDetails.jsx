import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStore } from '../../../actions/sellerActions'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeId,name } = useParams(); // Extract store ID from URL params

  // Fetch store data and products from Redux
  const { store, loading, error } = useSelector((state) => state.seller);

  // Fetch specific store details and products on component mount
  useEffect(() => {
    dispatch(fetchStore(storeId));
  }, [dispatch, storeId]);

  useEffect(() => {
    if (error) toast.error(`Error: ${error}`, { autoClose: 2000 });
  }, [error]);

  // Handle navigation to add product page
  const handleAddProduct = () => {
    navigate(`/seller/store/${storeId}/${name}/add-product`);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <ToastContainer /> 
      {loading ? (
        <p className="text-gray-500">Loading store...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold py-4 bg-white w-full text-center">{name} Store</h2>
          <button
            onClick={handleAddProduct}
            className="bg-[#3b4b61] text-white px-4 py-2 rounded-md mb-6 hover:bg-[#1e2733] transition w-full"
          >
            Add Product
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {store?.products && store.products.length > 0 ? (
              store.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-gray-500 mt-2">Price: ${product.price}</p>
                  <p className="text-gray-500 mt-2">Stock: {product.stock}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products available in this store.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StoreDetails;
