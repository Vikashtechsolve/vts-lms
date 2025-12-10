// src/index.jsx
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Home from "./Pages/Home/Home.jsx";
import Blogs from "./Pages/blogs/Blogs.jsx";
import Playlist from "./Pages/playlist/playlist.jsx";
import PlaylistDetail from "./Pages/playlist/PlaylistDetails.jsx";
import MasterClass from "./Pages/MasterClass/MasterClass.jsx";
import Programs from "./Pages/Programs/Programs.jsx";
import News from "./Pages/News/News.jsx";
import Interview from "./Pages/Interviews/Interview.jsx";
import Reels from "./Pages/Reels/Reels.jsx";
import SignIn from "./Pages/SignIn.jsx";
import LiveClass from "./Pages/MasterClass/LiveClass.jsx";
import RecordedClass from "./Pages/MasterClass/RecordedClass.jsx";
import UpcomingEventClass from "./Pages/MasterClass/UpcomingEventClass.jsx";
import LandingPage from "./Pages/Auth/LandingPage.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import PlanChooser from "./Pages/Auth/PlanChooser.jsx";

import NoNavbarLayout from "./components/Navbar/NoNavbarLayout.jsx";

// Router:
// - Root ("/") -> NoNavbarLayout (landing, auth, planChooser) -> NO navbar
// - /app -> App layout (default navbar) for all main pages
const router = createBrowserRouter([
  // Landing page on root "/"
  {
    path: "/",
    element: <NoNavbarLayout />,
    children: [
      { index: true, element: <LandingPage /> },       // "/" → LandingPage
      { path: "auth", element: <Auth /> },
      { path: "planChooser", element: <PlanChooser /> },
    ],
  },

  // All pages with navbar
  {
    path: "/app",
    element: <App />,
    children: [
      { index: true, element: <Home /> },        // "/app" → Home
      { path: "playlist", element: <Playlist/> },
      { path: "playlist/:id", element: <PlaylistDetail /> },
      { path: "MasterClass", element: <MasterClass /> },
      { path: "Programs", element: <Programs /> },
      { path: "Blogs", element: <Blogs/> },
      { path: "News", element: <News/> },
      { path: "Interviews", element: <Interview/> },
      { path: "Reels", element: <Reels/> },
      { path: "signin", element: <SignIn /> },
      { path: "LiveClass/:id", element: <LiveClass /> },
      { path: "Recorded/:id", element: <RecordedClass/> },
      { path: "Upcoming/:id", element: <UpcomingEventClass/> },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
