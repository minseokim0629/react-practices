import React from 'react';
import {App, Header} from './assets/scss/App.scss';

export default function() {
    console.log(styles);
    return (
        <div id={App}>
            <h1 className={Header}>SASS & SCSS</h1>
        </div>
    );
}