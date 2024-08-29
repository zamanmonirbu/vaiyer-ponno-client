import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAdmin,
  readAdmins,
  updateAdmin,
  deleteAdmin,
} from '../../actions/adminActions'; // Adjust the path as necessary

const Admins = () => {
  const [adminData, setAdminData] = useState({ name: '', email: '', password: '' });
  const [selectedAdminId, setSelectedAdminId] = useState(null);

  const dispatch = useDispatch();
  const adminList = useSelector((state) => state.adminReadReducer.admins);
  const { loading, error } = useSelector((state) => state.adminCreateReducer);

  useEffect(() => {
    dispatch(readAdmins());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    dispatch(createAdmin(adminData));
    setAdminData({ name: '', email: '', password: '' }); // Reset form
  };

  const handleEditAdmin = (admin) => {
    setAdminData({ name: admin.name, email: admin.email, password: '' }); // Pre-fill with selected admin data
    setSelectedAdminId(admin._id); // Track the admin being edited
  };

  const handleUpdateAdmin = (e) => {
    e.preventDefault();
    dispatch(updateAdmin(selectedAdminId, adminData));
    setAdminData({ name: '', email: '', password: '' }); // Reset form
    setSelectedAdminId(null); // Reset selected admin ID
  };

  const handleDeleteAdmin = (adminId) => {
    dispatch(deleteAdmin(adminId));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>

      {/* Admin Form */}
      <form onSubmit={selectedAdminId ? handleUpdateAdmin : handleCreateAdmin}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {selectedAdminId ? 'Update Admin' : 'Create Admin'}
        </button>
      </form>

      {/* Admin List */}
      <h3 className="text-xl font-bold mt-6 mb-4">Admin List</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminList?.map((admin) => (
              <tr key={admin._id}>
                <td className="border p-2">{admin.name}</td>
                <td className="border p-2">{admin.email}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditAdmin(admin)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAdmin(admin._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admins;
