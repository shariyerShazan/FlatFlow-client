// routes/UserPrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';

const UserPrivateRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (!user) {
    toast.warn("You must be logged in to access this page.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserPrivateRoute;
