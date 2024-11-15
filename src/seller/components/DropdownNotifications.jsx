// import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import { io } from 'socket.io-client';
import { MdNotifications } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

function DropdownNotifications({ align, sellerId }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const socket = useRef(null);
  const notificationsRef = useRef([]);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io('http://localhost:8800'); 
      socket.current.emit("new-user-add", sellerId);
    }

    const handleNewOrderNotification = ({ sellerId: receivedSellerId, orderDetails }) => {
      if (receivedSellerId === sellerId) {
        // Only add notification if it doesn't already exist
        const isNewNotification = !notificationsRef.current.some(
          notification => notification.id === orderDetails.id
        );

        if (isNewNotification) {
          notificationsRef.current = [...notificationsRef.current, orderDetails];
          setNotifications([...notificationsRef.current]); // Update notifications state to trigger re-render
        }
      }
    };

    socket.current.on("receive-order-notification", handleNewOrderNotification);

    return () => {
      socket.current.off("receive-order-notification", handleNewOrderNotification);
      socket.current.disconnect();
      socket.current = null; 
    };
  }, [sellerId]);

  console.log(notifications);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ${dropdownOpen && 'bg-gray-200 dark:bg-gray-800'}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <MdNotifications className="w-5 h-5 text-gray-800 dark:text-gray-100" />
        {notifications.length > 0 && (
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 dark:border-gray-900 rounded-full"></div>
        )}
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-4">Notifications</div>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
                  <Link
                    className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                    to="#0"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="block text-sm mb-2">
                      📣 <span className="font-medium text-gray-800 dark:text-gray-100">{notification.message}</span>
                    </span>
                    <span className="block text-xs font-medium text-gray-400 dark:text-gray-500">{new Date().toLocaleDateString()}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="py-2 px-4 text-gray-500">No notifications yet.</li>
            )}
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownNotifications;
