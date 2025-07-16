// routes/AdminPrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';

const MemberPrivateRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (!user || user.role !== 'member') {
    toast.error("Only member are allowed to access this page.");
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default MemberPrivateRoute;
