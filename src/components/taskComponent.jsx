import axios from 'axios';
import {useState , useRef} from 'react';    

const TaskComponent = (props) => {
    const {task,userId , setUserTasks} = props;
    const {taskString , taskDate , _id} = task; 
    const dateString = new Date(taskDate).toLocaleString();
    const [currentTask ,setcurrentTask] = useState(taskString);
    const [editMode , setEditMode] = useState(false);
    const taskStringRef = useRef(0);
    const taskDateRef = useRef(0);
    const handleEditClick = () => {
        setEditMode(true);
    }
    const handleEdit = (e) => {
        e.preventDefault();
        console.log("inside handle edit");
        axios.post("http://localhost:8090/editTask" , {
            userId:userId,
            taskId:_id,
            updatedTaskString:taskStringRef.current.value,
            updatedTaskDate:taskDateRef.current.value
        }).then((response) => {
        setEditMode(false);
        console.log(setUserTasks);
        console.log(response.data);
        setUserTasks(response.data.userTasks);
        })
    }
    const handleDelete = (e) => {
        e.preventDefault();
        console.log("id is" + _id);
        axios.post("http://localhost:8090/deleteTask" , {
            user:userId,
            taskId:_id
        }).then((response) => {
            setUserTasks(response.data.userTasks);
        })
    }
    return (
        <div key={_id.toString()}>
        <div  className={editMode? "d-none" : "d-block"}>
        <li>{taskString}</li>
        <li>{dateString}</li>
        <button className="btn btn-primary" onClick={e => handleEditClick()}>Edit</button>
        <button className="btn btn-primary" onClick={e => handleDelete(e)}>Delete</button>
        </div>
        <div className={editMode?"d-block" : "d-none"}>
            <form onSubmit = {e => handleEdit(e , currentTask)}>
                <input type="text" name="editTask" id="editTask" ref = {taskStringRef} placeholder = {currentTask}/>
                <input type="datetime" name="dt" id="dt" ref={taskDateRef} />
                <input type="submit" value="Edit" />
            </form>
        </div>
        </div>
    )
}
export default TaskComponent;