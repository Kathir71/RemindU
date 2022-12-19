import {useRef} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styles from "./Login.module.css";
const Login = () => {
    const uemailRef = useRef(0);
    const upasswdRef = useRef(0);
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8090/user/login" , {
            userEmail:uemailRef.current.value,
            userPassword:upasswdRef.current.value
        }).then((response) => {
            console.log(response.data[0]._id);
            sessionStorage.setItem("userId" , response.data[0]._id);
        })
    }
    return (
        <>
        <div className={`${styles.bodyWrapper}`}>
        <div className={`${styles.mycard}`}>
            <form className={`${styles.loginForm}`}onSubmit={ e => handleLogin(e)}>
                <input className = {`${styles.inputElement}`}type="text" name="uemail" id="uemail" ref={uemailRef} placeholder="Email" autoComplete='off'/>
                <input className = {`${styles.inputElement}`}type="password" name="upasswd" id="upasswd" ref={upasswdRef} placeholder="Password" autoComplete='off'/>
                <input className = {`${styles.neonButton}`}type="submit" value="Login" />
                <p className={`${styles.text}`}>New User? <Link to = "/signup">SignUp</Link></p>
            </form>
        </div>
        </div>
        </>
    )
}
export default Login;