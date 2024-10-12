import { Link } from 'react-router-dom';
import { AiOutlineWarning } from 'react-icons/ai'; // Import an icon

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <AiOutlineWarning className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700">
        Return Home
      </Link>
    </main>
  );
};

export default NotFound;
