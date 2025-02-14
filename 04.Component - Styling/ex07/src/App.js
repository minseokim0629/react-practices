import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const DivApp = styled.div`
    text-align: center;
    color: #111;
`;
export default function() {
    return (
        <DivApp>
            <Header />
        </DivApp>
    );
}