import React, { useState } from 'react';
import data from './assets/json/data.js';
import update from 'react-addons-update';

function GoodList({goods}) {
    // goods.push({"no": "d002-003", "name": "블루양말", "price": 2000, "amount": 1});
    const goodsUpdated = goods.concat({"no": "d002-003", "name": "블루양말", "price": 2000, "amount": 1});
    
    return (
        <ul>
            {goodsUpdated.map((g, i)=> <li key={i}>{`${g.name}:${g.amount}:${g.price}`}</li>)}
        </ul>
    )
}

function App() {
    const [order, setOrder] = useState(data);
    return (
        <div id='App'>
            <p>{`배송지:${order.receive}`}</p>
            <p>{`결제수단:${order.payment.method}`}</p>
            <p>{'상품'}</p>
            <GoodList goods={order.goods}/>
            <button onClick={() => {
                setOrder(update(order, {
                    receive: {
                        $set: '서울시 강남구 논현동....'
                    }
                }));
            }}>
                {"배송지 수정"}
            </button>
        </div>
    );
}

export {App};