import React, { Component } from 'react';

class Clock extends Component {
    render() {
        return (
            <div>
                <h1>这是一个每秒自动更新一次的计时器</h1>
                <h2>{props.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}


export default Clock;