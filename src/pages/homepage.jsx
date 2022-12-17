import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
const HomePage = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const taskStringRef = useRef(0);
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
        setUserTasks(response.data[0].tasks);
        console.log(response.data[0].tasks);
      });
    }
  };
  const handleAddTaskClick = (e) => {
    console.log("Changing mode");
    setAddMode(true);
  };
  const handleAddTask = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8090/addTask", {
        userId: userId,
        taskString: taskStringRef.current.value,
      })
      .then((response) => {
        console.log(response);
      fetchData();
    setAddMode(false);
      });
  };
  if (userTasks.length === 0) {
    return "Login";
  } else
    return (
      <>
        <button
          className="btn btn-primary"
          onClick={(e) => handleAddTaskClick(e)}
        >
          {" "}
          Add task
        </button>
        {userTasks.map((task) => {
          return <p>{task}</p>;
        })}
        <div className={addMode ? "d-block" : "d-none"}>
          <form onSubmit={(e) => handleAddTask(e)}>
            <input
              type="text"
              name="taskString"
              id="taskString"
              ref={taskStringRef}
            />
            <input type="submit" value="Add Task" />
          </form>
        </div>
      </>
    );
};
export default HomePage;
