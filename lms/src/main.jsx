// src/index.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
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

import Profile from "./Pages/Profile/Profile.jsx";
import ProfileCertificates from "./Pages/Profile/ProfileCertificates.jsx";
import ProfileBadges from "./Pages/Profile/ProfileBadges.jsx";
import ProfileSubscription from "./Pages/Profile/ProfileSubscription.jsx";
import ProfileNotifications from "./Pages/Profile/ProfileNotifications.jsx";
import ProfileWatchlist from "./Pages/Profile/ProfileWatchlist.jsx";
import ProfileSignOut from "./Pages/Profile/ProfileSignOut.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "playlist", element: <Playlist /> },
      { path: "playlist/:id", element: <PlaylistDetail /> },
      { path: "masterclass", element: <MasterClass /> },
      { path: "programs", element: <Programs /> },
      { path: "blogs", element: <Blogs /> },
      { path: "news", element: <News /> },
      { path: "interviews", element: <Interview /> },
      { path: "reels", element: <Reels /> },
      { path: "signin", element: <SignIn /> },

      { path: "liveclass/:id", element: <LiveClass /> },
      { path: "recorded/:id", element: <RecordedClass /> },
      { path: "upcoming/:id", element: <UpcomingEventClass /> },

      { path: "profile", element: <Profile /> },
      { path: "certificates", element: <ProfileCertificates /> },
      { path: "badges", element: <ProfileBadges /> },
      { path: "subscription", element: <ProfileSubscription /> },
      { path: "notifications", element: <ProfileNotifications /> },
      { path: "watchlist", element: <ProfileWatchlist /> },
      { path: "signout", element: <ProfileSignOut /> },



    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
