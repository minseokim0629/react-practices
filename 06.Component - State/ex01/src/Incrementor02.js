import React, {useState} from 'react';

function Incrementor02({val, step}) {
    const [count, setCount]= useState(step);

    return (
        <div>
            <button
                onClick={() => {
                   setCount(count + step);
                }}>
                {'+'}
            </button>
            {' '}
            { count }
            {' '}
            <button
                onClick={() => {
                    setCount(count - step);
                 }}>
                {'-'}
            </button>
        </div>
    );
}

export default Incrementor02