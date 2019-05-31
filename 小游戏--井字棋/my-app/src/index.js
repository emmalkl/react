// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//这个组件是一个button按钮
class Square extends React.Component {
  constructor(props){
    //定义构造函数时，都需要调用super方法，所以都需要super(props)开头;
    super(props);
    this.state={
      value:null,
    }
  }
  render() {
    return (
      <button 
        className="square" 
        onClick={()=>{this.props.onClick()}}
      >
        {this.props.value}
      </button>
    );
  }
}

//这个组件是棋盘的几个小格子,当在组件间传递参数时使用props，比如将这个组件的i传递给Square组件。
//方法:在函数内加一个名字叫做value的props。在Square接收参数通过{this.props.value}。
class Board extends React.Component {
  //重构react，第一步构造函数，将子组件的state值给父组件管理
  constructor(props){
    super(props);
    this.state={
      squares:Array(9).fill(null),//这是一个长度为9的空值数组
      //this.state.squares 数组
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i]='X';
    this.setState({squares:squares});
  }

  renderSquare(i) {
    // return <Square value={i}/>;
    //通过父组件来控制子组件的值（'X''O'或者null）显示
    //从 Board 组件向 Square 组件传递一个函数，当 Square 被点击的时候，这个函数就会被调用。
    //现在我们从此父组件向子组件传递了两个参数：value和onClick
    return (
      <Square 
      value={this.state.squares[i]}
      onClick={()=>{this.handleClick(i)}}
      />
    );
  }

  //props传值，Square组件使用this.props.value来接收，最后点击方格出现对应的数字
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);