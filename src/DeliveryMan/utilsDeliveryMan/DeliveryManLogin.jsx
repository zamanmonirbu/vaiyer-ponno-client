import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginDeliveryMan } from '../../actions/DeliveryManActions';


const DeliveryManLogin = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.deliveryManLogin);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginDeliveryMan(loginData.email, loginData.password));
  };

  return (
    <div>
      <h2>Login Delivery Man</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default DeliveryManLogin;
