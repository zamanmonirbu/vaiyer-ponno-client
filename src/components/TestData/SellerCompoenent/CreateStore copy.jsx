import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStore } from '../../../actions/sellerActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateStore = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  // Fetch loading, error, success state from Redux
  const { error, loading, success } = useSelector((state) => state.seller);

  // Handle Toast notifications based on success, error, and loading
  useEffect(() => {
    if (loading) {
      toast.info('Creating store...', { autoClose: 1500 });
    } else if (error) {
      toast.error(`Error: ${error}`, { autoClose: 2000 });
    } else if (success) {
      toast.success('Store created successfully!', { autoClose: 2000 });
    }
  }, [loading, error, success]);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStore({ name, description, address, phone }));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <ToastContainer /> {/* Toastify Container for displaying notifications */}
      <h2 className="text-2xl font-semibold mb-6">Create Store</h2>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Store Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Store Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Store Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Store Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-[#3b4d66] hover:bg-[#324053]'
            } text-white font-semibold`}
          >
            {loading ? 'Creating...' : 'Create Store'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
