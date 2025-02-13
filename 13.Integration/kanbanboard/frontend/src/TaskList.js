import React, { useState } from 'react';
import Task from './Task';
import * as styles from './assets/scss/TaskList.scss';

function TaskList({tasks, selectCheckBox}) {
    //console.log(tasks);
    return (
        <div className={styles.Task_List}>
            <ul>
                {
                    tasks.map((task) => {
                        return <Task
                                    key={task.no}
                                    no={task.no}
                                    name={task.name}
                                    done={task.done}
                                    selectCheckBox={selectCheckBox}/>
                    })
                }
            </ul>
            <input className={styles.Input_Add_Task} type='text' placeholder='태스크 추가'/>
        </div>
    );
}

export default TaskList;