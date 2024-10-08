import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageAdmin from "./admin/pages/ManageAdmin";
import ManageBanner from "./admin/pages/ManageBanner";
import AdminCategory from "./admin/pages/ManageCategory";
import ManageGallery from "./admin/pages/ManageGallery";
import ManageNotification from "./admin/pages/ManageNotification";
import ManageRequestAdmin from "./admin/pages/ManageRequestAdmin";
import ManageRequestSeller from "./admin/pages/ManageRequestSeller";
import ManageSeller from "./admin/pages/ManageSeller";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";
import InputBannerOffer from "./components/Admin/InputBannerOffer";
import CartPage from "./components/CartPage";
import LimitedProducts from "./components/CategoryFourProduct";
import FilterComponent from "./components/Filter/FilterComponent";
import LocationPage from "./components/LocationPage";
import ManageAllCategory from "./components/ManageAllCategory";
import NotFound from "./components/NotFound";
import Checkout from "./components/Product/Checkout";
import PaymentCancel from "./components/Product/PaymentCancel";
import PaymentFail from "./components/Product/PaymentFail";
import PaymentSuccess from "./components/Product/PaymentSuccess";
import ProductView from "./components/Product/ProductView";
import ViewProductsOnCart from "./components/Product/ViewProductsOnCart";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerManager from "./components/Seller/SellerManager";
import SellerProfile from "./components/Seller/SellerProfile";
import SellerRegister from "./components/Seller/SellerRegister";
import SellerRequests from "./components/Seller/SellerRequests";
import UserDashboard from "./components/UserProfile/UserDashBoard";
import UserLogin from "./components/UserProfile/UserLogin";
import UserRegister from "./components/UserProfile/UserRegister";
import VisitUserProfile from "./components/UserProfile/VisitUserProfile";
import Home from "./pages/Home";
import "./seller/charts/ChartjsConfig";
import "./seller/css/style.css";
import InputProductSeller from "./seller/pages/InputProductSeller";
import SellerDashboard from "./seller/pages/SellerDashboard";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const admin = useSelector((state) => state.adminLogin.adminInfo);
  const seller = useSelector((state) => state.seller.seller);
  const location = useLocation(); // capture the current location

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<FilterComponent />} />
        <Route path="/category/:categoryName" element={<ManageAllCategory />} />
        <Route path="/user/profile/:userId" element={<VisitUserProfile />} />
        <Route path="/seller/:id" element={<SellerProfile />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/input/banner" element={<InputBannerOffer />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/user/product/cart" element={<ViewProductsOnCart />} />

        <Route path="/get/category" element={<LimitedProducts />} />
        <Route path="/cart" element={<CartPage />} />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            user ? (
              <UserDashboard />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/user/login"
          element={user ? <UserLogin /> : <UserLogin />}
        />
        <Route
          path="/user/register"
          element={user ? <UserLogin /> : <UserRegister />}
        />
        <Route
          path="/user/:id/cart"
          element={
            user ? (
              <ViewProductsOnCart />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/payment/success/:id"
          element={
            user ? (
              <PaymentSuccess />
            ) : (
              <Navigate to="/user/login" state={{ from: location }} />
            )
          }
        />
        <Route path="/payment/fail/:id" element={<PaymentFail />} />
        <Route path="/payment/cancel/:id" element={<PaymentCancel />} />

        {/* Seller Routes */}
        <Route
          path="/seller/dashboard"
          element={
            seller ? (
              <SellerDashboard />
            ) : (
              <Navigate to="/seller/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/seller/login"
          element={
            seller ? <Navigate to="/seller/dashboard" /> : <SellerLogin />
          }
        />
        <Route
          path="/seller/register"
          element={
            seller ? <Navigate to="/seller/dashboard" /> : <SellerRegister />
          }
        />
        <Route
          path="/seller/dashboard/input/product"
          element={
            seller ? (
              <InputProductSeller />
            ) : (
              <Navigate to="/seller/login" state={{ from: location }} />
            )
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            admin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/admin/login"
          element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
        />
        <Route
          path="/admin/register"
          element={
            admin ? <Navigate to="/admin/dashboard" /> : <AdminRegister />
          }
        />
        <Route
          path="/admin/dashboard/all/admin"
          element={
            admin ? (
              <ManageAdmin />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/admin/dashboard/request/admin"
          element={
            admin ? (
              <ManageRequestAdmin />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/admin/dashboard/category"
          element={
            admin ? (
              <AdminCategory />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/admin/dashboard/manage/banner"
          element={
            admin ? (
              <ManageBanner />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/admin/dashboard/manage/gallery"
          element={
            admin ? (
              <ManageGallery />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/admin/dashboard/notification"
          element={
            admin ? (
              <ManageNotification />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/admin/dashboard/request/seller"
          element={
            admin ? (
              <ManageRequestSeller />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />
        <Route
          path="/admin/dashboard/view/seller"
          element={
            admin ? (
              <ManageSeller />
            ) : (
              <Navigate to="/admin/login" state={{ from: location }} />
            )
          }
        />

        <Route path="/view/seller" element={<SellerManager />} />
        <Route path="/request/seller" element={<SellerRequests />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
