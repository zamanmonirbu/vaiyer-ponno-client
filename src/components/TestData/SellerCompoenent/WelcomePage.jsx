import { FaDollarSign, FaUsers, FaShoppingCart, FaGlobe } from "react-icons/fa";

const WelcomePage = () => {
    return (
      <main className="flex-1 p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
          <FaDollarSign className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500">Today's Money</p>
            <h3 className="text-xl font-bold">$3,600</h3>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
          <FaUsers className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500">Today's Users</p>
            <h3 className="text-xl font-bold">2,300</h3>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
          <FaShoppingCart className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500">New Clients</p>
            <h3 className="text-xl font-bold">+3,462</h3>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
          <FaGlobe className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500">Sales</p>
            <h3 className="text-xl font-bold">$83,430</h3>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold">Sales This Week</h2>
        {/* Placeholder for a chart */}
        <div className="mt-4 h-48 bg-purple-100 rounded-lg flex items-center justify-center text-purple-500 text-xl">
          Chart Placeholder
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold">Sales by Country</h2>
        <table className="mt-4 w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b pb-2">Country</th>
              <th className="border-b pb-2">Sales</th>
              <th className="border-b pb-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">United States</td>
              <td className="py-2">9600</td>
              <td className="py-2">$756,600</td>
            </tr>
            <tr>
              <td className="py-2">Canada</td>
              <td className="py-2">8340</td>
              <td className="py-2">$545,760</td>
            </tr>
            <tr>
              <td className="py-2">France</td>
              <td className="py-2">6700</td>
              <td className="py-2">$487,560</td>
            </tr>
            <tr>
              <td className="py-2">Australia</td>
              <td className="py-2">3900</td>
              <td className="py-2">$380,670</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    );
};

export default WelcomePage;