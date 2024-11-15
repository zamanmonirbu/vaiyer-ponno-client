import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { FaBell } from "react-icons/fa";
import { AiOutlineDashboard, AiOutlineUnorderedList } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { BsArrowRightCircle } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi"; // Importing Logout icon
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearDeliveryManData } from "../actions/DeliveryManActions";

const DashboardDeliveryMan = ({ children }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearDeliveryManData());
    navigate("/deliveryman/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-200 fixed inset-0 top-0 z-10">
        <div className="p-4 text-center text-lg font-bold">Delivery Man Dashboard</div>
        <nav className="mt-4 space-y-2">
          {/* Dashboard Link */}
          <a
            href="/deliveryman/dashboard"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <AiOutlineDashboard className="mr-3" />
            Dashboard  
            <BsArrowRightCircle
              className={`ml-auto transition-transform ${showDashboard ? "rotate-90" : ""}`}
            />
          </a>
          {/* Orders Section */}
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => setShowOrders(!showOrders)}
          >
            <AiOutlineUnorderedList className="mr-3" />
            Orders
            <BsArrowRightCircle
              className={`ml-auto transition-transform ${showOrders ? "rotate-90" : ""}`}
            />
          </button>
          {showOrders && (
            <div className="ml-8 space-y-1">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Pending Orders
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Assigned Orders
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Completed Orders
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Cancelled Orders
              </a>
            </div>
          )}

          {/* Messages Link */}
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <MdMessage className="mr-3" />
            Messages
            <BsArrowRightCircle
              className={`ml-auto transition-transform ${showMessage ? "rotate-90" : ""}`}
            />
          </a>
          {/* Profile Link */}
          <a
            href="/deliveryman/profile"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <RiUser3Line className="mr-3" />
            Profile 
            <BsArrowRightCircle
              className={`ml-auto transition-transform ${showProfile ? "rotate-90" : ""}`}
            />
          </a>
        </nav>
        <div className="mt-auto p-4">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-left w-full hover:bg-gray-700"
          >
            <BiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 ml-64">
        <header className="flex items-center justify-between bg-white p-4 shadow">
          <h1 className="text-2xl font-semibold text-gray-800">
            Delivery Man Dashboard
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
DashboardDeliveryMan.propTypes = {
  children: PropTypes.node, // Validation for children
};

export default DashboardDeliveryMan;
