import api from "./axios";
const fetchTasksUrl = "/";
const addTaskUrl = "/addTask";
const editTaskUrl = "/editTask";
const deleteTaskUrl = "/deleteTask";
export const fetchTaskApi = async(data) => {
    try{
        const response = await api.get(`/${data}`)
        return response;
    }
    catch(error){
        return error.response;
    }
}
export const addTaskApi = async(data) => {
    try{
        const response = await api.post(addTaskUrl, data)
        return response;
    }
    catch(error){
        return error.response;
    }
}
export const editTaskApi = async(data) => {
    try{
        const response = await api.post(editTaskUrl, data)
        return response;
    }
    catch(error){
        return error.response;
    }
}
export const deleteTaskApi = async(data) => {   
    try{
        const response = await api.post(deleteTaskUrl, data)
        return response;
    }
    catch(error){
        return error.response;
    }
}