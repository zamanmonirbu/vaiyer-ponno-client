import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courierLogin } from "../../actions/courierActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourierLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, courierInfo } = useSelector(
    (state) => state.courier);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(courierLogin({ email, password }));
  };

  useEffect(() => {
    if (courierInfo) {
      toast.success("Login successful!");
      navigate("/courier/dashboard");
    }
    if (error) {
      toast.error(error);
    }
  }, [courierInfo, error, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 shadow-md rounded bg-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-semibold text-center mb-4">Courier Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default CourierLogin;
