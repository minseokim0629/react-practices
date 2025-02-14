import React from 'react';
import CardList from './CardList';
import {Kanban_Board} from './assets/scss/KanbanBoard.scss';
import cards from './assets/json/data.js';

function KanbanBoard() {

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