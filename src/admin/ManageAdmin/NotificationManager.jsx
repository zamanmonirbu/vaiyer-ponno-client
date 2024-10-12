import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNotification,
  deleteNotification,
  fetchNotifications,
  updateNotification,
} from "../../actions/notificationActions";

const NotificationManager = () => {
  const dispatch = useDispatch();
  const {notifications,loading,error} = useSelector((state) => state.notifications);


  const [newNotification, setNewNotification] = useState({
    message: "",
    type: "",
  });
  const [editing, setEditing] = useState(null);
  const [editedNotification, setEditedNotification] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewNotification({ ...newNotification, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    dispatch(createNotification(newNotification));
    setNewNotification({ message: "", type: "" });
  };

  const handleEditChange = (e) => {
    setEditedNotification({
      ...editedNotification,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    dispatch(updateNotification(editing._id, editedNotification));
    setEditing(null);
    setEditedNotification({ message: "", type: "" });
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notification Manager</h1>

      {/* Create Notification */}
      <div className="mb-8 p-4 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Notification</h2>
        <input
          type="text"
          name="message"
          value={newNotification.message}
          onChange={handleChange}
          placeholder="Message"
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
        />
        <input
          type="text"
          name="type"
          value={newNotification.type}
          onChange={handleChange}
          placeholder="Type"
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
        />
        <button
          onClick={handleCreate}
          disabled={loading}
          className={`px-4 py-2 text-white rounded-md ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"}`}
        >
          {loading ? "Creating..." : "Create Notification"}
        </button>
      </div>

      {/* Edit Notification */}
      {editing && (
        <div className="mb-8 p-4 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Notification</h2>
          <input
            type="text"
            name="message"
            value={editedNotification.message}
            onChange={handleEditChange}
            placeholder="Message"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <input
            type="text"
            name="type"
            value={editedNotification.type}
            onChange={handleEditChange}
            placeholder="Type"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-4 py-2 text-white rounded-md ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"}`}
          >
            {loading ? "Updating..." : "Update Notification"}
          </button>
        </div>
      )}

      {/* List Notifications */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Notification List</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">No.</th>
                  <th className="border border-gray-300 px-4 py-2">Message</th>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={notification._id} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {notification.message}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 capitalize">
                      {notification.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => {
                          setEditing(notification);
                          setEditedNotification(notification);
                        }}
                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-md ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationManager;
