import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Import your components
import AdminMain from "./admin/AdminMain";
import AdminLogin from "./admin/ManageAdmin/AdminLogin";
import FilterComponent from "./components/Filter/FilterComponent";
import MainLayout from "./components/layouts/MainLayout";
import Checkout from "./components/Product/Checkout";
import PaymentCancel from "./components/Product/PaymentCancel";
import PaymentFail from "./components/Product/PaymentFail";
import PaymentSuccess from "./components/Product/PaymentSuccess";
import ProductView from "./components/Product/ProductView";
import ViewProductsOnCart from "./components/Product/ViewProductsOnCart";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerProfile from "./components/Seller/SellerProfile";
import SellerRegister from "./components/Seller/SellerRegister";
import UserDashboard from "./components/User/UserDashboard";
import UserLogin from "./components/User/UserLogin";
import UserRegister from "./components/User/UserRegister";
import NotFound from "./components/Utilities/NotFound";
import Chat from "./messenger/pages/Chat/Chat";
import CartPage from "./pages/CartPage";
import CategoryFourProduct from "./pages/CategoryFourProduct";
import HistoryProductView from "./pages/HistoryProductView";
import ManageAllCategory from "./pages/ManageAllCategory";
import SellerApp from "./seller/SellerApp";
import AuthLayout from "./components/layouts/AuthLayout";
import PageLayout from "./pages/PageLayout";
import NotificationList from "./pages/NotificationList";
import ProductSuggestion from "./pages/ProductSuggestion";
import VideoUploadComponent from "./pages/VideoUploadComponent";
import AboutUs from "./pages/AboutUs";
import TodayDeals from "./components/Nav/MenuBar/TodayDeals";
import CustomerService from "./components/Nav/MenuBar/CustomerService";
import Registry from "./components/Nav/MenuBar/Registry";
import GiftCards from "./components/Nav/MenuBar/GiftCards";
import Sell from "./components/Nav/MenuBar/Sell";
import CourierDashboard from "./courier/CourierDashboard";
import HomeViewDefault from "./courier/Utils/HomeViewDefault";
import CourierLogin from "./courier/AuthCourier/CourierLogin";
import CourierRegister from "./courier/AuthCourier/CourierRegister";
import CourierProfile from "./courier/Utils/CourierProfile";
import CourierTask from "./courier/Utils/CourierTask";
import VehicleTypeList from "./courier/Utils/VehicleTypeList";
import DeliveryManLogin from "./DeliveryMan/utilsDeliveryMan/DeliveryManLogin";
import DeliveryManRegister from "./DeliveryMan/utilsDeliveryMan/DeliveryManRegister";
import ViewHello from "./DeliveryMan/utilsDeliveryMan/ViewHello";
import DashboardDeliveryMan from "./DeliveryMan/DashbordDeliveryMan";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.adminReducer);
  const { seller } = useSelector((state) => state.seller);
  const { courierInfo } = useSelector((state) => state.courier);
  const { deliveryManInfo } = useSelector((state) => state.deliveryMan);
  const location = useLocation();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/deliveryman/login"
        element={
          <MainLayout>
            {/* <CourierLogin /> */}
            <DeliveryManLogin />
          </MainLayout>
        }
      />
      <Route
        path="/deliveryman/register"
        element={
          <MainLayout>
            {/* <CourierLogin /> */}
            <DeliveryManRegister />
          </MainLayout>
        }
      />

      <Route
        path="/deliveryMan/dashboard"
        element={
          deliveryManInfo ? (
            <DashboardDeliveryMan>
              <ViewHello/>
            </DashboardDeliveryMan>
          ) : (
            <Navigate to="/courier/login" />
          )
        }
      />

      <Route
        path="/courier/login"
        element={
          <MainLayout>
            <CourierLogin />
          </MainLayout>
        }
      />
      <Route
        path="/courier/register"
        element={
          <MainLayout>
            <CourierRegister />
          </MainLayout>
        }
      />

      {/* Courier Dashboard */}
      <Route
        path="/courier/dashboard"
        element={
          courierInfo ? (
            <CourierDashboard>
              <HomeViewDefault />
            </CourierDashboard>
          ) : (
            <Navigate to="/courier/login" />
          )
        }
      />

      {/* Courier Profile */}
      <Route
        path="/courier/profile"
        element={
          courierInfo ? (
            <CourierDashboard>
              <CourierProfile admin={courierInfo} />
            </CourierDashboard>
          ) : (
            <Navigate to="/courier/login" />
          )
        }
      />
      <Route
        path="/courier/dashboard/vehicle-types"
        element={
          courierInfo ? (
            <CourierDashboard>
              <VehicleTypeList admin={courierInfo} />
            </CourierDashboard>
          ) : (
            <Navigate to="/courier/login" />
          )
        }
      />

      <Route
        path="/courier/dashboard/courier/task"
        element={
          courierInfo ? (
            <CourierDashboard>
              <CourierTask seller={courierInfo} />
            </CourierDashboard>
          ) : (
            <Navigate to="/courier/login" />
          )
        }
      />

      {/* <Route
        path="/courier/orders/sent-to-courier"
        element={
          courierInfo ? (
            <CourierDashboard>
              <OrdersSentToCourier />
            </CourierDashboard>
          ) : (
            <Navigate to="/courier/login" />
          )
        }
      /> */}

      {/*    <Route
        path="/courier/orders/handed-to-delivery"
        element={
          courierInfo ? (
            <CourierDashboard>
              <OrdersHandedToDeliveryMan />
            </CourierDashboard>
          ) : (
            <Navigate to="/courier/login" />
          )
        }
      />

      <Route
        path="/courier/orders/completed"
        element={
          courierInfo ? (
            <CourierDashboard>
              <OrdersCompleted />
            </CourierDashboard>
          ) : (
            <Navigate to="/courier/login" />
          )
        }
      />  */}

      <Route
        path="/"
        element={
          <MainLayout>
            <PageLayout />
          </MainLayout>
        }
      />

      <Route
        path="/c-s/chat/box"
        element={
          currentUser ? (
            <MainLayout>
              <Chat />
            </MainLayout>
          ) : (
            <Navigate to="/user/login" />
          )
        }
      />

      <Route
        path="/upload/Video"
        element={
          <MainLayout>
            {/* <PageLayout /> */}
            <VideoUploadComponent />
          </MainLayout>
        }
      />
      <Route
        path="/about/us"
        element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        }
      />
      <Route
        path="/today-deals"
        element={
          <MainLayout>
            <TodayDeals />
          </MainLayout>
        }
      />
      <Route
        path="/customer-service"
        element={
          <MainLayout>
            <CustomerService />
          </MainLayout>
        }
      />
      <Route
        path="/registry"
        element={
          <MainLayout>
            <Registry />
          </MainLayout>
        }
      />
      <Route
        path="/gift-cards"
        element={
          <MainLayout>
            <GiftCards />
          </MainLayout>
        }
      />
      <Route
        path="/sell"
        element={
          <MainLayout>
            <Sell />
          </MainLayout>
        }
      />

      <Route
        path="/suggest/product/with/ai"
        element={
          <MainLayout>
            <ProductSuggestion />
          </MainLayout>
        }
      />
      <Route
        path="/show/all/notification"
        element={
          <MainLayout>
            {/* <PageLayout /> */}
            <NotificationList />
          </MainLayout>
        }
      />
      <Route
        path="/category"
        element={
          <MainLayout>
            <FilterComponent />
          </MainLayout>
        }
      />
      <Route
        path="/category/:categoryName"
        element={
          <MainLayout>
            <ManageAllCategory />
          </MainLayout>
        }
      />
      <Route
        path="/seller/:id"
        element={
          <MainLayout>
            <SellerProfile />
          </MainLayout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <MainLayout>
            <ProductView />
          </MainLayout>
        }
      />
      <Route
        path="/user/product/cart"
        element={
          <MainLayout>
            <ViewProductsOnCart />
          </MainLayout>
        }
      />
      <Route
        path="/get/category"
        element={
          <MainLayout>
            <CategoryFourProduct />
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <CartPage />
          </MainLayout>
        }
      />
      <Route
        path="/user/orders/return"
        element={
          <MainLayout>
            <HistoryProductView />
          </MainLayout>
        }
      />
      <Route
        path="/c-s/chat/box"
        element={
          currentUser ? (
            <MainLayout>
              <Chat />
            </MainLayout>
          ) : (
            <Navigate to="/user/login" />
          )
        }
      />

      {/* Auth Routes */}
      <Route
        path="/user/login"
        element={
          <AuthLayout>
            <UserLogin />
          </AuthLayout>
        }
      />
      <Route
        path="/user/register"
        element={
          currentUser ? (
            <Navigate to="/user/dashboard" />
          ) : (
            <AuthLayout>
              <UserRegister />
            </AuthLayout>
          )
        }
      />
      <Route
        path="/seller/login"
        element={
          <AuthLayout>
            <SellerLogin />
          </AuthLayout>
        }
      />
      <Route
        path="/seller/register"
        element={
          <AuthLayout>
            <SellerRegister />
          </AuthLayout>
        }
      />
      <Route
        path="/admin/login"
        element={
          <AuthLayout>
            <AdminLogin />
          </AuthLayout>
        }
      />

      {/* User Protected Routes */}
      <Route
        path="/user/dashboard"
        element={
          currentUser ? (
            <MainLayout>
              <UserDashboard />
            </MainLayout>
          ) : (
            <Navigate to="/user/login" state={{ from: location }} />
          )
        }
      />
      <Route
        path="/user/:id/cart"
        element={
          currentUser ? (
            <MainLayout>
              <ViewProductsOnCart />
            </MainLayout>
          ) : (
            <Navigate to="/user/login" state={{ from: location }} />
          )
        }
      />
      <Route
        path="/checkout"
        element={
          currentUser ? (
            <MainLayout>
              <Checkout />
            </MainLayout>
          ) : (
            <Navigate to="/user/login" state={{ from: location }} />
          )
        }
      />
      <Route
        path="/payment/success/:orderId"
        element={
          currentUser ? (
            <MainLayout>
              <PaymentSuccess />
            </MainLayout>
          ) : (
            <Navigate to="/user/login" state={{ from: location }} />
          )
        }
      />
      <Route
        path="/payment/fail/:id"
        element={
          currentUser ? (
            <MainLayout>
              <PaymentFail />
            </MainLayout>
          ) : (
            <Navigate to="/user/login" state={{ from: location }} />
          )
        }
      />
      <Route
        path="/payment/cancel/:id"
        element={
          currentUser ? (
            <MainLayout>
              <PaymentCancel />
            </MainLayout>
          ) : (
            <Navigate to="/user/login" state={{ from: location }} />
          )
        }
      />

      {/* Seller and Admin Protected Routes */}
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
  );
}

export default App;
