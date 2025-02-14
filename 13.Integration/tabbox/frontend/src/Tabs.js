import React from 'react';
import TabItem from './TabItem.js';
import styled from 'styled-components';

const StyledUL = styled.ul`
    height: 24px;
`;
function Tabs({tabs, selectTab}) {
    return (
        <StyledUL>
            {
                tabs.map((tab, index) => {
                    return <TabItem 
                                key={index} 
                                no={tab.no} 
                                active={tab.active} 
                                name={tab.name}
                                selectTab={selectTab}/>;
                })
            }
        </StyledUL>
    );
}

export default Tabs;