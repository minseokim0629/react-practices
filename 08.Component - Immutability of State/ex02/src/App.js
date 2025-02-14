import React, {useState, useEffect} from 'react';
import update from 'react-addons-update';
import data from './assets/json/data.js';

function App() {
const [order, setOrder] = useState(data);
    const [payment, setPayment] = useState(order.payment);
    const [goods, setGoods] = useState(order.goods);

    useEffect(() => {
        console.log('Order updated');
    }, [order]);

    useEffect(() => {
        console.log('Payment updated');
    }, [payment]);

    useEffect(() => {
        console.log('Goods updated');
    }, [goods]);

    return (
        <div id='App'>
            <button
                onClick={() => {
                    // violation
                    // order.receive = '서울시 서초구 논현동...';
                    // setOrder(order);

                    // sol.
                    // const orderUpdated = Object.assign({}, order, {receive: '서울시 서초구 논현동...'}); // 2 -> 1로 복사, 3은 업데이트할 내용
                    // setOrder(orderUpdated);

                    // sol.recommended: 프로퍼티 
                    const orderUpdated = update(order, {
                        receive: {
                            $set: '서울시 서초구 논현동...'
                        }
                    });
                    setOrder(orderUpdated);
                }}>
                {"배송지 수정"}
            </button>
            <br/><br/>

            <button
                onClick={() => {
                    //violation
                    // 얕은 copy를 이해하지 못해서 업데이트가 안된다
                    // const orderUpdated = Object.assign({}, order);
                    // orderUpdated.payment.method = 'Mobile';
                    // setPayment(orderUpdated.payment);

                    // sol.
                    // const orderUpdated = Object.assign({}, order);
                    // orderUpdated.payment = Object.assign({}, order.payment, {method: 'Mobile'});
                    // setPayment(orderUpdated.payment);

                    // sol.recommended: nest 객체 프로퍼티 수정
                    const orderUpdated = update(order, {
                        payment: {
                            method: {
                                $set: 'Mobile'
                            }
                        }      
                    });
                    setPayment(orderUpdated.payment);
                }}>
                {"결제수단 변경"}
            </button>
            <br/><br/>

            <button
                onClick={() => {
                    // violation
                    // order.goods.push({"no": "d002-003", "name": "블루양말", "price": 2000, "amount": 1});
                    // setGoods(goods);

                    // sol.1
                    // concat은 끝에만 추가가 가능하다
                    //const goodsUpdated = goods.concat({"no": "d002-003", "name": "블루양말", "price": 2000, "amount": 1});
                    //setGoods(goodsUpdated);

                    // sol.2
                    // 요건 맨 앞에 추가
                    // const goodsUpdated = [{"no": "d002-003", "name": "블루양말", "price": 2000, "amount": 1},...goods]
                    // setGoods(goodsUpdated);

                    // 중간에 넣을 때
                    //[goods.slice(0, 1), {"no": "d002-003", "name": "블루양말", "price": 2000, "amount": 1}, goods.slice(1)]

                    // sol.recommended: 배열요소 추가
                    const goodsUpdated = update(goods, {
                        $unshift: [{"no": "d002-003", "name": "블루양말", "price": 2000, "amount": 1}]
                    })
                    setGoods(goodsUpdated);
                }}>
                    
                {"상품 추가"}
            </button>
            <br/><br/>

            <button
                onClick={() => {
                    // violation
                    // goods[2].name = '블루면티';
                    // setGoods(goods);
                    
                    //sol
                    //    const goodsUpdate = [...goods.slice(0, 2), Object.assign({}, goods[2], {name: '블루면티'}), ...goods.slice(3)];
                    //    setGoods(goodsUpdate);

                    //sol.recommended
                    const goodsUpdate = update(goods, {
                        2: {
                            name: {
                                $set: '블루면티'
                            }
                        }
                    });
                    setGoods(goodsUpdate);
                }}>
                {"3rd 상품이름 변경"}
            </button>
            <br/><br/>

            <hr/>

            <p>{`배송지:${order.receive}`}</p>
            <p>{`결제수단:${payment.method}`}</p> {/*왜 order.payment.method로 하면 안되는거지? 같은 객체를 가리키고 있는 거 아닌가?*/}
            <p>{'상품:'}</p>
            <ul>
                    {/* g -> 개별적인 상품, i -> index*/}
                    {goods.map((g, i) => <li key={i}>{`${g.name}:${g.price}:${g.amount}`}</li>)} 
            </ul>
        </div>
    );
}

export {App};