import React, {Component} from 'react';
import './assets/scss/App.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={'App'}>
                <div>
                    <ul>
                        <li>아이템 1입니다.</li>
                        <li>아이템 2입니다.</li>
                        <li>아이템 3입니다.</li>
                        <li>아이템 4입니다.</li>
                        <li>아이템 5입니다.</li>
                    </ul>
                </div>
            </div>
        );
    }
}