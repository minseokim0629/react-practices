import React, { useState } from 'react';
import * as styles from './assets/scss/Task.scss';

function Task({no, name, done, selectCheckBox}) {
    //const [select, setSelect] = useState(false);
    return (
        <li className={styles._Task}>
            <input type='checkbox' checked={done} 
                onChange={() => {
                    selectCheckBox(no);
                }}/>{name}
             <a href='#' className={styles.Task_Remove}></a>
        </li>
    );
}

export default Task;