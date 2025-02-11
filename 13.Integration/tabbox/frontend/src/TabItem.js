import React from 'react';
import {Tab_Item} from './assets/scss/TabItem.scss';

function TabItem({name, active}) {
    return (
        <li className={[Tab_Item, (active ? 'active' : '')].join(' ')}>{name}</li>
    );
}

export default TabItem;