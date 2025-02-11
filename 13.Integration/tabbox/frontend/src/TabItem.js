import React from 'react';

function TabItem({name, active}) {
    return (
        <li className={active ? 'active' : ''}>{name}</li>
    );
}

export default TabItem;