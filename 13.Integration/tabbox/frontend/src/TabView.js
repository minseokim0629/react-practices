import React from 'react';
import {Tab_View} from './assets/scss/TabView.scss';

function TabView(props) {
    return (
        <div className={Tab_View}>
            {props.contents}
        </div>
    );
}

export default TabView;