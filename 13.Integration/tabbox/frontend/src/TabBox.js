import React from 'react';
import tabs from './assets/json/data';
import Tabs from './Tabs.js';
import TabView from './TabView.js';

function TabBox() {
    return (
        <div className={"tab-box"}>
            <Tabs tabItems={tabs}/>
            <TabView />
        </div>
    );
}

export default TabBox;