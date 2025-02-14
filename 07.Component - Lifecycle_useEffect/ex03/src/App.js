import React, { Component } from 'react';
import './assets/scss/App.scss'
import Clock from './Clock';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.__getCurrentTime();
    }

    __getCurrentTime() {
        const now = new Date();

        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            ticks: this.state ? this.state.ticks + 1 : 1
        }
    }
    
    componentDidMount() { 
        this.intervalId = setInterval(() => {
            this.setState(this.__getCurrentTime());
        }, 1000);
    }

    componentWillUnmount() {
        console.log('App.componentWillUnmount');
        clearInterval(this.intervalId);
    }

    render() {
        return (
                this.state.ticks % 10 === 0 ?
                null:
                <Clock
                    title={`ex03: Clock Component I:${this.state.ticks}`}
                    hours={this.state.hours}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds} />
        )
    
    }
}