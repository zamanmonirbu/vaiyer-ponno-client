import { FaTruck, FaUsers, FaGlobe } from "react-icons/fa";

const CourierAdminHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Courier Admin Panel
          </h1>
          <p className="text-gray-700">
            Efficiently manage couriers, orders, and logistics with our modern
            and powerful admin interface.
          </p>
        </header>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow">
            <FaTruck className="text-4xl text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Fast & Reliable Delivery
            </h2>
            <p className="text-gray-600 text-center">
              We ensure quick and safe delivery of packages with real-time
              tracking for your customers.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow">
            <FaUsers className="text-4xl text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Manage Couriers & Orders
            </h2>
            <p className="text-gray-600 text-center">
              Seamlessly oversee courier profiles, track orders, and optimize
              operations all in one place.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow">
            <FaGlobe className="text-4xl text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Global Reach
            </h2>
            <p className="text-gray-600 text-center">
              Expand your services worldwide with scalable tools and features
              tailored for growth.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            About Our Courier System
          </h3>
          <p className="text-gray-700">
            Our courier system is designed to simplify logistics and improve
            delivery efficiency. With state-of-the-art technology, we enable
            seamless communication between couriers, sellers, and customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourierAdminHome;
