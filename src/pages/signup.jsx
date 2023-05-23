import axios from "axios";
import { useRef, useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import styles from "./Signup.module.css";
import Loaders from "../components/Loaders";
import { signupApi } from "../api/userApi";
const SignUp = () => {
  const nameRef = useRef(0);
  const emailRef = useRef(0);
  const passwdRef = useRef(0);
  const navigate = useNavigate();
  const [errorString, setErrorString] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleformSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    let uname = nameRef.current.value;
    let uemail = emailRef.current.value;
    let upasswd = passwdRef.current.value;
    const response = await signupApi({
      username:uname , 
      useremail:uemail , 
      userpasswd:upasswd});
      if(response.status === 200){
        sessionStorage.clear();
        sessionStorage.setItem("userId", response.data._id);
        setLoading(false);
        navigate("/tasks");
      }
      else{
        setErrorString("Email has been already taken");
        setLoading(false);
      }
  };
  return (
    <div className={`${styles.bodyWrapper}`}>
      {loading ? (
        <Loaders />
      ) : (
        <div className={styles.mycard}>
          <form
            className={`${styles.signupForm}`}
            onSubmit={(e) => handleformSubmit(e)}
          >
            <input
              className={`${styles.inputElement}`}
              ref={nameRef}
              type="text"
              name="uname"
              id="uname"
              placeholder="Name"
              autoComplete="off"
            />
            <input
              className={`${styles.inputElement}`}
              ref={emailRef}
              type="text"
              name="uemail"
              id="email"
              placeholder="Email"
              autoComplete="off"
            />
            <input
              className={`${styles.inputElement}`}
              ref={passwdRef}
              type="password"
              name="upasswd"
              id="upasswd"
              placeholder="Password"
              autoComplete="off"
            />
            <input
              className={styles.neonButton}
              type="submit"
              value="Sign Up"
            />
            <p className={styles.text}>
              Already Signed up? <Link to="/login">Login</Link>
            </p>
            <div style={{ background: "red" }}>{errorString}</div>
          </form>
        </div>
      )}
    </div>
  );
};
export default SignUp;
