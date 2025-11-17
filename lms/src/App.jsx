import './App.css'
// import LandingPage from './components/LandingPage/LandingPage.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import { Outlet } from "react-router-dom";

function App() {
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

export default App;

