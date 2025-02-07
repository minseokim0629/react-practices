import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button>{'+'}</button>
                {' '}
                { 0 }
                {' '}
                <button>{'-'}</button>
            </div>
        );
    }
}