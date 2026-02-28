import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="p-8 text-center mt-20 text-textMuted">Loading...</div>;

    // If user is not logged in OR is not an admin, redirect them away
    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;