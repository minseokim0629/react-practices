import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App.js';

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production') {
   console.log = () => {};
   console.info = () => {};
   console.error = () => {};
   console.warn = () => {};
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* production mode 일때는 strictmode가 실행되지 않고, development에서는 실행된다 */ }
    <App />
  </React.StrictMode>
);