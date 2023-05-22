import { createContext ,useState , useEffect} from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [auth , setAuth] = useState(false);
    const [user , setUser] = useState({});
    useEffect(() => {
        if (sessionStorage.getItem("userId") !== null) {
            setAuth(true);
            setUser(sessionStorage.getItem("userId"));
        }
        else{
            setAuth(false);
            setUser({});
        }
    } , []);
    return (
        <AuthContext.Provider value={{auth , setAuth , user , setUser}}>
            {children}
        </AuthContext.Provider>
    )
}