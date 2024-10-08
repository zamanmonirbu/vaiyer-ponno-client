import { useParams } from "react-router-dom";
import AllNavSections from "../AllNavSections";
import ViewSpecificProduct from "./ViewSpecificProduct";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productActions";
import { ClipLoader } from "react-spinners"; // Importing ClipLoader spinner

const ProductView = () => {
  const { id } = useParams(); // Fetching the product ID from the URL parameters
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const { product, loading, error } = useSelector((state) => state.product);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading</p>
        <ClipLoader color={"#123abc"} loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <AllNavSections />
      {/* Ensure that the product exists before rendering */}
      {product && <ViewSpecificProduct product={product} />}
    </div>
  );
};

export default ProductView;
