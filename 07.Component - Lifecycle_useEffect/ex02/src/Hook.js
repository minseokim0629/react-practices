import React, {useState, useEffect} from 'react';

export default function Hook({ color }) {
    const [boxColor, setBoxColor] = useState(null);
    const [title, setTitle] = useState('');

    /**
     *   [1] Alternative 01: getDerivedStateFromProps - useEffect를 가지고 하는게 아니라 무시해도 됨
     */
    if(boxColor !== color) {
        setBoxColor(color);
    }

    /**
     *   [2-1] After Rendering 함수 - Alternative 02: componentDidUpdate
     */
    useEffect(() => {
        console.log('After Rendering1');
    });
    /**
     *  [2-2] After Rendering 함수 - 어떤 특정 상태(boxColor)의 변화에 반응(관심 분리) - 2-1이 메인, 이건 부가적
     */
    useEffect(() => {
        console.log('After Rendering: boxColor Updated');
    }), [boxColor];

    useEffect(() => {
        console.log('After Rendering: title Updated');
    }), [title];
    

    /**
     *  [3] Alternative 03: componentDidMount & componentWillUnmount
     */
    useEffect(() => {
        console.log('After Mount(componentDidMount'); // Mount 됐을 때 불림

        return () => { // UnMount 됐을 때 불림
            console.log('After Unmount(componentWillUnmount');
        }
    }, []);




    // render
    return (
        <>
            <h3
                style={ {
                    width: 100,
                    height: 50,
                    backgroundColor: boxColor
                } } />
            <input
                type='text'
                value={ title }
                onChange={ (e) => setTitle(e.target.value) } />
        </>
    );
}