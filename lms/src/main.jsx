// src/index.jsx
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx"; // App contains Navbar + <Outlet />
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

import ProfilePage from "./Pages/Profile/ProfilePage.jsx";
import ProfileCertificates from "./Pages/Profile/ProfileCertificates.jsx";
import ProfileBadges from "./Pages/Profile/ProfileBadges.jsx";
import ProfileSubscription from "./Pages/Profile/ProfileSubscription.jsx";
import ProfileNotifications from "./Pages/Profile/ProfileNotifications.jsx";
import Watchlist from "./Pages/Profile/Watchlist.jsx";
import ProfileSignOut from "./Pages/Profile/ProfileSignOut.jsx";
import StudentProgress from "./Pages/Profile/StudentProgress.jsx";

import NoNavbarLayout from "./components/Navbar/NoNavbarLayout.jsx";


const router = createBrowserRouter([
  // Landing page on root "/"
  {
    path: "/",
    element: <NoNavbarLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "auth", element: <Auth /> },
      { path: "planChooser", element: <PlanChooser /> },
    ],
  },

  
  {
    path: "/app",
    element: <App />, // App contains Navbar + Outlet
    children: [
      { index: true, element: <Home /> },
      { path: "playlist", element: <Playlist /> },
      { path: "playlist/:id", element: <PlaylistDetail /> },
      { path: "MasterClass", element: <MasterClass /> },
      { path: "Programs", element: <Programs /> },
      { path: "Blogs", element: <Blogs /> },
      { path: "News", element: <News /> },
      { path: "Interviews", element: <Interview /> },
      { path: "Reels", element: <Reels /> },
      { path: "signin", element: <SignIn /> },
      { path: "LiveClass/:id", element: <LiveClass /> },
      { path: "Recorded/:id", element: <RecordedClass /> },
      { path: "Upcoming/:id", element: <UpcomingEventClass /> },
      
    ],
  },

  
  {
    path: "/app/profile",
    element: <NoNavbarLayout />,
    children: [
      { index: true, element: <ProfilePage /> }, 
      { path: "certificates", element: <ProfileCertificates /> }, 
      { path: "badges", element: <ProfileBadges /> },
      { path: "subscription", element: <ProfileSubscription /> },
      { path: "notifications", element: <ProfileNotifications /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "progress", element: <StudentProgress /> },
      { path: "signout", element: <ProfileSignOut /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
