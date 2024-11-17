import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { FaBell } from "react-icons/fa";
import { AiOutlineDashboard, AiOutlineUnorderedList } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { BsArrowRightCircle } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi"; // Importing Logout icon
import { useDispatch } from "react-redux";
import { courierClear } from "../actions/courierActions";
import { useNavigate } from "react-router-dom";

const CourierDashboard = ({ children }) => {
  const [showStoreManagement, setShowStoreManagement] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showManageDeliveries, setShowManageDeliveries] = useState(false); // New state for Manage Deliveries
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(courierClear());
    navigate("/courier/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-200">
        <div className="p-4 text-center text-xl font-bold">Dashboard</div>
        <nav className="mt-4 space-y-2">
          {/* Courier Management */}
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => setShowStoreManagement(!showStoreManagement)}
          >
            <CiDeliveryTruck className="mr-3 h-6 w-6" />
            Courier Management
            <BsArrowRightCircle
              className={`ml-auto transition-transform ${showStoreManagement ? "rotate-90" : ""}`}
            />
          </button>
          {/* {showStoreManagement && (
            <div className="ml-8 space-y-1">
              <button
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700"
                onClick={() => setShowOrders(!showOrders)}
              >
                <AiOutlineUnorderedList className="mr-3" />
                Orders
              </button> */}
              {showStoreManagement && (
                <div className="ml-6 space-y-1 text-gray-400">
                  <a href="/courier/dashboard/seller/request" className="block px-4 py-2 hover:bg-gray-700">
                    Request Orders
                  </a>
                  <a href="/courier/dashboard/seller/accept" className="block px-4 py-2 hover:bg-gray-700">
                    Accept Orders
                  </a>
                  <a href="/courier/dashboard/seller/reject" className="block px-4 py-2 hover:bg-gray-700">
                    Cancel Orders
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                    Sent to Courier
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                    Complete Orders
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                    Statistics
                  </a>
                </div>
              )}
            {/* </div> */}
          {/* )} */}

          {/* Manage Deliveries */}
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => setShowManageDeliveries(!showManageDeliveries)}
          >
            <AiOutlineUnorderedList className="mr-3" />
            Manage Deliveries
            <BsArrowRightCircle
              className={`ml-auto transition-transform ${showManageDeliveries ? "rotate-90" : ""}`}
            />
          </button>
          {showManageDeliveries && (
            <div className="ml-8 space-y-1">
              <a href="/courier/dashboard/vehicle-types" className="block px-4 py-2 hover:bg-gray-700">
                Vehicle Types
              </a>
              <a href="/courier/dashboard/delivery/man/list" className="block px-4 py-2 hover:bg-gray-700">
                Delivery Men
              </a>
            </div>
          )}

          {/* Other Links */}
          <a href="/courier/dashboard/courier/task" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <AiOutlineDashboard className="mr-3" />
            Tasks
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <MdMessage className="mr-3" />
            Messages
          </a>
          <a
            href="/courier/profile"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <RiUser3Line className="mr-3" />
            Profile
          </a>
        </nav>
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-left w-full hover:bg-gray-700"
          >
            <BiLogOut className="mr-3" /> {/* Added logout icon */}
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100">
        <header className="flex items-center justify-between bg-white p-4 shadow">
          <h1 className="text-2xl font-semibold text-gray-800">
            Courier Dashboard
          </h1>
          <div className="flex items-center justify-center space-x-4">
            {/* Centered Notification Icon */}
            <div className="flex-1 flex justify-center">
              <button className="text-gray-600 hover:text-gray-800">
                <FaBell className="text-xl" />
              </button>
            </div>
            {/* Profile Picture */}
            <img
              src={""}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-600"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

// Define prop types
CourierDashboard.propTypes = {
  children: PropTypes.node, // Validation for children
};

export default CourierDashboard;
