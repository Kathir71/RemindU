import axios from "axios";
import { useState, useRef } from "react";
import {MdOutlineDelete , MdOutlineModeEdit} from 'react-icons/md';
import {BsFillCalendar2WeekFill} from 'react-icons/bs'
import {BiTimeFive} from 'react-icons/bi'

import { editTaskApi , deleteTaskApi } from "../api/taskApi";

import styles from "./taskComponent.module.css";
const TaskComponent = (props) => {
  const { task, userId, setUserTasks , setEmpty} = props;
  const { taskString, taskDate, _id } = task;
  const dateString = new Date(taskDate).toLocaleString({TimeZone:"UTC"});
  const dateAlone = dateString.slice(0, dateString.indexOf(","));
  const timeAlone = dateString.slice(
    dateString.indexOf(",") + 1,
    dateString.length
  );
  const [editMode, setEditMode] = useState(false);
  const [errorState , setErrorState] = useState(false);
  const taskStringRef = useRef(0);
  const taskDateRef = useRef(0);
  const taskTimeRef = useRef(0);
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleEdit = async(e) => {
    e.preventDefault();
    const response = await editTaskApi({
      userId: userId,
      taskId: _id,
      updatedTaskString: taskStringRef.current.value,
      updatedTaskDate:
        taskDateRef.current.value + "T" + taskTimeRef.current.value,
    });
    if ( response.status === 200 ) {
    setEditMode(false);
    setUserTasks(response.data.userTasks);
    } else {
      setErrorState("Invalid date and time");
    }
      };
  const handleDelete = async(e) => {
    e.preventDefault();
    const response = await deleteTaskApi({
      user:userId,
      taskId:_id
    });
    if (response.status === 200) {
      if ( response.data.userTasks.length === 0 ) {
        setEmpty(true);
      }
      setUserTasks(response.data.userTasks);
    }
    else{
      setErrorState("Error in deleting task");
    }
  };
  return (
    <>
      <div className={styles.taskContainer}>
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
