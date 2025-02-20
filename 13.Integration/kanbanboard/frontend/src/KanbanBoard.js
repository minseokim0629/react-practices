import React, { useEffect, useState } from 'react';
import CardList from './CardList';
import {Kanban_Board} from './assets/scss/KanbanBoard.scss';
//import cards from './assets/json/data.js';

function KanbanBoard() {
    const [cards, setCards] = useState([]);

    const fetchCards = async () => {
        try{
            const response = await fetch('/kanbanboard/card', {
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

            setCards(jsonResult.data);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    };

    useEffect(() => {
        fetchCards();
        //console.log(cards);
    }, []);

    return (
        <div className={Kanban_Board}>
            <CardList 
                key={'ToDo'}
                title={'ToDo'}
                cards={cards.filter(card => card.status === 'ToDo')}/>
            <CardList 
                key={'Doing'}
                title={'Doing'}
                cards={cards.filter(card => card.status === 'Doing')}/>
            <CardList 
                key={'Done'}
                title={'Done'}
                cards={cards.filter(card => card.status === 'Done')}/>
        </div>
    );
}

export default KanbanBoard;