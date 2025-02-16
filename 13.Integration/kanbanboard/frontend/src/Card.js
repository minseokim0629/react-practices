import React, {useState} from 'react';
import TaskList from './TaskList';
import * as styles from './assets/scss/Card.scss';

function Card({title, description, tasks}) {
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles._Card}>
            <div className={[`${styles.Card_Title} ${(visible ? styles.Card_Title_Open : null)}`]}
                onClick={() => {
                    setVisible(!visible)
                }}>{title}</div>
            <div className='Card_Details'>{description}</div>
            <TaskList 
                tasks={visible ? tasks : null}/>
        </div>
    ); 
}

export default Card;