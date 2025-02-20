import React from 'react';
import {Tab_View} from './assets/scss/TabView.scss';

function TabView(props) {
    return (
        <div className={Tab_View}>
            <span>{'hello world!!!'}</span>
            <span>{props.contents}</span>
        </div>
    );
}

export default TabView;