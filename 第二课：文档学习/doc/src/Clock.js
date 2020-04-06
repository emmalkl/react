import React, { Component } from 'react';

class Clock extends Component {
    //在构造函数中给组件赋state初值，为当前的date
    constructor(props) {
        super(props);//通过以下方式将 props 传递到父类的构造函数中：
        this.state = {date: new Date()};
    }
    componentDidMount() {//在组件已经被渲染到 DOM 中后运行  挂载
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    componentWillUnmount() {//卸载的时候
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
          date: new Date()
        });
    }
    render() {
        return (
            <div>
                <h1>这是一个每秒自动更新一次的计时器</h1>
                {/* <h2>{props.date.toLocaleTimeString()}</h2> */}
                {<h2>{this.state.date.toLocaleTimeString()}</h2>}
            </div>
        );
    }
}


export default Clock;