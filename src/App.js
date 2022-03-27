import './App.css'
import useKeypress from 'react-use-keypress';
import { useState, useEffect } from 'react';

const rows = 20
const cols = 20

const Header = (props) => {
    return (
      <div className="header-container">
        <div className='title'>SNAKE</div>
        <div className='score'>Score: </div>
      </div>
    )
}

function App() {

  const createBoard = () => [...Array(cols)].map((_) => [...Array(rows)].map((_) => "empty"));


  function getRandomInt(max) {
    let min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
  const [snakePosition, setSnakePosition] = useState([[getRandomInt(cols), getRandomInt(rows)]])
  const [direction, setDirection] = useState([0, 0])
  const [grid, setGrid] = useState(createBoard())



  // use useEffect hook for the start game button, generate some food and the snake 
  useEffect(() => {
    let newGrid = grid;
    snakePosition.forEach(([x, y]) => newGrid[x][y] = "snake")
    setGrid(newGrid)
  }, [grid, snakePosition])


  const moveSnake = () => {
    let snakeCopy = snakePosition
    let [dx, dy] = direction
    let [x, y] = snakeCopy[snakeCopy.length - 1]
    let newHead = [dx + x, dy + y]

    snakeCopy.push(newHead)
    snakeCopy.shift()
    console.log(snakeCopy)
    setSnakePosition(snakeCopy)
  }
  

    useKeypress(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], 
      (event) => {
        switch (event.key) {
          case 'ArrowLeft':
            setDirection([0, -1])
            moveSnake()
            break;
          case 'ArrowRight':
            setDirection([0, 1])
            moveSnake()
            break;
          case 'ArrowUp':
            setDirection([-1, 0])
            break;
          case 'ArrowDown':
            setDirection([1, 0])
            break;
          default: 
            return;
        }
      })

  const squares = grid.map((x, i) => x.map((value, j) => <div key={`${i}${j}`} className={value}></div>));

  return (
    <div>
      <div className="box">
        <Header></Header>
      </div>
      <div className='container'>
        {squares}
      </div>
      <button className='start-game' >Start</button>
    </div>

  );
}

export default App;
