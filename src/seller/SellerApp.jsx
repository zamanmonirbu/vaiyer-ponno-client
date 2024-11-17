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
import SellerChat from "../messenger/pages/Chat/SellerChat";
import TaskComponent from "../pages/ToDo";
import SellerOrders from "../pages/SellerOrders";
import CreateStore from "../components/Seller/CreateStore";
import ViewStores from "../components/Seller/ViewStores";
import StoreDetails from "../components/Seller/StoreDetails";
import AddProduct from "../components/Seller/AddProduct";
import OrderNotification from "./components/OrderNotification";
import OrderAccept from "../pages/OrderAccept";
import OrderSentToCourier from "../pages/OrderSentToCourier";
import OrderDecline from "../pages/OrderDecline";

function SellerApp() {
  // const socket = io("http://localhost:8800", {
  //   autoConnect: false, // Initialize but don't connect automatically
  //   reconnection: true, // Enables reconnection attempts
  //   reconnectionAttempts: 5, // Maximum reconnection attempts
  //   reconnectionDelay: 1000, // Delay between reconnections (1 second)
  // });

  const location = useLocation();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    const sellerCookie = getCookie("sellerAuth");
    const sellerAuth = sellerCookie ? JSON.parse(sellerCookie) : null;

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
  }, [location.pathname]);

  return (
    <Dashboard seller={seller}>
      <Routes>
        <Route path="/dashboard/test" element={<Ecommerce />} />
        <Route path="/input/product" element={<ProductManager seller={seller} />} />
        <Route path="/store/:storeId/:storeName/add-product" element={<AddProduct seller={seller} />} />
        <Route path="/store/:storeId/:name" element={<StoreDetails seller={seller} />} />
        <Route path="/profile/test" element={<SellerAdmin seller={seller} />} />
        <Route path="/s-c/chat/box" element={<SellerChat seller={seller} />} />
        <Route path="/dashboard/task" element={<TaskComponent seller={seller} />} />
        <Route path="/request/orders" element={<SellerOrders seller={seller} />} />
        <Route path="/complete/orders" element={<SellerOrders seller={seller} />} />
        <Route path="/cancel/orders" element={<OrderDecline seller={seller} />} />
        <Route path="/accept/orders" element={<OrderAccept seller={seller} />} />
        <Route path="/sent/curriar/orders" element={<OrderSentToCourier seller={seller} />} />
        <Route path="/store/create" element={<CreateStore seller={seller} />} />
        <Route path="/store/view" element={<ViewStores seller={seller} />} />
        <Route path="/test/order" element={<OrderNotification sellerId={seller?._id} />} />
      </Routes>
    </Dashboard>
  );
}

export default SellerApp;
