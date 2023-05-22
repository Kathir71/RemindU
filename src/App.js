
import {useState , useContext,useEffect} from 'react';

import logo from './logo.svg';
import Homepage from "./pages/homepage"
import TaskPage from './pages/taskpage';
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

import './App.css';
import { AuthProvider } from './contexts/Authcontext';
function App() {
  const [user , setUser] = useState(null);
  return (
    <>
    <Router>
      <AuthProvider>
      <Navbar/>
      <AllRoutes/>
      </AuthProvider>
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
      <Route path="/tasks" element = {<TaskPage/>}/>
    </Routes>
  )

}

export default App;
