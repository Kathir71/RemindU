import styles from "./aboutus.module.css";
import {SiMongodb , SiExpress , SiReact} from "react-icons/si"
const AboutUs = () => {
    return (
        <>
        <div className={styles.bodyWrapper}>
        <h1 className={styles.heroTitle}>About Us</h1>
        <p className={styles.content}>A simple website that reminds you of your works through email.</p>
        <h2 className={styles.subTitle}>Tech Stack used</h2>
        <ul className={styles.techStack}>
            <li
            style={{
                fontSize:"2rem",
                color:"rgb(15,170,236)"
            }}
            ><SiReact/>React</li>
            <li
            style={{
                fontSize:"2rem",
                color:"rgb(15,170,236)"
            }}
            ><SiExpress
           />Express</li>
            <li
            style={{
                fontSize:"2rem",
                color:"#00ED64"
            }}
            ><SiMongodb/>MongoDB</li>
        </ul>
        </div>
        </>
    )
}
export default AboutUs;