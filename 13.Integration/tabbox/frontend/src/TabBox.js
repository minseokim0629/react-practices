import React from 'react';
import tabs from './assets/json/data';
import Tabs from './Tabs.js';
import TabView from './TabView.js';
import {Tab_Box} from './assets/scss/TabBox.scss';

function TabBox() {
    return (
        <div className={Tab_Box}>
            <Tabs tabItems={tabs}/>
            <TabView />
        </div>
    );
}

export default TabBox;