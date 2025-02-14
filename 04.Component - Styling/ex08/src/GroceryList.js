import React from 'react';
import GroceryItem from './GroceryItem';
import styled from 'styled-components';

const StyledOL = styled.ol`
    padding-left: 50px;
`;

function GroceryList({groceries}) {
    return (
        <StyledOL>
            {
                groceries.map((grocery, index) => <GroceryItem 
                                                        key={index}
                                                        name={grocery.name} 
                                                        count={grocery.count}/>)
            }     
        </StyledOL>
    );
}

export default GroceryList;