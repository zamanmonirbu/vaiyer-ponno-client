import { FaBoxOpen, FaRoute, FaSmile } from "react-icons/fa";

const DeliveryManHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Welcome, Delivery Hero!
          </h1>
          <p className="text-gray-700">
            Your dedication drives us forward. Let’s deliver smiles, one package
            at a time!
          </p>
        </header>

        {/* Key Tasks Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task 1 */}
          <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow">
            <FaBoxOpen className="text-4xl text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Pick Up Packages
            </h2>
            <p className="text-gray-600 text-center">
              View assigned pickups and ensure parcels are collected on time
              with accuracy.
            </p>
          </div>

          {/* Task 2 */}
          <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow">
            <FaRoute className="text-4xl text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Plan Your Route
            </h2>
            <p className="text-gray-600 text-center">
              Optimize your route with our tools to save time and fuel while
              ensuring fast deliveries.
            </p>
          </div>

          {/* Task 3 */}
          <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow">
            <FaSmile className="text-4xl text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Deliver Happiness
            </h2>
            <p className="text-gray-600 text-center">
              Ensure safe and timely delivery of packages while creating
              delightful customer experiences.
            </p>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            You Are the Heart of Our Service!
          </h3>
          <p className="text-gray-700">
            Every package you deliver connects lives and spreads smiles. Your
            role is crucial, and we appreciate your hard work and dedication
            every step of the way.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition">
            Start Your Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManHome;
