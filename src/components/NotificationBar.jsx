// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchNotifications } from '../slices/notificationSlice';

// const NotificationBar = () => {
//   const dispatch = useDispatch();
//   const notifications = useSelector((state) => state.notifications);
// console.log(notifications)
//   useEffect(() => {
//     dispatch(fetchNotifications());
//   }, [dispatch]);

//   return (
//     <div className="fixed top-0 left-0 right-0 p-8 bg-gray-800 text-white flex overflow-hidden">
//       <div className="flex space-x-4 animate-slide-left">
//         {notifications.map((notification) => (
//           <div key={notification._id} className="bg-gray-700 p-4 rounded-md">
//             <h3 className="font-semibold">{notification.title}</h3>
//             <p>{notification.message}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotificationBar;
