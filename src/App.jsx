import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "./seller/charts/ChartjsConfig";
import "./seller/css/style.css";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminPrivateRoute from "./components/Admin/AdminPrivateRoute";
import AdminRegister from "./components/Admin/AdminRegister";
import BannerManager from "./components/Admin/BannerManager";
// import CategoryInput from "./components/Admin/CategoryInput";
import ManageGallery from "./components/Admin/ManageGallery";
import CategoryView from "./components/CategoryView";
import ViewFilterProducts from "./components/Filter/ViewFilterProducts";
import ProductView from "./components/Product/ProductView";
import ProductInput from "./components/Seller/ProductInput";
import ProductManager from "./components/Seller/ProductManager";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerPrivateRoute from "./components/Seller/SellerPrivateRoute";
import SellerRegister from "./components/Seller/SellerRegister";
import UserProfile from "./components/UserProfile/UserProfile";
import UserLogin from "./components/UserProfile/UserLogin";
import UserPrivateRoute from "./components/UserProfile/UserPrivateRoute";
import UserRegister from "./components/UserProfile/UserRegister";
import SellerDashboard from "./seller/pages/SellerDashboard";
import AdminCategory from "./admin/pages/ManageCategory";
import Admins from "./components/Admin/Admins";
// import ManageRequestAdmin from "./admin/pages/ManageRequestAdmin";
import AdminRequests from "./components/Admin/AdminRequests";
import ManageRequestAdmin from "./admin/pages/ManageRequestAdmin";
import ManageAdmin from "./admin/pages/ManageAdmin";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/seller/register" element={<SellerRegister />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/category/:category" element={<ViewFilterProducts />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/seller/profile" element={<ProductManager />} />
      <Route path="/product/view" element={<ProductView />} />
      {/* <Route path="/input/category" element={<CategoryInput />} /> */}
      <Route path="/admin/dashboard/category" element={<AdminCategory/>} />
      <Route path="/input/product" element={<ProductInput />} />
      <Route path="/view/category" element={<CategoryView />} />
      <Route path="/view/banner" element={<BannerManager />} />
      <Route path="/view/gallery" element={<ManageGallery />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/dashboard/all/admin" element={<ManageAdmin/>} />
      <Route path="/admin/dashboard/request/admin" element={<ManageRequestAdmin/>} />

      {/* Private Routes for Users */}
      <Route element={<UserPrivateRoute />}>
        {/* <Route path="/seller/dashboard" element={<SellerDashboard />} /> */}
      </Route>

      {/* Private Routes for Seller */}
      <Route element={<SellerPrivateRoute />}>
        {/* <Route path="/seller/dashboard" element={<SellerDashboard />} /> */}
      </Route>

      {/* Private Routes for Admins */}
      <Route element={<AdminPrivateRoute />}>
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Route>

      {/* Redirect to Home if no route matches */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
