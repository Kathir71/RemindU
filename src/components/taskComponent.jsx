import axios from "axios";
import { useState, useRef } from "react";
import styles from "./taskComponent.module.css";
import {MdOutlineDelete , MdOutlineModeEdit} from 'react-icons/md';
import {BsFillCalendar2WeekFill} from 'react-icons/bs'
import {BiTimeFive} from 'react-icons/bi'
const TaskComponent = (props) => {
  const { task, userId, setUserTasks } = props;
  const { taskString, taskDate, _id } = task;
  const dateString = new Date(taskDate).toLocaleString();
  const dateAlone = dateString.slice(0, dateString.indexOf(","));
  const timeAlone = dateString.slice(
    dateString.indexOf(",") + 1,
    dateString.length
  );
  const [editMode, setEditMode] = useState(false);
  const taskStringRef = useRef(0);
  const taskDateRef = useRef(0);
  const taskTimeRef = useRef(0);
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    console.log("inside handle edit");
    axios
      .post("http://localhost:8090/editTask", {
        userId: userId,
        taskId: _id,
        updatedTaskString: taskStringRef.current.value,
        updatedTaskDate:
          taskDateRef.current.value + "T" + taskTimeRef.current.value,
      })
      .then((response) => {
        setEditMode(false);
        console.log(setUserTasks);
        console.log(response.data);
        setUserTasks(response.data.userTasks);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    console.log("id is" + _id);
    axios
      .post("http://localhost:8090/deleteTask", {
        user: userId,
        taskId: _id,
      })
      .then((response) => {
        setUserTasks(response.data.userTasks);
      });
  };
  return (
    <>
      <div className={styles.taskContainer}>
        {/* <div className={editMode ? "d-none" : `d-block ${styles.textGrp}`}> */}
        <div className={styles.textGrp}>
            <div><p className={styles.styledText}>{taskString}</p></div>
            <div> <BsFillCalendar2WeekFill style={{color:"rgb(240,240,240)",fontSize:"1.3rem"}}/> <p className={styles.styledText}>{dateAlone}</p></div>
            <div> <BiTimeFive  style={{color:"rgb(240,240,240)",fontSize:"1.3rem"}}/><p className={styles.styledText}>{timeAlone}</p></div>
        </div>
          <div className={styles.btnGrp}>
            <button
              onClick={(e) => handleEditClick()}
              className={styles.neonButton}
              style = {{color:"rgb(11,255,11)" , border: "rgb(11,255,11) 0.125em solid" , boxShadow: "inset 0 0 0.5em 0 rgb(11,255,11)"}}
            >
                <MdOutlineModeEdit style={{color:"rgb(11,255,11)" , fontSize:"1.5rem"}}/>
              Edit
            </button>
            <button
              onClick={(e) => handleDelete(e)}
              className={styles.neonButton}
              style = {{color:"rgb(255,11,11)" , border: "rgb(255,11,11) 0.125em solid" , boxShadow: "inset 0 0 0.5em 0 rgb(255,11,11)"}}
            >
                <MdOutlineDelete  style={{color:"rgb(255,11,11)" , fontSize:"1.5rem"}}/>
              Delete
            </button>
          </div>
        </div>
      <div className={editMode ? "d-block" : "d-none"}>
        <form onSubmit={(e) => handleEdit(e)} className={`${styles.editForm}`}>
          <input
            type="text"
            name="editTask"
            id="editTask"
            ref={taskStringRef}
            placeholder={taskString}
            className={`${styles.inputElement}`}
          />
          <input
            type="date"
            name="tdate"
            id="tdate"
            ref={taskDateRef}
            className={`${styles.inputElement}`}
          />
          <input
            type="time"
            name="ttime"
            id="ttime"
            ref={taskTimeRef}
            className={`${styles.inputElement}`}
          />
          <button type="submit" className={styles.confirmBtn} > Confirm </button>
        </form>
      </div>
    </>
  );
};
export default TaskComponent;
