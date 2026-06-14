import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, reqRole }: { children: React.ReactNode, reqRole?: 'admin' | 'user' }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const location = useLocation();

  if (!token || !userStr) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const user = JSON.parse(userStr);
    
    if (reqRole && user.role !== reqRole) {
      // If user tries to access admin, redirect to user dashboard
      if (user.role === 'user' && reqRole === 'admin') {
        return <Navigate to="/user" replace />;
      }
      // If admin tries to access user, redirect to admin dashboard
      if (user.role === 'admin' && reqRole === 'user') {
        return <Navigate to="/admin" replace />;
      }
    }
    
    return <>{children}</>;
  } catch (e) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
}
