// src/layouts/NoNavbarLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function NoNavbarLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
}
