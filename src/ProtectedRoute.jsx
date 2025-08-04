
import React from 'react';
import { useAuth } from './providers/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { accessToken, loading } = useAuth();
  if (loading) return <div>Loading…</div>;
  return accessToken ? <Outlet /> : <Navigate to={redirectTo} />;
}
