import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import MasterClasses from "./pages/MasterClasses";
import Programs from "./pages/Programs";
import Blogs from "./pages/Blogs";
import News from "./pages/News";
import Interviews from "./pages/Interviews";
import Reels from "./pages/Reels";

const App = () => {
  return (
   <Router>
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/master-classes" element={<MasterClasses />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/news" element={<News />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/reels" element={<Reels />} />
        </Routes>
      </div>
    </Router>
  
      
      
  )
}

export default App

