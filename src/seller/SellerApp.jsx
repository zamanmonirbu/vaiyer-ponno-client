import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import Ecommerce from "./pages/Ecommerce";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerById } from "../actions/sellerActions";
import ProductManager from "../components/Seller/ProductManager";
import SellerAdmin from "./pages/SellerAdmin";
import { getCookie } from "../actions/cookieUtils";

function SellerApp() {
  const location = useLocation();
  const dispatch = useDispatch();
  const {seller} = useSelector((state) => state.seller);

  useEffect(() => {
    const sellerAuth = JSON.parse(getCookie("sellerAuth"));

    if (sellerAuth && sellerAuth.id) {
      dispatch(fetchSellerById(sellerAuth.id)); 
    } else {
      console.error("Seller not authenticated");
    }
  }, [dispatch]);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  // console.log(seller)

  return (
    <Dashboard seller={seller}>
      <Routes>
        <Route path="/dashboard/test" element={<Ecommerce/>} />
        <Route path="/input/product" element={<ProductManager seller={seller} />}  />
        <Route path="/profile/test" element={<SellerAdmin seller={seller} />}  />
      </Routes>
    </Dashboard>
  );
}

export default SellerApp;
