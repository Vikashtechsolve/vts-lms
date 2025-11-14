// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Routed pages will render here */}
        <Outlet />
      </main>
    </div>
  );
}
