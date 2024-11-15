import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerDeliveryMan } from '../../actions/DeliveryManActions';

const DeliveryManRegister = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.deliveryManRegister);

  const [deliveryManData, setDeliveryManData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nid: '',
    address: '',
    vehicleType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryManData({ ...deliveryManData, [name]: value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerDeliveryMan(deliveryManData));
  };

  return (
    <div>
      <h2>Register Delivery Man</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegisterSubmit}>
        <input
          type="text"
          name="firstName"
          value={deliveryManData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={deliveryManData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={deliveryManData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={deliveryManData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="nid"
          value={deliveryManData.nid}
          onChange={handleInputChange}
          placeholder="NID"
        />
        <input
          type="text"
          name="address"
          value={deliveryManData.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="vehicleType"
          value={deliveryManData.vehicleType}
          onChange={handleInputChange}
          placeholder="Vehicle Type"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default DeliveryManRegister;
