// styles
import './App.css';

// components
import Navbar from './components/Navbar';

// pages
import Home from "./pages/home/Home"

function App() {
  return (
    <>
      <Navbar className="navbar"/>
      <Home/>
    </>
  );
}

export default App;
