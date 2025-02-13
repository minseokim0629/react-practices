import React from 'react';
import Header from './Header';
import Contents from './Contents';


function App() {
    // return (
    //     <div id="App">
    //         <Header />
    //         <Contents />
    //     </div>
    // );
    return React.createElement('div', {
        id: 'App'
    }, React.createElement(Header, null), React.createElement(Contents, null))  // component는 따옴표 없이 작성
}

export {App};