import './App.css'
// import LandingPage from './components/LandingPage/LandingPage.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

