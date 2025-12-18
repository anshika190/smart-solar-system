import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#fff' }}>Loading Secure Environment...</div>;
    }

    // If no user, redirect to login
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
