import PropTypes from "prop-types";
import { RiCheckLine } from "react-icons/ri";
import { FcProcess } from "react-icons/fc";

const OrderProgress = ({ order }) => {
  // Define stage labels and corresponding values
  const stages = [
    { label: "Seller Accepted", completed: order.sellerAccepted },
    { label: "Sent to Courier", completed: order.sentToCourier },
    { label: "Courier to Delivery Man", completed: order.courierToDeliveryMan },
    { label: "Order Completed", completed: order.orderCompleted },
  ];

  // Calculate progress percentage
  const completedStages = stages.filter((stage) => stage.completed).length;
  const progressPercentage = (completedStages / stages.length) * 100;

  return (
    <div className="p-4">
      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 h-8 rounded-full overflow-hidden mb-4">
        <div
          className="absolute top-0 left-0 h-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold"
          style={{ width: `${progressPercentage}%` }}
        >
          {Math.round(progressPercentage)}%
        </div>
      </div>

      {/* Stage Status */}
      <ul className="space-y-2">
        {stages.map((stage, index) => (
          <li
            key={index}
            className={`text-sm font-medium flex items-center gap-2 ${
              stage.completed ? "text-green-600" : "text-gray-500"
            }`}
          >
            {stage.completed ? (
              <>
                <RiCheckLine className="text-green-600" /> {stage.label}
              </>
            ) : (
              <>
                <FcProcess className="text-gray-500" /> {stage.label}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Prop validation
OrderProgress.propTypes = {
  order: PropTypes.shape({
    sellerAccepted: PropTypes.bool.isRequired,
    sentToCourier: PropTypes.bool.isRequired,
    courierToDeliveryMan: PropTypes.bool.isRequired,
    orderCompleted: PropTypes.bool.isRequired,
  }).isRequired,
};

export default OrderProgress;
