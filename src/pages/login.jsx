import { useRef, useState ,useContext} from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

import Loaders from "../components/Loaders";
import { AuthContext } from "../contexts/Authcontext";
import { loginApi } from "../api/userApi";

import styles from "./Login.module.css";
const Login = () => {
  const uemailRef = useRef(0);
  const upasswdRef = useRef(0);
  const {auth , setAuth , user , setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [ErrorString, setErrorString] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleLogin = async(e) => {
    setLoading(true);
    e.preventDefault();
    const response = await loginApi({
        userEmail: uemailRef.current.value,
        userPassword: upasswdRef.current.value,
      });
    if (response.status === 200) {
        setLoading(false);
        setAuth(true);
        setUser(response.data[0]._id);
        sessionStorage.setItem("userId", response.data[0]._id);
        navigate("/tasks");
    }
    else{
        setLoading(false);
        console.log("Error has occured");
        setErrorString("Email or password is incorred");
      }
  };
  return (
    <>
      <div className={`${styles.bodyWrapper}`}>
        {loading ? (
          <Loaders />
        ) : (
          <div className={`${styles.mycard}`}>
            <form
              className={`${styles.loginForm}`}
              onSubmit={(e) => handleLogin(e)}
            >
              <input
                className={`${styles.inputElement}`}
                type="text"
                name="uemail"
                id="uemail"
                ref={uemailRef}
                placeholder="Email"
                autoComplete="off"
              />
              <input
                className={`${styles.inputElement}`}
                type="password"
                name="upasswd"
                id="upasswd"
                ref={upasswdRef}
                placeholder="Password"
                autoComplete="off"
              />
              <input
                className={`${styles.neonButton}`}
                type="submit"
                value="Login"
              />
              <p className={`${styles.text}`}>
                New User? <Link to="/signup">SignUp</Link>
              </p>
              <div style={{ background: "red" }}>{ErrorString}</div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
export default Login;
