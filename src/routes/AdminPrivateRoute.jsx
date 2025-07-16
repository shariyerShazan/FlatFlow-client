// routes/AdminPrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';

const AdminPrivateRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (!user || user.role !== 'admin') {
    toast.error("Only admins are allowed to access this page.");
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminPrivateRoute;
