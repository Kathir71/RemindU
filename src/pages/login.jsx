import {useRef} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
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
        <div className="card">
            <form onSubmit={ e => handleLogin(e)}>
                <input type="text" name="uemail" id="uemail" ref={uemailRef} />
                <input type="text" name="upasswd" id="upasswd" ref={upasswdRef} />
                <input type="submit" value="Login" />
            </form>
        </div>
        </>
    )
}
export default Login;