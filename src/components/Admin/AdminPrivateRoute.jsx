
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// AdminRoute component for admin-specific routes
const AdminPrivateRoute = () => {
    const { user } = useSelector((state) => state.adminAuth);

    return user && user.isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
