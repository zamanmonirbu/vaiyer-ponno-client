import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, addTask, updateTask, deleteTask } from '../actions/taskActions';
import { FaCalendarAlt, FaClock, FaEdit, FaTrash } from 'react-icons/fa';

const TaskComponent = ({ seller }) => {
  const sellerId = seller?._id;
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    dispatch(getTasks(sellerId));
  }, [dispatch, sellerId]);

  const handleAddTask = () => {
    if (taskTitle && taskDescription && taskTime) {
      dispatch(addTask({ title: taskTitle, description: taskDescription, time: taskTime, sellerId }));
      setTaskTitle('');
      setTaskDescription('');
      setTaskTime('');
    }
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskTime(task.time);
    setEditingTaskId(task._id);
  };

  const handleUpdateTask = () => {
    dispatch(updateTask(editingTaskId, { title: taskTitle, description: taskDescription, time: taskTime }));
    setTaskTitle('');
    setTaskDescription('');
    setTaskTime('');
    setIsEditing(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="container mx-auto p-4">

  {/* Task List */}
  <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Your Tasks</h3>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task._id} className="p-2 border rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex mt-4">
                  <div><FaCalendarAlt className="text-gray-500" /></div><p className="text-sm text-gray-600"> { new Date(task.time).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditTask(task)} className="text-yellow-500 p-1 rounded hover:text-yellow-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 p-1 rounded hover:text-red-600">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Task Manager</h2>

        {/* Task Form */}
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 rounded w-full mb-2"
            placeholder="Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            className="border p-2 rounded w-full mb-2"
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <div className="flex items-center space-x-2 mb-2">
            <FaCalendarAlt className="text-gray-500" />
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={taskTime.split('T')[0]} // Show only date
              onChange={(e) => setTaskTime(e.target.value + 'T' + taskTime.split('T')[1])} // Keep time intact
            />
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <FaClock className="text-gray-500" />
            <input
              type="time"
              className="border p-2 rounded w-full"
              value={taskTime.split('T')[1] || ''} // Show only time
              onChange={(e) => setTaskTime(taskTime.split('T')[0] + 'T' + e.target.value)} // Keep date intact
            />
          </div>
          {isEditing ? (
            <button
              onClick={handleUpdateTask}
              className="bg-blue-500 text-white p-2 rounded w-full mt-2 hover:bg-blue-600"
            >
              Update Task
            </button>
          ) : (
            <button
              onClick={handleAddTask}
              className="bg-green-500 text-white p-2 rounded w-full mt-2 hover:bg-green-600"
            >
              Add Task
            </button>
          )}
        </div>

      
      </div>
    </div>
  );
};

export default TaskComponent;
