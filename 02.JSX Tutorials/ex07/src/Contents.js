import React from 'react';

function Contents(props) {
    /*
        1. JSX 밖은 JavaScript 구문이 가능하기 때문에 주석문이 가능하다.
    */
    return (
        <div
            /*
                2. JSX 태그 안에 주석이 가능하다. - 비추
            */
            className='Clock'
            title='시계'>
            {/*
                3. 표현식이 실행되는 블록은 주석이 가능하다. - 추천
            */}
            <p>Comment</p>
            {/*
                4. JSX는 HTML이 아니다. 따라서 <!-- --> 사용할 수 없음
            */}
            <div>{'00:00:00'}</div>

            /* JSX 안에서 JavaScript 주석을 사용하면 그대로 화면에 출력된다. */
        </div>
    );
}

export default Contents;