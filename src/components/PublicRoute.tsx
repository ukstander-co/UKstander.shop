import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.role === 'admin') {
        return <Navigate to="/admin" replace />;
      } else {
        return <Navigate to="/user" replace />;
      }
    } catch (e) {
      // In case of parsing error, allow access
      return <>{children}</>;
    }
  }

  return <>{children}</>;
}
