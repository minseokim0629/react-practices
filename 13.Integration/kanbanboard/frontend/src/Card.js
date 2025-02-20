import React, {useState} from 'react';
import TaskList from './TaskList';
import * as styles from './assets/scss/Card.scss';

function Card({cardNo, title, description}) {
    const [visible, setVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    
    const fetchTasks = async (cardNo) => {
        try{
            const response = await fetch(`/kanbanboard/task?card=${cardNo}`, {
                method : 'get',
                headers : {
                    'Accept' : 'application/json'
                }
            });
    
            const jsonResult = await response.json();
    
            if(!response.ok || jsonResult.result === 'fail') {
                throw new Error(`${response.status} ${jsonResult.message}`);
            }
            
            //console.log(jsonResult);
            setTasks(jsonResult.data);

        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    return (
        <div className={styles._Card}>
            <div className={[`${styles.Card_Title} ${(visible ? styles.Card_Title_Open : null)}`]}
                onClick={() => {
                    setVisible(!visible);
                    fetchTasks(cardNo);
                }}>{title}</div>
            <div className='Card_Details'>{description}</div>
            <TaskList 
                tasks={visible ? tasks : null}
                setTasks={setTasks}
                cardNo={cardNo}/>
        </div>
    ); 
}

export default Card;