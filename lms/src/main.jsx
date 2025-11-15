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
import Blogs from "./Pages/blogs.jsx";
import Playlist from "./Pages/playlist.jsx";
import PlaylistDetail from "./Pages/PlaylistDetails.jsx";


// create router with nested routes (App is the layout)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: <LandingPage /> },                
      { path: "playlist", element: <Playlist/> },
      { path: "Blogs", element: <Blogs/> },
      { path: "/playlist/:id", element: <PlaylistDetail /> },


                
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
