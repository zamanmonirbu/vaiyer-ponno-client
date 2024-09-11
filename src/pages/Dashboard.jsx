// // src/pages/Dashboard.jsx

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import NotificationForm from '../components/NotificationForm';
// import { fetchNotifications } from '../slices/notificationSlice';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { notifications, loading, error } = useSelector((state) => state.notifications);

//   useEffect(() => {
//     dispatch(fetchNotifications());
//   }, [dispatch]);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
//       {/* Notification Form */}
//       <NotificationForm />
      
//       {/* Notifications List */}
//       <div className="bg-white shadow-md rounded p-6">
//         <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
//         {loading && <p>Loading notifications...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && notifications.length === 0 && <p>No notifications available.</p>}
//         <ul>
//           {notifications.map((notification) => (
//             <li
//               key={notification._id}
//               className="border-b border-gray-200 py-2"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-xl font-medium">{notification.title}</p>
//                   <p className="text-gray-700">{notification.message}</p>
//                   <span
//                     className={`inline-block px-2 py-1 mt-2 text-sm rounded ${
//                       notification.type === 'success'
//                         ? 'bg-green-100 text-green-800'
//                         : notification.type === 'error'
//                         ? 'bg-red-100 text-red-800'
//                         : notification.type === 'warning'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : 'bg-blue-100 text-blue-800'
//                     }`}
//                   >
//                     {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">
//                     {new Date(notification.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
