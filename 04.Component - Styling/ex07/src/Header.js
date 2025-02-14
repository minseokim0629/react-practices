import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    width: 280px;
    font-size: 14px;
    text-align: center;
    margin: 100px auto;
    padding: 20px;
    border: 2px solid #999;
    color: #1144FE;
    background-color: #CDC1CE;
`;

function Header(props) {
    return (
        <StyledH1>
            {'SASS & SCSS'}
        </StyledH1>
    );
}

export default Header;