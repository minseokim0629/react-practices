import React, { useState } from 'react';
import axios from 'axios';
import update from 'react-addons-update';
import * as styles from './assets/scss/Task.scss';

function Task({no, name, done, tasks, setTasks}) {

   const updateTaskDone = async (no, done) => {
        try{
            console.log(no, done);
            const response = await axios.put(`/kanbanboard/task/${no}?done=${done}`, {
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/x-www-form-urlencoded'
                } 
            });

            const jsonResult = response.data;

            //console.log(jsonResult.data);

            const index = tasks.findIndex((task) => task.no === jsonResult.data.no);

            setTasks([...tasks.slice(0, index), update(tasks[index], {
                done: {$set: jsonResult.data.done}
            }), ...tasks.slice(index+1)]);
            //console.log(tasks);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
   };

   const deleteTask = async(no) => {
        try{
            const response = await axios.delete(`/kanbanboard/task/${no}`);

            const jsonResult = response.data;

            setTasks(tasks.filter((e) => e.no !== jsonResult.data));
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
   };

    return (
        <li className={styles._Task}>
            <input type='checkbox' checked={done==='Y'} 
                onChange={() => {
                    //setSelect(select => !select);
                    updateTaskDone(no, (done==='Y' ? 'N' : 'Y'));
                }}/>{name}
             <a href='#' 
                className={styles.Task_Remove}
                onClick={() => {
                    deleteTask(no);
                }}></a>
        </li>
    );
}

export default Task;