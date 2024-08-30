import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageAdmin from "./admin/pages/ManageAdmin";
import ManageBanner from "./admin/pages/ManageBanner";
import AdminCategory from "./admin/pages/ManageCategory";
import ManageNotification from "./admin/pages/ManageNotification";
import ManageRequestAdmin from "./admin/pages/ManageRequestAdmin";
import ManageRequestSeller from "./admin/pages/ManageRequestSeller";
import ManageGallery from "./admin/pages/ManageGallery";
import ManageSeller from "./admin/pages/ManageSeller";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";
import ViewFilterProducts from "./components/Filter/ViewFilterProducts";
import NotFound from "./components/NotFound";
import ProductView from "./components/Product/ProductView";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerManager from "./components/Seller/SellerManager";
import SellerRegister from "./components/Seller/SellerRegister";
import SellerRequests from "./components/Seller/SellerRequests";
import UserLogin from "./components/UserProfile/UserLogin";
import UserProfile from "./components/UserProfile/UserProfile";
import UserRegister from "./components/UserProfile/UserRegister";
import Home from "./pages/Home";
import "./seller/charts/ChartjsConfig";
import "./seller/css/style.css";
import SellerDashboard from "./seller/pages/SellerDashboard";
import InputProductSeller from "./seller/pages/InputProductSeller";
import SellerProfile from "./components/Seller/SellerProfile";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const admin = useSelector((state) => state.adminLogin.adminInfo);
  const seller = useSelector((state) => state.seller.seller);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<ViewFilterProducts />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/product/view" element={<ProductView />} />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={user ? <SellerDashboard /> : <Navigate to="/user/login" />}
        />
        <Route
          path="/user/login"
          element={user ? <Navigate to="/seller/dashboard" /> : <UserLogin />}
        />
        <Route
          path="/user/register"
          element={
            user ? <Navigate to="/seller/dashboard" /> : <UserRegister />
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller/dashboard"
          element={
            seller ? <SellerDashboard /> : <Navigate to="/seller/login" />
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
          element={seller ? <InputProductSeller/> : <SellerLogin />}
        />
        <Route
          path="/seller/profile/:id"
          element={seller ? <SellerProfile/> : <SellerLogin />}
        />
        

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={admin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
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
          element={admin ? <ManageAdmin /> : <AdminLogin />}
        />
        <Route
          path="/admin/dashboard/request/admin"
          element={admin ? <ManageRequestAdmin /> : <AdminLogin />}
        />
        <Route
          path="/admin/dashboard/category"
          element={admin ? <AdminCategory /> : <AdminLogin />}
        />
        <Route
          path="/admin/dashboard/manage/banner"
          element={admin ? <ManageBanner /> : <AdminLogin />}
        />
        <Route
          path="/admin/dashboard/manage/gallery"
          element={admin ?<ManageGallery/>  : <AdminLogin />}
        />
        <Route
          path="/admin/dashboard/notification"
          element={admin ? <ManageNotification /> : <AdminLogin />}
        />
        <Route
          path="/admin/dashboard/request/seller"
          element={admin ? <ManageRequestSeller /> : <AdminLogin />}
        />
        <Route
          path="/admin/dashboard/view/seller"
          element={admin ? <ManageSeller /> : <AdminLogin />}
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
