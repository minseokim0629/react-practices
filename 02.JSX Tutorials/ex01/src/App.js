import React from 'react';

function App() {
    return (
        <div>
            <h1>Ex01</h1>
            <p>특징 I: HTML과 비교</p>

            <input placeholder="이름" type="text" maxLength="10"/>
            <hr/>
            <img src=""/>
            <h4 id="title" className="header" style={{
                textDecoration: "underline"
            }}>Hello World!!</h4>
        </div>
    );
}

export {App};