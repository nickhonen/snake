import './App.css'
import useKeypress from 'react-use-keypress';
import { useState, useEffect } from 'react';

const Snake = ({ onKeypress }) => {

  let snakePosition = [[10, 11]];
  let direction = [1, 0]
  useKeypress(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], 
  (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        direction = [0, -1]
        break;
      case 'ArrowRight':
        direction = [0, 1]
        break;
      case 'ArrowUp':
        direction = [-1, 0]
        break;
      case 'ArrowDown':
        direction = [1, 0]
        break;
      default: 
        direction = [0, 0]
        break;
    }
  })
  
}

const Header = (props) => {
    return (
      <div className="header-container">
        <div className='title'>SNAKE</div>
        <div className='score'>Score</div>
      </div>
    )
}



const Board = (props) => {
  const gridSize = 20;
  const grid = [...Array(gridSize)].map(() =>
  [...Array(gridSize)].map((square, index) => <div key={index} className="square"></div>))
  
  // const grid = []
  // for (let row = 0; row < 20; row++) {
  //   grid.push([])
  //   for (let col = 0; col < 20; col++) {
  //     grid[row].push(<div key={Number(`${col}${row}`)} className="square"></div>)
  //   }
  // }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  // const generateFood = () => {
  //   const rand =  getRandomInt(0, 100)
  //   const replaceS

  return (
    <div className="container">
      {grid}
    </div>
  )
}

function App() {

  const 


  return (
    <div className="box">
      <Header></Header>
      <Board></Board>
    </div>
  );
}

export default App;
