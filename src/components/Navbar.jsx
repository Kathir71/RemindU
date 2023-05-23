import { useContext } from "react";
import { Link  , useNavigate} from "react-router-dom";

import { AuthContext } from "../contexts/Authcontext";

import styles from "./Navbar.module.css";
const Navbar = () => {
  const {auth , setAuth , setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () =>{
    setAuth(false);
    setUser(false);
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <>
    <div className={styles.header}>
      <h1 className={styles.logo}>
        <Link className={styles.navBarBrand} to="/">
          RemindU
        </Link>
      </h1>
      <input type="checkbox" id="nav-toggle" className={styles.navToggle} />
      <nav>
        <ul>
          <li>
            <Link className={styles.link} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/about">
              About Us
            </Link>
          </li>
          {auth ===false ?<>
          <li>
            <button className={styles.neonButton}>
              <Link className={styles.linkButton} to="/signup">
                SignUp
              </Link>
            </button>
          </li>
          <li>
            <button className={styles.neonButton}>
              <Link className = {styles.linkButton}to="/login">
                Login
              </Link>
            </button>
          </li>
          </>:
          <>
          <li>
            <button className={styles.neonButton} onClick={e => handleLogout(e)}>
              Logout
            </button>
          </li>
          <li>
            <button className={styles.neonButton}>
              <Link className = {styles.linkButton}to="/tasks">
                Your tasks
              </Link>
            </button>
          </li>
          </>
          }
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className={styles.navToggleLabel}>
        <span></span>
      </label>
    </div>
    </>
  );
};
export default Navbar;
