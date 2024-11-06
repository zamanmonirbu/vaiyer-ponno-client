import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAdminById } from "../actions/adminActions";
import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import DefaultLayout from "./layout/DefaultLayout";
import AdminRequests from "./ManageAdmin/AdminRequests";
import Admins from "./ManageAdmin/Admins";
import BannerManager from "./ManageAdmin/BannerManager";
import CategoryInput from "./ManageAdmin/CategoryInput";
import Gallery from "./ManageAdmin/Gallery";
import NotificationManager from "./ManageAdmin/NotificationManager";
import SellerManager from "./ManageAdmin/SellerManager";
import SellerRequests from "./ManageAdmin/SellerRequests";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Calendar from "./pages/Calendar";
import Chart from "./pages/Chart";
import ECommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";
import Settings from "./pages/Settings";
import Tables from "./pages/Tables";
import Alerts from "./pages/UiElements/Alerts";
import Buttons from "./pages/UiElements/Buttons";
import { getCookie } from "../actions/cookieUtils";
import AdminProfile from './pages/AdminProfile';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    const adminAuth = JSON.parse(getCookie("adminAuth"));

    if (adminAuth && adminAuth.id) {
      dispatch(getAdminById(adminAuth.id)); // Use the ID from localStorage
    } else {
      console.error("Admin not authenticated");
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout admin={admin}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard " />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/dashboard/notification"
          element={
            <>
              <PageTitle title="Notification" />
              <NotificationManager />
            </>
          }
        />
        <Route
          path="/dashboard/manage/gallery"
          element={
            <>
              <PageTitle title="Gallery" />
              <Gallery />
            </>
          }
        />
        <Route
          path="/dashboard/category"
          element={
            <>
              <PageTitle title="Category" />
              <CategoryInput />
            </>
          }
        />
        <Route
          path="/dashboard/manage/banner"
          element={
            <>
              <PageTitle title="Banner" />
              <BannerManager />
            </>
          }
        />
        <Route
          path="/dashboard/view/seller"
          element={
            <>
              <PageTitle title="Seller" />
              <SellerManager />
            </>
          }
        />
        <Route
          path="/dashboard/request/seller"
          element={
            <>
              <PageTitle title="Seller" />
              <SellerRequests />
            </>
          }
        />
        <Route
          path="/dashboard/all/admin"
          element={
            <>
              <PageTitle title="All admin" />
              <Admins />
            </>
          }
        />
        <Route
          path="/dashboard/request/admin"
          element={
            <>
              <PageTitle title="Request admin" />
              <AdminRequests />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar " />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile " />
              <AdminProfile admin={admin} />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements " />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout " />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables " />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings " />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart " />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts " />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons " />
              <Buttons />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
