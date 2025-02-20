import React, {useEffect, useState, useRef} from 'react';

import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from 'styled-components';
import serialize from 'form-serialize';
import update from 'react-addons-update';
import axios from 'axios';
import './assets/scss/App.scss';
import * as stylesModal from './assets/scss/Modal.scss';
//import data from './assets/json/data.js';

const CreateForm = styled.form``;
const UpdateForm = styled.form``;
const ItemList = styled.ul``;
const Item = styled.li``;


ReactModal.setAppElement("body");

function App() {
    const refCreateForm = useRef(null);
    const [items, setItems] = useState(null);
    //const [updateItem, setUpdateItem] = useState({type: '', name: ''});

    const [modalData, setModalData] = useState({
        open: false,
        itemId: 0,
        itemType: '',
        itemName: ''
    });

    const addItemWithImage = async(item) => {
        try {
            //const formData = new FormData();
            //formData.append("name", item.name);
            //..
            // ["name", "type", "file"]
            const formData = Object.keys(item).reduce((formData, key) => {
                formData.append(key, item[key]); // 왜 item.key로 하면 안되는가?
                return formData;
            }, new FormData());

            const result = await axios.post('/item', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });

            const jsonResult = result.data;

            setItems([jsonResult.data, ...items]);
        } catch(err) {
            // response가 없으면 통신 실패, response가 있다면 통신은 잘됐는데 실패
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
        
    }

    const addItem = async (item) => {
        console.log(item);
        try{
            const response = await fetch('/item', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
            
            // 비동기 함수여서 await를 붙여줘야 한다
            const jsonResult = await response.json();

            // 통신은 성공했는데 응답이 200이 아닌 경우
            if(!response.ok || jsonResult.result === 'fail') {
                throw new Error(`${response.status} ${jsonResult.message}`);
            }

            console.log(jsonResult.data);
            setItems([jsonResult.data, ...items]);
            refCreateForm.current.reset();
        } catch(err) {
            console.error(err);
        }
    };

    const fetchItems = async () => {
        try{ 
            const response = await fetch('/item', {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                },
                body: null
            });
            
            // 비동기 함수여서 await를 붙여줘야 한다
            const jsonResult = await response.json();

            // 통신은 성공했는데 응답이 200이 아닌 경우
            if(!response.ok || jsonResult.result === 'fail') {
                throw new Error(`${response.status} ${jsonResult.message}`);
            }

            setItems(jsonResult.data);

        } catch(err) {
            console.error(err);
        }
    };

    const clickItemName = async (id) => {
        try{
            const response = await axios.get(`/item/${id}`);
            const jsonResult = response.data;
            console.log(jsonResult.data);
            // setModalData(update(modalData, {open: {$set: false}}));
            // setUpdateItem(jsonResult.data);

            setModalData(update(modalData, {
                open: {$set: true},
                itemId: {$set: jsonResult.data.id},
                itemType: {$set: jsonResult.data.type},
                itemName: {$set: jsonResult.data.name}}));
        } catch(err) {
            // response가 없으면 통신 실패, response가 있다면 통신은 잘됐는데 실패
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    };

    const updateItem = async (id, item) => {
        console.log(id, new URLSearchParams(item).toString());

        try{
            const response = await axios.put(`/item/${id}`, new URLSearchParams(item).toString(), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const jsonResult = response.data;

            console.log(jsonResult.data);
            
            const index = items.findIndex((item) => item.id === jsonResult.data.id);

            setItems([...items.slice(0, index), jsonResult.data, ...items.slice(index+1)]);
            setModalData(update(modalData, {
                open: {$set: false},
                itemId: {$set: 0},
                itemType: {$set: ''},
                itemName: {$set: ''}
            }));

        } catch(err) {
            // response가 없으면 통신 실패, response가 있다면 통신은 잘됐는데 실패
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    };

    const deleteItem = async (id) => {
        try{
            const response = await axios.delete(`/item/${id}`);
            const jsonResult = response.data;

            console.log(jsonResult.data);
            setItems(items.filter((e) => e.id != jsonResult.data));
        } catch(err) {
            // response가 없으면 통신 실패, response가 있다면 통신은 잘됐는데 실패
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    };
    
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div id='App'>

            <h1>AJAX: Restful API</h1>

            <div>
                <form 
                    ref={refCreateForm}
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target.type.value, e.target.name.value);

                        try{
                            // const item = Array.from(e.target, (el) => {
                            //     if(el.name !== '' && el.value === '') {
                            //         throw new Error(`validation ${el.name} is empty`);
                            //     }

                            //     return {name: el.name, value: el.value};
                            // })
                            // .filter(({name}) => name !== '') //submit 골라내기
                            // // .forEach((o) => {
                            // //     console.log(o);
                            // // }) 이게 있으면 왜 에러나지?
                            // .reduce((res, {name, value}) => {
                            //     res[name] = value;
                            //     return res;
                            // }, {});
                            // console.log(item);
                            //  const queryString = serialize(e.target); // queryString
                            //  console.log(queryString); // type=BOOK&name=sdf

                            // validation
                            Array.from(e.target, (el) => {
                                if(el.name !== '' && el.value === '') {
                                    throw new Error(`validation ${el.name} is empty`);
                                }

                                return null;
                            });

                            const item = serialize(e.target, {hash: true}); //hash:true 옵션을 주면 객체로 만들어준다
                            addItem(item);

                            // e.target.reset(); 여기에 쓰면 성공여부를 알 수 없는 상황에서 쓰게 되는거니 useRef를 활용한다
                        } catch(err) {
                            console.error(err);
                        }
                        
                    }}>
                    <select name={'type'}>
                        <option>BOOK</option>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>FOOD</option>
                    </select>
                    {' '}
                    <input type={'text'} name={'name'} placeholder={'name'}/>
                    <input type={'submit'} value={'[C]reate (post)'}/>
                </form>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        Array.from(e.target, (el) => {
                            if(el.name !== '' && el.value === '') {
                                throw new Error(`validation ${el.name} is empty`);
                            }

                            return null;
                        });
                        //console.log(e.target);
                        const item = serialize(e.target, {hash: true}); //hash:true 옵션을 주면 객체로 만들어준다
                        item['file'] = e.target['file'].files[0];
                        //console.log(item['file']);
                        //console.log(e.target['file']);
                        addItemWithImage(item);
                    }}>
                    <select name={'type'}>
                        <option>BOOK</option>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>FOOD</option>
                    </select>
                    {' '}
                    <input type={'text'} name={'name'} placeholder={'name'}/>
                    <input type={'file'} name={'file'} />
                    <input type={'submit'} value={'[C]reate (post)'}/>
                </form>
            </div>


            <h2 title={'[R]ead (get)'}>Items</h2>


            <ItemList>
                {
                    items?.map((item, index) => <Item key={item.id}>
                        <h4>
                            <b 
                                title={'[R]ead (get)'}
                                onClick={() => clickItemName(item.id)}>{item.name}</b>
                            <button onClick={() => {
                                deleteItem(item.id);
                            }}>{'[D]elete (delete)'}</button>
                        </h4>
                        <div>
                            <span>
                                <b>{index+1}</b>
                                <i>{item.type}</i>
                            </span>
                            <ins style={{
                                backgroundImage: `url(${item.image || '/assets/images/no-image.png'})`
                            }}/>
                        </div>
                    </Item>)
                }
            </ItemList>



            <Modal
                isOpen={modalData.open}
                onRequestClose={() => setModalData(update(modalData, {open: {$set: false}}))}
                className={stylesModal.Modal}
                overlayClassName={stylesModal.Overlay}
                style={{content: {width: 280}}}>
                <h3>Update Item</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        const item = serialize(e.target, {hash: true});
                        updateItem(modalData.itemId, item);
                    }}>
                    <label>TYPE</label>
                    {' '}
                    <select 
                        name={'type'} 
                        value={modalData.itemType}
                        onChange={(e) => {
                            setModalData(update(modalData, {itemType: {$set: e.target.value}}));
                        }}>
                        <option>BOOK</option>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>FOOD</option>
                    </select>
                    <br/><br/>
                    <label>NAME</label>
                    {' '}
                    <input 
                        type={'text'} 
                        name={'name'} 
                        value={modalData.itemName} 
                        onChange={(e) => {
                            setModalData(update(modalData, {itemName: {$set: e.target.value}}));
                        }}/>   
                    <hr />
                    <input type={"submit"} value={'[U]pdate (update)'} />
                </form>
            </Modal>

        </div>
    );
}

export {App};