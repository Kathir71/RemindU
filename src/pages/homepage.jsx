import Navbar from "../components/Navbar";
import TaskComponent from "../components/taskComponent";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {Link} from 'react-router-dom'
import styles from "./homepage.module.css";
const HomePage = () => {
  const [userId , setUserId] = useState();
    useEffect(() => {
      const currUser = sessionStorage.getItem("userId");
      setUserId(currUser);
    },[]);
    return (
      <div className={`${styles.bodyWrapper}`}>
        <div className={`${styles.hero} row`}>
          <div className={`${styles.heroText} col-12 col-md-6`}>
            <h1 className={styles.heroTitle}>Remind <span style={{color:"rgb(15,170,236)"}}>U</span></h1>
            <p style={{color:"rgb(240,240,240)"}}> Meet the world's simplest email reminder</p>
            <div className={styles.textTyping}>
              <p className={styles.textTypingText}>
                The secret of productivity
              </p>
            </div>
            <button className={styles.getStartedBtn}><Link to = {userId !== null?"/tasks":"/login"}>Get Started</Link></button>
          </div>
          <div className={`${styles.heroImg} col col-md-6 d-md-block d-none`}>
          <img src={process.env.PUBLIC_URL + "mailSend.svg"} />
          </div>
        </div>
      </div>
    );
};
export default HomePage;
