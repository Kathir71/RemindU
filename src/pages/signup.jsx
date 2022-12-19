import axios from 'axios';
import {useRef , useState} from "react";
import {Link} from 'react-router-dom'
import styles from "./Signup.module.css"
const SignUp = () => {
    const nameRef = useRef(0);
    const emailRef = useRef(0);
    const passwdRef = useRef(0);
    const [errorState , setErrorState] = useState(false);
    const handleformSubmit = (e) => {
        e.preventDefault();
        let uname = nameRef.current.value;
        let uemail = emailRef.current.value;
        let upasswd = passwdRef.current.value;
        console.log(`The username is ${uname} email: ${uemail} passwd: ${upasswd}`);
        axios.post("http://localhost:8090/user/signup" , {
            username:uname,
            useremail:uemail,
            userpasswd:upasswd
        }).then((response) => {
            console.log(response);
            sessionStorage.clear();
            sessionStorage.setItem("userId" , response.data._id);
            window.location.href="/tasks";
        }).catch((err) => {
            console.log(err.message);
        })
    }
    return (
    <div className={`${styles.bodyWrapper}`}>
        <div className={styles.mycard}>
            <form className = {`${styles.signupForm}`}onSubmit={e => handleformSubmit(e)}>
                <input className={`${styles.inputElement}`} ref={nameRef} type="text" name="uname" id="uname" placeholder='Name' autoComplete='off'/>
                <input className={`${styles.inputElement}`} ref ={emailRef}type="text" name="uemail" id="email" placeholder='Email' autoComplete='off'/>
                <input className={`${styles.inputElement}`} ref = {passwdRef} type="password" name="upasswd" id="upasswd" placeholder='Password'autoComplete='off' />
                <input className={styles.neonButton}type="submit" value="Sign Up" />
                <p className={styles.text}>Already Signed up? <Link to="/login">Login</Link></p>
            </form>
        </div>
        </div>
    )
}
export default SignUp;