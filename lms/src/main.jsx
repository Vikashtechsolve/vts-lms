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
// import RecordedClassCard from "./components/Cards/RecordedClassCard.jsx";
// import UpcomingEventCard from "./components/Cards/UpcomingEventCard.jsx";
import RecordedClass from "./Pages/MasterClass/RecordedClass.jsx";
import UpcomingEventClass from "./Pages/MasterClass/UpcomingEventClass.jsx";
// import LiveClassCard from "./components/Cards/LiveClassCard";


// create router with nested routes (App is the layout)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: <LandingPage /> },                
      { path: "playlist", element: <Playlist/> },
      { path: "/playlist/:id", element: <PlaylistDetail /> },
      { path: "/MasterClass", element: <MasterClass /> },
      { path: "/Programs", element: <Programs /> },
      { path: "/Blogs", element: <Blogs/> },
      { path: "/News", element: <News/> },
      { path: "/Interviews", element: <Interview/> },
      { path: "/Reels", element: <Reels/> },
      { path: "signin", element: <SignIn /> },
      { path: "/LiveClass/:id", element: <LiveClass /> },    // live page (you already had)
      { path: "/Recorded/:id", element: <RecordedClass/> },
      { path: "/Upcoming/:id", element: <UpcomingEventClass/> },

      


                
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
