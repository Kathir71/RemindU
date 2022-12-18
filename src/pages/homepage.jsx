import Navbar from "../components/Navbar";
import TaskComponent from "../components/taskComponent";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
const HomePage = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const taskStringRef = useRef(0);
  const taskDateRef = useRef(0);
  const taskTimeRef = useRef(0);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    fetchData();
    console.log(userId);
  }, []);
  const fetchData = () => {
    let url = "http://localhost:8090/";
    url = url.concat(userId);
    console.log(url);
    if (userId !== null) {
      axios.get(url).then((response) => {
        setUserTasks(response.data.userTasks);
        console.log(response.data.userTasks);
      });
    }
  };
  const handleAddTaskClick = (e) => {
    console.log("Changing mode");
    setAddMode(true);
  };
  const handleAddTask = (e) => {
    e.preventDefault();
    console.log(taskDateRef.current.value);
    console.log(taskTimeRef.current.value);
    axios
      .post("http://localhost:8090/addTask", {
        userId: userId,
        taskString: taskStringRef.current.value,
        taskDate:taskDateRef.current.value +"T"+ taskTimeRef.current.value
      })
      .then((response) => {
        console.log(response);
        fetchData();
        setAddMode(false);
      });
  };
  if (userTasks === null) {
    return "Login";
  } else
    return (
      <>
        <button
          className="btn btn-primary"
          onClick={(e) => handleAddTaskClick(e)}
        >
          Add task
        </button>
        {
            userTasks.map((task) => {
                return (
                <TaskComponent key={task._id} task={task} userId={userId} setUserTasks={setUserTasks}/>
                )
            })
        }
        <div className={addMode ? "d-block" : "d-none"}>
          <form onSubmit={(e) => handleAddTask(e)}>
            <input
              type="text"
              name="taskString"
              id="taskString"
              ref={taskStringRef}
            />
            <input type="date" name="tdate" id="tdate" ref = {taskDateRef} />
            <input type="time" name="ttime" id="ttime" ref = {taskTimeRef} />
            <input type="submit" value="Add Task" />
          </form>
        </div>
      </>
    );
};
export default HomePage;