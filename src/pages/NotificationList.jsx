import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../actions/notificationActions"; // Adjust import based on your structure

const NotificationList = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-blue-500">Loading notifications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li
            key={notification.id} // Make sure to use the unique identifier for notifications
            className={`p-2 rounded border ${notification.type === "error" ? "border-red-500 bg-red-100" : "border-blue-500 bg-blue-100"}`}
          >
            <p className={`text-sm ${notification.type === "error" ? "text-red-600" : "text-blue-600"}`}>
              {notification.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
