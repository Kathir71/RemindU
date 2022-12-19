import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.myNavBar}`}>
          <Link className={styles.navBarBrand} to="/">
            RemindU
          </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="row" style={{width:"100%"}}>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <div className={`col-12 col-md-3 ${styles.navGrp}`}  style={{justifyContent:"flex-start"}}>
                <li className={`nav-item ${styles.navItem} `}>
                  <Link className={styles.navLink} to="/">
                    Home
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link className={styles.navLink} to="/about">
                    About Us
                  </Link>
                </li>
              </div>
              <div className = {`col-12 col-md-4 offset-md-5 ${styles.navGrp}`} >
              <li className={styles.navItem}>
                <button className={styles.neonButton}>
                  <Link className={styles.navLink} to="/signup">
                    SignUp
                  </Link>
                </button>
              </li>
              <li className={styles.navItem}>
                <button className={styles.neonButton}>
                  <Link className={styles.navLink} to="/login">
                    Login
                  </Link>
                </button>
              </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
