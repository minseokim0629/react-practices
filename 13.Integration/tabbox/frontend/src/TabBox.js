import React, {useState} from 'react';
import data from './assets/json/data';
import Tabs from './Tabs.js';
import TabView from './TabView.js';
import {Tab_Box} from './assets/scss/TabBox.scss';

function TabBox(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const selectTab = (no) => {
        // console.log(`${no} selected`);
        setActiveIndex(data.findIndex((e) => e.no === no));
        // console.log(index);
    };
    return (
        <div className={Tab_Box}>
            <Tabs 
                tabs={data.map((e, index) => {
                    const {contents, ...rest} = e;
                    rest.active = ( index === activeIndex );
                    return rest;
                })}
                selectTab={selectTab}/>
            <TabView contents={data[activeIndex].contents}/>
        </div>
    );
}

export default TabBox;