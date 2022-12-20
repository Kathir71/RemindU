import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
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
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className={styles.navToggleLabel}>
        <span></span>
      </label>
    </header>
  );
};
export default Navbar;
