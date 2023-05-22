import Navbar from "../components/Navbar";
import TaskComponent from "../components/taskComponent";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./taskpage.module.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { addTaskApi, fetchTaskApi } from "../api/taskApi";
import Loaders from "../components/Loaders";
const TaskPage = () => {
  const [userTasks, setUserTasks] = useState([""]);
  const [addMode, setAddMode] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const taskStringRef = useRef(0);
  const taskDateRef = useRef(0);
  const taskTimeRef = useRef(0);
  const userId = sessionStorage.getItem("userId");
  console.log("From taskPage" + userId);
  useEffect(() => {
    const response = fetchData();
    console.log(response);
    console.log(userId);
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetchTaskApi(userId);
    if (response.data.userTasks.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
      setUserTasks(response.data.userTasks);
    }
    setLoading(false);
  };
  const handleAddTaskClick = (e) => {
    console.log("Changing mode");
    setAddMode(true);
  };
  const handleAddTask = async (e) => {
    e.preventDefault();
    console.log(taskDateRef.current.value);
    console.log(taskTimeRef.current.value);
    setLoading(true);
    const response = await addTaskApi({
      userId: userId,
      taskString: taskStringRef.current.value,
      taskDate: taskDateRef.current.value + "T" + taskTimeRef.current.value,
    });
    await fetchData();
    setLoading(false);
    setAddMode(false);
  };
  return (
    <>
      {loading ? (
        <Loaders />
      ) : empty ? (
        <div className={styles.bodyWrapper}>
          <div className={styles.emptyDiv}>
            <p className={styles.emptyText}>You have no upcoming tasks.Add one to get started.</p>
           {!addMode && <button
              className={`${styles.addBtn} ${styles.animate}`}
              onClick={(e) => handleAddTaskClick(e)}
            >
              <BsFillPlusCircleFill
                style={{ fontSize: "1.5rem", marginRight: "10px" }}
              />
              Add task
            </button>}
            <div className={addMode ? ` d-block` : `d-none`}>
              <form
                className={styles.addTaskModal}
                onSubmit={(e) => handleAddTask(e)}
              >
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
          </div>
        </div>
      ) : (
        <div className={styles.bodyWrapper}>
          <div className={styles.header}>
            <h1 className={styles.headerText}>Your tasks</h1>
            {!addMode &&<button
              className={`${styles.addBtn} ${styles.animate}`}
              onClick={(e) => handleAddTaskClick(e)}
            >
              <BsFillPlusCircleFill
                style={{ fontSize: "1.5rem", marginRight: "10px" }}
              />
              Add task
            </button>}
          </div>
          <div className={addMode ? ` d-block` : `d-none`}>
            <form
              className={styles.addTaskModal}
              onSubmit={(e) => handleAddTask(e)}
            >
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
            <span className={styles.top}></span>
            <span className={styles.right}></span>
            <span className={styles.bottom}></span>
            <span className={styles.left}></span>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskPage;
