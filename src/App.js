import logo from './logo.svg';
import './App.css';
import Homepage from "./pages/homepage"
import AboutUs from './pages/aboutus';
import SignUp from './pages/signup';
import Login from './pages/login';
import Navbar from './components/Navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap"
import {
BrowserRouter as Router,
Routes,
Route,
Link
} from 'react-router-dom';
import {useState , useContext,useEffect} from 'react';
function App() {
  const [user , setUser] = useState(null);
  return (
    <>
    <Router>
      <Navbar/>
      <AllRoutes/>
    </Router>
    </>
  );
}
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path = "/signup" element={<SignUp />} />
      <Route path = "/login" element = {<Login />} />
    </Routes>
  )

}

export default App;
