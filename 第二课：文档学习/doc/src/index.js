import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clock from './Clock.js'
//{} 通过大括号嵌入js表达式
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
//jsx也是一个表达式
function getGreeting(user){
  if(user){
    return <h1>Hello, {formatName(user)}!</h1>
  }
  return <h1>Hello, Stranger.</h1>;
}
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
const user1 = {
  firstName: 'Li',
  lastName: 'Lin'
};
const element = (
  <div>
    <h1>
      Hello, {formatName(user)}!
    </h1>
    {getGreeting(user1)}
    <h2>定时器函数（元素渲染）It is {new Date().toLocaleTimeString()}.</h2>
  </div>
);



ReactDOM.render(
  element,
  document.getElementById('root')
);
