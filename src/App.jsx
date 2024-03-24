import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {useAuthContext } from "views/auth/hooks/useAuthContext"
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Page404 from "layouts/page404";
import Administrator from "layouts/administrator";

const App = () => {
  const {user } = useAuthContext()
  return (
    <Routes>
    <Route
      path="auth/*"
      element={!user ? <AuthLayout /> : <Navigate to="/admin/default" />}
    />
    <Route
      path="auth/*"
      element={
        user && user.role === "admin" ? (
          <Administrator />
        ) : (
          <Navigate to="/auth/sign-in" />
        )
      }
    />
    <Route
      path="admin/*"
      element={user ? <AdminLayout /> : <Navigate to="/auth/sign-in" />}
    />
    <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

    {/* catch-all route for invalid routes */}
    <Route path="*" element={<Page404 />} />
  </Routes>
  );
};

export default App;
