
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// SellerRoute component for seller-specific routes
const SellerRoute = () => {
    const { user } = useSelector((state) => state.auth);

    return user && user.isSeller ? <Outlet /> : <Navigate to="/seller/login" />;
};

export default SellerRoute;
