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
//将这个组件写成函数组件
// class Square extends React.Component {
//   //由于state是从父组件传递过来的，所以不需要在子组件维护state状态,所以删除了构造函数

//   // constructor(props){
//   //   //定义构造函数时，都需要调用super方法，所以都需要super(props)开头;
//   //   super(props);
//   //   this.state={
//   //     value:null,
//   //   }
//   // }
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={()=>{this.props.onClick()}}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props){
  return(
  <button 
    className="square" 
    onClick={()=>{props.onClick()}}
  >
    {props.value}
  </button>
  )
}

//这个组件是棋盘的几个小格子,当在组件间传递参数时使用props，比如将这个组件的i传递给Square组件。
//方法:在函数内加一个名字叫做value的props。在Square接收参数通过{this.props.value}。
class Board extends React.Component {
  //重构react，第一步构造函数，将子组件的state值给父组件管理
  //再重构，把state给顶层组件管理：删除构造函数，从 Game 组件中接收 squares 和 onClick 这两个 props
  // constructor(props){
  //   super(props);
  //   this.state={
  //     squares:Array(9).fill(null),//这是一个长度为9的空值数组
  //     //this.state.squares 数组
  //     xIsNext:true,//先手玩家'X'
  //   }
  // }

  //这个函数就是点击那个square方格会出现一个'X'。
  //改进，交换xIsNext的布尔值，从而实现轮流落子。

  //再次重构react的时候需要把它移到顶层组件中

  // handleClick(i){
  //   const squares = this.state.squares.slice();
  //   //当有冠军产生或者某个square已经被点击过时不做任何操作
  //   if(calculateWinner(squares) || squares[i]){
  //     return;
  //   }
  //   squares[i]=this.state.xIsNext?'X':'O';
  //   // this.state.xIsNext=!this.state.xIsNext;//不是这样修改的
  //   this.setState({
  //     squares:squares,
  //     xIsNext:!this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    // return <Square value={i}/>;
    //通过父组件来控制子组件的值（'X''O'或者null）显示
    //从 Board 组件向 Square 组件传递一个函数，当 Square 被点击的时候，这个函数就会被调用。
    //现在我们从此父组件向子组件传递了两个参数：value和onClick
    // return (
    //   <Square 
    //   value={this.state.squares[i]}
    //   onClick={()=>{this.handleClick(i)}}
    //   />
    // );

    //接收从顶层组件传来的squares和onClick---props方法
    return (
      <Square 
      value={this.props.squares[i]}
      onClick={()=>{this.props.onClick(i)}}
      />
    );
  }

  //props传值，Square组件使用this.props.value来接收，最后点击方格出现对应的数字
  render() {
    // const status = 'Next player: X';
    //下一步是哪个玩家
    // const status = 'Next player:'+ (this.state.xIsNext?'X':'O');
    //调用“冠军”函数，来显示胜利玩家;这个函数传入方格的值，会根据情况返回 “X”，“O” 或 “null”
    // const winner=calculateWinner(this.state.squares);
    // let status;
    // if(winner){
    //   status= 'winner : '+winner;
    // }else{
    //   status = 'Next player:'+ (this.state.xIsNext?'X':'O');
    // }

    return (
      <div>
        {/* <div className="status">{status}</div> */}
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


//顶层组件
//更新 Game 组件的 render 函数，使用最新一次历史记录来确定并展示游戏的状态
class Game extends React.Component {
  handleClick(i) {
    // const history = this.state.history;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    console.log(history);
  }
  //跳转的函数
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  //在构造函数初始化state，使board组件的状态state交给顶层组件来管理
  constructor(props){
    super(props);
    this.state={
      history:[
        {
          squares:Array(9).fill(null),
        }
      ],//历史管理
      xIsNext:true,//先手玩家'X'
      stepNumber: 0,//跳转的步骤number
    }
  }
  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    const winner=calculateWinner(current.squares);

    //实现时间旅行
    //遍历history列表,
    const moves=history.map((step,move)=>{
      //move是对应history目标元素的索引，当索引为0时显示start...否则都显示跳转到#move步
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return(
        <li key={move}>
         <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if(winner){
      status= 'winner : '+winner;
    }else{
      status = 'Next player:'+ (this.state.xIsNext?'X':'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

//复制的函数，判断胜利方
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);