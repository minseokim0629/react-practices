import React, {useState} from 'react';
import TaskList from './TaskList';
import * as styles from './assets/scss/Card.scss';

function Card({title, description, tasks}) {
    const [activeIndex, setActiveIndex] = useState(-1);

    const selectCheckBox = (no) => {
        setActiveIndex(tasks.findIndex((e) => e.no === no));
        //console.log((`${no} selected`));
    };

    return (
        <div className={styles._Card}>
            <div className={`${styles.Card_Title} ${styles.Card_Title_Open}`}>{title}</div>
            <div className='Card_Details'>{description}</div>
            <TaskList 
                tasks={tasks.map((e, index) => {
                   // console.log(index, activeIndex);
                    if(index === activeIndex){
                       // console.log(e);
                        e.done === true ? false : true;
                    }
                    return e;
                })} 
                selectCheckBox={selectCheckBox}/>
        </div>
    ); 
}

export default Card;