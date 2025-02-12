import React from 'react';

function App() {
    // const App = document.createElement('div');
    // App.textContent = "Hello World";
    // return App;
    // const App = React.createElement('div', null, 'Hello World'); // null - {id: '', title: ''} 작성하는 부분. 네번째 파라미터 부터 React.createElement('div', null, 'Hello World', React.createElement('div', null)); 이런식으로 작성 가능. 마치 재귀 형태..? 근데 이렇게 작성하면 너무 번거로워서 jsx?를 쓴다
    // return App;

    return (
        <div> 
            {'Hello World'} 
            <p>
                {'test'}
                <span>
                    {'test2'}
                </span>
            </p>
        </div>
    );
}

export {App};