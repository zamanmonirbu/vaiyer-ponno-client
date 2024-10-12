import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminMain from "./admin/AdminMain";
import FilterComponent from "./components/Filter/FilterComponent";
import Checkout from "./components/Product/Checkout";
import PaymentCancel from "./components/Product/PaymentCancel";
import PaymentFail from "./components/Product/PaymentFail";
import PaymentSuccess from "./components/Product/PaymentSuccess";
import ProductView from "./components/Product/ProductView";
import SuggestProducts from "./components/Product/SuggestProducts";
import ViewProductsOnCart from "./components/Product/ViewProductsOnCart";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerProfile from "./components/Seller/SellerProfile";
import SellerRegister from "./components/Seller/SellerRegister";
import UserDashboard from "./components/User/UserDashboard";
import UserLogin from "./components/User/UserLogin";
import UserRegister from "./components/User/UserRegister";
import Home from "./pages/Home";
import ManageAllCategory from "./pages/ManageAllCategory";
import SellerApp from "./seller/SellerApp";
import CartPage from "./pages/CartPage";
import CategoryFourProduct from "./pages/CategoryFourProduct";
import NotFound from "./components/Utilities/NotFound";
import AdminLogin from "./admin/ManageAdmin/AdminLogin";


function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.adminReducer);
  const { seller } = useSelector((state) => state.seller);
  const location = useLocation();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<FilterComponent />} />
        <Route path="/category/:categoryName" element={<ManageAllCategory />} />
        <Route path="/seller/:id" element={<SellerProfile />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/user/product/cart" element={<ViewProductsOnCart />} />
        <Route path="/get/category" element={<CategoryFourProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route
          path="/test/suggest"
          element={<SuggestProducts id={"67098efbee7480d6ffd56f99"} />}
        />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            currentUser ? (
              <UserDashboard />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />

        <Route
          path="/user/register"
          element={
            currentUser ? <Navigate to="/user/dashboard" /> : <UserRegister />
          }
        />
        <Route
          path="/user/:id/cart"
          element={
            currentUser ? (
              <ViewProductsOnCart />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            currentUser ? (
              <Checkout />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/payment/success/:id"
          element={
            currentUser ? (
              <PaymentSuccess />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/payment/fail/:id"
          element={
            currentUser ? (
              <PaymentFail />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/payment/cancel/:id"
          element={
            currentUser ? (
              <PaymentCancel />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />

        {/* seller Routes  */}
        <Route
          path="/seller/*"
          element={
            seller ? (
              <SellerApp />
            ) : (
              <Navigate to="/seller/login" state={{ from: location }} />
            )
          }
        />
        {/* Admin Routes  */}
        <Route
          path="/admin/*"
          element={
            admin ? (
              <AdminMain />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
