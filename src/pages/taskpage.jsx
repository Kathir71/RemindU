import Navbar from "../components/Navbar";
import TaskComponent from "../components/taskComponent";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./taskpage.module.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
const TaskPage = () => {
  const [userTasks, setUserTasks] = useState([""]);
  const [addMode, setAddMode] = useState(false);
  const taskStringRef = useRef(0);
  const taskDateRef = useRef(0);
  const taskTimeRef = useRef(0);
  const userId = sessionStorage.getItem("userId");
  console.log("From taskPage" + userId);
  useEffect(() => {
    fetchData();
    console.log(userId);
  }, []);
  const fetchData = () => {
    let url = "http://localhost:8090/";
    url = url.concat(userId);
    console.log(url);
    axios.get(url).then((response) => {
      console.log(response.data);
      setUserTasks(response.data.userTasks);
      console.log(response.data.userTasks);
    });
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
        taskDate: taskDateRef.current.value + "T" + taskTimeRef.current.value,
      })
      .then((response) => {
        console.log(response);
        fetchData();
        setAddMode(false);
      });
  };
  return (
    <>
      <div className={styles.bodyWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headerText}>Your tasks</h1>
          <button
            className={`${styles.addBtn} ${styles.animate}`}
            onClick={(e) => handleAddTaskClick(e)}
          >
            <BsFillPlusCircleFill
              style={{ fontSize: "1.5rem", marginRight: "10px" }}
            />
            Add task
          </button>
        </div>
        <div className={addMode ? ` d-block` : `d-none`}>
          <form className = {styles.addTaskModal} onSubmit={(e) => handleAddTask(e)}>
            <input
              type="text"
              name="taskString"
              id="taskString"
              ref={taskStringRef}
              className={styles.inputElement}
              placeholder="Task to remind"
              required="true"
            />
            <input
              type="date"
              name="tdate"
              id="tdate"
              ref={taskDateRef}
              autoComplete="off"
              className={styles.inputElement}
              required="true"
            />
            <input
              type="time"
              name="ttime"
              id="ttime"
              ref={taskTimeRef}
              autoComplete="off"
              className={styles.inputElement}
              required="true"
            />
            <div className={styles.container}>
              <div className={styles.bg}></div>
              <button className={styles.button}>
                <BsFillPlusCircleFill style={{ color: "white" }} />
              </button>
            </div>
            <span className={styles.top}></span>
            <span className={styles.right}></span>
            <span className={styles.bottom}></span>
            <span className={styles.left}></span>
          </form>
        </div>

        <div className={styles.taskContainer}>
          {userTasks.map((task) => {
            return (
              <TaskComponent
                key={task._id}
                task={task}
                userId={userId}
                setUserTasks={setUserTasks}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default TaskPage;