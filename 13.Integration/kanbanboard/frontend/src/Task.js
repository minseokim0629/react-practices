import React, { useState } from 'react';
import * as styles from './assets/scss/Task.scss';

function Task({name, done}) {
    const [select, setSelect] = useState(done);
    
    return (
        <li className={styles._Task}>
            <input type='checkbox' checked={select} 
                onChange={() => {
                    setSelect(select => !select);
                }}/>{name}
             <a href='#' className={styles.Task_Remove}></a>
        </li>
    );
}

export default Task;