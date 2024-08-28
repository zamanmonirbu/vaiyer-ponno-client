
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// AdminRoute component for admin-specific routes
const AdminRoute = () => {
    const { user } = useSelector((state) => state.auth);

    return user && user.isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
