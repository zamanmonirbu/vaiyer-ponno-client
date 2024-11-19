import { useState } from "react";
import { FaHome, FaUserAlt, FaBox, FaStoreAlt, FaEnvelope, FaBell } from "react-icons/fa";
import UserProfile from "./SellerCompoenent/UserProfile";
import WelcomePage from "./SellerCompoenent/WelcomePage";
import CreateStore from "./SellerCompoenent/CreateStore"; // Import CreateStore component
import ViewStore from "./SellerCompoenent/ViewStore"; // Import ViewStore component
import ProductManager from "./SellerCompoenent/ProductManager";
import AddProduct from "./SellerCompoenent/AddProduct";
import StoreDetails from "./SellerCompoenent/StoreDetails";
import SellerChat from "../../messenger/pages/Chat/SellerChat";
import TaskComponent from "../../pages/ToDo";
SellerAdmin

SellerOrders


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

const SellerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <WelcomePage />;
      case "UserProfile":
        return <UserProfile />;
      case "Products":
        return <h2 className="text-2xl font-bold">Manage Products</h2>;
      case "Store":
        return <h2 className="text-2xl font-bold">Store Information</h2>;
      case "Messages":
        return <h2 className="text-2xl font-bold">User Messages</h2>;
      case "CreateStore":
        return <CreateStore />;  // Render CreateStore component
      case "ViewStore":
        return <ViewStore />;    // Render ViewStore component
      default:
        return <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-purple-700">Seller Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <FaBell className="text-xl text-gray-600" />
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">3</span>
          </button>
          <button>
            <FaUserAlt className="text-xl text-gray-600" />
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg">
          <nav className="mt-6">
            <ul className="space-y-4">
              <li
                className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-purple-100 rounded cursor-pointer"
                onClick={() => setActiveComponent("Dashboard")}
              >
                <FaHome />
                <span>Dashboard</span>
              </li>
              <li className="group">
                <div className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-purple-100 rounded cursor-pointer">
                  <FaUserAlt />
                  <span>Profile</span>
                </div>
                <ul className="hidden group-hover:block pl-6">
                  <li
                    className="py-1 text-gray-600 hover:text-purple-600 cursor-pointer"
                    onClick={() => setActiveComponent("UserProfile")}
                  >
                    View Profile
                  </li>
                </ul>
              </li>
              <li className="group">
                <div className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-purple-100 rounded cursor-pointer">
                  <FaBox />
                  <span>Products</span>
                </div>
                <ul className="hidden group-hover:block pl-6">
                  <li
                    className="py-1 text-gray-600 hover:text-purple-600 cursor-pointer"
                    onClick={() => setActiveComponent("Products")}
                  >
                    Manage Products
                  </li>
                </ul>
              </li>
              <li className="group">
                <div className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-purple-100 rounded cursor-pointer">
                  <FaStoreAlt />
                  <span>Store</span>
                </div>
                <ul className="hidden group-hover:block pl-6">
                  <li
                    className="py-1 text-gray-600 hover:text-purple-600 cursor-pointer"
                    onClick={() => setActiveComponent("CreateStore")}
                  >
                    Create Store
                  </li>
                  <li
                    className="py-1 text-gray-600 hover:text-purple-600 cursor-pointer"
                    onClick={() => setActiveComponent("ViewStore")}
                  >
                    View Store
                  </li>
                </ul>
              </li>
              <li className="group">
                <div className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-purple-100 rounded cursor-pointer">
                  <FaEnvelope />
                  <span>Messages</span>
                </div>
                <ul className="hidden group-hover:block pl-6">
                  <li
                    className="py-1 text-gray-600 hover:text-purple-600 cursor-pointer"
                    onClick={() => setActiveComponent("Messages")}
                  >
                    View Messages
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 shadow-inner rounded-lg">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
