import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getSellerProducts } from "../../actions/productActions";
import AddProduct from "./AddProduct";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    dispatch(getSellerProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setIsEditing(true);
    setProductToEdit(product);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
  };

  const handleSuccess = () => {
    setIsEditing(false);
    setProductToEdit(null);
    dispatch(getSellerProducts());
  };

  return (
    <div>
      <h2>Product List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            <span>{prod.name}</span>
            <button onClick={() => handleEdit(prod)}>Edit</button>
            <button onClick={() => handleDelete(prod._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isEditing ? (
        <AddProduct
          productToEdit={productToEdit}
          setEditing={setIsEditing}
          onSuccess={handleSuccess}
        />
      ) : (
        <AddProduct setEditing={setIsEditing} onSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default ProductList;
