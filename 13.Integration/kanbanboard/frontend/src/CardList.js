import React from 'react';
import Card from './Card';
import {Card_List} from './assets/scss/CardList.scss';


function CardList({title, cards}) {
    return (
        <div className={Card_List}>
            <h1>{title}</h1>
            {
                cards.map((card) => {
                    return <Card 
                                key={card.no}
                                cardNo={card.no}
                                title={card.title}
                                description={card.description}/>
                })
            }
        </div>
    );
}

export default CardList;