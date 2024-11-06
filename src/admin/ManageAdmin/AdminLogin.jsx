import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../actions/adminActions';
import { Link, useNavigate } from 'react-router-dom';
import AllNavSections from '../../components/Nav/AllNavSections';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, error, admin } = useSelector((state) => state.adminReducer);

  const handleLogin = () => {
    dispatch(loginAdmin({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  }, [error]); // Run this effect only when `error` changes

  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]); // Run this effect only when `admin` changes

  return (
    <>
      <AllNavSections />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          {loading && <p className="text-blue-500 text-center">Loading...</p>}
        
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
          <div className="flex justify-between mt-4">
            <Link to="/admin/register" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
            <Link
              to="/password-recovery"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminLogin;
