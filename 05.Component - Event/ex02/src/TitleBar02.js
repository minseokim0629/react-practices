import React from 'react';

function TitleBar02() {
    const onClick = () => {
        console.log('TitleBar02 clicked!');
    };

    return (
        <div>
            <h4 onClick={onClick}>
                Function Handler in Function Component(click here!)
            </h4>
        </div>
    )
}

export default TitleBar02;