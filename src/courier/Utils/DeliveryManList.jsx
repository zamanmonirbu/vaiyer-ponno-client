import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryMenByCourier } from "../../actions/DeliveryManActions";


const DeliveryManList = ({ courierId }) => {
  const dispatch = useDispatch();
  const { deliveryMen=[], loading, error } = useSelector(
    (state) => state.deliveryMan
  );

  useEffect(() => {
    dispatch(fetchDeliveryMenByCourier(courierId));
  }, [dispatch, courierId]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Delivery Men
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 font-medium">{error}</p>
        ) : deliveryMen.length === 0 ? (
          <p className="text-center text-gray-500 font-medium">
            No delivery men found for this courier.
          </p>
        ) : (
          <ul className="space-y-4">
            {deliveryMen.map((man) => (
              <li
                key={man._id}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {man.firstName} {man.lastName}
                  </p>
                  <p className="text-sm text-gray-600">Phone: {man.phone}</p>
                  <p className="text-sm text-gray-600">NID: {man.nid}</p>
                </div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                >
                  Assign Task
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeliveryManList;
