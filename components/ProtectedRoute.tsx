// FIX: Resolved "Cannot find namespace 'JSX'" error by importing React, which is necessary for using JSX types like JSX.Element.
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

interface ProtectedRouteProps {
// FIX: Changed children prop type from JSX.Element to React.ReactNode for better type safety and consistency.
children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
const { currentUser, isLoading, token } = useAppContext();
const location = useLocation();

if (isLoading) {
  return null;
}

// 🔥 Immediately block if no token
if (!token) {
  return <Navigate to="/login" replace />;
}

// 🔥 Double safety
if (!currentUser) {
  return null;
}

return children;
};

export default ProtectedRoute;