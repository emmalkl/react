import React, { Component } from 'react';
//用户切换开关状态的组件
class Toggle extends Component {
    constructor(props){
        super(props);
        this.state={isToggleOn: true};

        // 为了在回调中使用 `this`，这个绑定是必不可少的
        this.handleClick = this.handleClick.bind(this);
    }
    //注意handleClick这个函数中的箭头函数后面需要加()
    handleClick(){
        this.setState(state=>({
            isToggleOn: !state.isToggleOn
        }))
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
            </div>
        );
    }
}

export default Toggle;