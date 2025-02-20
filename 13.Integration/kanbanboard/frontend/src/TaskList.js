import React, { useRef, useState } from 'react';
import Task from './Task';
import serialize from 'form-serialize';
import * as styles from './assets/scss/TaskList.scss';

function TaskList({tasks, setTasks, cardNo}) {
    const refCreateTask = useRef(null);

    const addTask = async(task) => {
        console.log(task);
        const response = await fetch('/kanbanboard/task', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const jsonResult = await response.json();

        if(!response.ok || jsonResult.result === 'fail') {
            throw new Error(`${response.status} ${jsonResult.message}`);
        }

        setTasks([jsonResult.data, ...tasks]);
        refCreateTask.current.value = "";
    };
    return (
        <div className={styles.Task_List}>
            <ul>
                {
                    tasks?.map((task) => {
                        return <Task
                                    key={task.no}
                                    no={task.no}
                                    name={task.name}
                                    done={task.done}
                                    tasks={tasks}
                                    setTasks={setTasks}/>
                    })
                }
            </ul>
            {tasks && (
                <input className={styles.Input_Add_Task} 
                       type='text' 
                       placeholder='태스크 추가'
                       ref={refCreateTask}
                       onKeyDown={(e) => {
                            if(e.key === 'Enter') {
                                const task = {
                                    no: null,
                                    name: e.target.value,
                                    done: 'N',
                                    cardNo: cardNo
                                }
                                addTask(task);
                            }
                       }}/>
            )}
        </div>
    );
}

export default TaskList;