import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getProduct } from "../../actions/productActions";
import SuggestProducts from "./SuggestProducts";
import ViewSpecificProduct from "./ViewSpecificProduct";
import BreadcrumbComponent from "../Utilities/BreadcrumbComponent";
import { FaHome } from "react-icons/fa"; // Import the home icon

const ProductView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const { product, loading, error } = useSelector((state) => state.product);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading</p>
        <ClipLoader color={"#123abc"} loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // Define breadcrumb items with home icon
  const breadcrumbItems = [
    { label: <><FaHome className="inline mr-1" /> Home</>, link: "/" },
    { label: `${product?.category?.name}`, link: `/category/${product?.category?.name}` },
    { label: "Product", link: `/product/${product?._id}` },
  ];

  return (
    <div>
      {/* Use the breadcrumb component */}
      <BreadcrumbComponent items={breadcrumbItems} />
      
      {product && <ViewSpecificProduct product={product} />}
      <SuggestProducts id={id} />
    </div>
  );
};

export default ProductView;
