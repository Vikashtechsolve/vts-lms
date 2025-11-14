// src/index.jsx
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Playlist from "./components/LandingPage/Playlist.jsx";
import MasterClass from "./components/MasterClass/MasterClass.jsx";
import Blogs from "./Pages/blogs.jsx";

// create router with nested routes (App is the layout)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App contains <Outlet />
    children: [
      { index: true, element: <LandingPage /> },               // renders at "/"
      { path: "playlists", element: <Playlist /> },            // "/playlists"
      { path: "master-classes", element: <MasterClass /> },    // "/master-classes"
      { path: "blogs", element: <Blogs /> },                   // "/blogs"
      // add more routes here (programs, news, interviews, reels...)
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
