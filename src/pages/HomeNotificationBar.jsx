import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../actions/notificationActions";
import { FaTimes } from "react-icons/fa"; // Close icon
import { Link } from "react-router-dom"; // Link for navigation

const HomeNotificationBar = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); 
  };

  // Redux state for notifications
  const { notifications, loading, error } = useSelector((state) => state.notifications);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Fetch notifications when component mounts
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0) {
      const interval = setInterval(() => {
        setFade(false); // Start fading out
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length); // Rotate notifications
          setFade(true); // Fade in
        }, 500); // Duration for fade-out effect
      }, 5000); // Change notification every 5 seconds
      return () => clearInterval(interval);
    }
  }, [notifications]);

  if (!isVisible) return null; // Hide notification if close is clicked
  if (loading) return <div className="notification-bar">Loading...</div>;
  if (error) return <div className="notification-bar text-red-500">{error}</div>;

  const currentNotification = notifications[currentIndex];

  return (
    <div className=" h-12 w-full bg-teal-600 flex px-4 ">
      {/* Dynamic Notification Message and Show All Button */}
      <div className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"} flex items-center w-full text-white`}>
        <span className="mx-auto">{currentNotification?.message}

        {/* Show All Button aligned to the right */}
        <Link
          className=" ml-8 rounded-md border border-transparent bg-white px-4 py-1 text-sm font-medium text-teal-600 shadow-sm hover:bg-teal-50"
          to="/show/all/notification"
        >
          Show all
        </Link>
        </span>
      </div>

      {/* Close Icon */}
      <button
        className="absolute top-2 right-3 text-white hover:text-gray-300"
        onClick={handleClose}
        aria-label="Close Notification"
      >
        <FaTimes size={16} />
      </button>
    </div>
  );
};

export default HomeNotificationBar;
