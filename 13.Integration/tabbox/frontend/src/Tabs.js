import React from 'react';
import TabItem from './TabItem.js';
import styled from 'styled-components';

const StyledUL = styled.ul`
    height: 24px;
`;
function Tabs({tabItems}) {
    return (
        <StyledUL>
            {
                tabItems.map((tabItem, index) => {
                    return <TabItem key={index} active={tabItem.active} name={tabItem.name}/>;
                })
            }
        </StyledUL>
    );
}

export default Tabs;