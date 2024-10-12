import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../actions/notificationActions";

const HomeNotificationBar = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [notifications]);

  if (loading) {
    return (
      <div className="relative h-10 w-full bg-blue-500 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-10 w-full bg-blue-500 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const currentNotification = notifications[currentIndex];
  const textColor =
    currentNotification?.type === "error" ? "text-red-500" : "text-white"; // Adjust based on notification type

  return (
    <div className="relative h-10 w-full bg-blue-500 overflow-hidden flex items-center justify-center">
      {" "}
      {/* Center align */}
      <div className={`absolute ${textColor} animate-marquee`}>
        <span>{currentNotification?.message}</span>
      </div>
    </div>
  );
};

export default HomeNotificationBar;
