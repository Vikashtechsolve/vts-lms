import './App.css'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Routed pages will render here */}
        <LandingPage />
      </main>
    </div>
  );
}

export default App;

