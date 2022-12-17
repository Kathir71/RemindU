import axios from 'axios';
import {useRef} from "react";
const SignUp = () => {
    const nameRef = useRef(0);
    const emailRef = useRef(0);
    const passwdRef = useRef(0);
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
        })

    }
    return (
    <>
        <div className="card">
            <h1>Sign Up</h1>
            <form onSubmit={e => handleformSubmit(e)}>
                <input ref={nameRef} type="text" name="uname" id="uname" />
                <input ref ={emailRef}type="text" name="uemail" id="email" />
                <input ref = {passwdRef} type="password" name="upasswd" id="upasswd" />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    </>
    )
}
export default SignUp;