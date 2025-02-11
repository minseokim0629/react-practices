import React from 'react';
import TabItem from './TabItem.js';

function Tabs({tabItems}) {
    return (
        <ul>
            {
                tabItems.map((tabItem, index) => {
                    return <TabItem key={index} active={tabItem.active} name={tabItem.name}/>;
                })
            }
        </ul>
    );
}

export default Tabs;