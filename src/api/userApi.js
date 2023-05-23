import api from "./axios";
const signupUrl = "/user/signup";
const loginUrl = "/user/login";
export const signupApi = async(config , data) => {
    try{
    const response = await api.post(signupUrl, data)
    console.log(response);
    return response;
    }
    catch(error){
        return error.response;
    }
}
export const loginApi = async (data) => {
    try{
        const response = await api.post(loginUrl, data)
        console.log(response);
        return response;
    }
    catch(error){
        return error.response;
    }
}