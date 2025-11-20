import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, currentUser } = useContext(AuthContext);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect based on user role
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else if (currentUser.role === 'trainer') {
      return <Navigate to="/trainer/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  }

  return children;
};

export default ProtectedRoute;