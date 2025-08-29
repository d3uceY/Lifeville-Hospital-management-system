
import React from 'react';
import { useAuth } from './providers/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import SuspenseFallback from './components/loader/SuspenseFallback';

export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { accessToken, loading } = useAuth();
  if (loading) return <SuspenseFallback />;
  return accessToken ? <Outlet /> : <Navigate to={redirectTo} />;
}
