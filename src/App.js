import './App.css'
import { useState, useEffect, useCallback } from 'react';

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
  
  const [snakePosition, setSnakePosition] = useState([[11, 11], [11, 12],])
  const [direction, setDirection] = useState([0, 0])
  const [grid, setGrid] = useState(createBoard())
  
  useEffect(() => {
    changeGridTypes()
    setTimeout(() => moveSnake(snakePosition), 1500)
    console.log(snakePosition)
    console.log(direction)
  }, [snakePosition])

  useEffect(() => {
    const changeDirections = (event) => {
      event = event || window.Event
        switch (event.key) {
          case 'ArrowLeft':
            console.log('left pressed')
            setDirection([0, -1])
            break;
          case 'ArrowRight':
            console.log('right pressed')
            setDirection([0, 1])
            break;
          case 'ArrowUp':
            console.log('up pressed')
            setDirection([-1, 0])
            break;
          case 'ArrowDown':
            console.log('down pressed')
            setDirection([1, 0])
            break;
          default: 
            setDirection([1, 0])
            break;
        }
      }
    document.addEventListener("keydown", changeDirections);
    //cleanup function
    return () => {
      document.removeEventListener('keydown', changeDirections)
    }
  }, [direction, setDirection]);

  const changeGridTypes = () => {
    let newGrid = createBoard();
    snakePosition.forEach(([x, y]) => newGrid[x][y] = "snake")
    setGrid(newGrid)
  }

  const moveSnake = useCallback(
    (snakePosition) => {
      let [dx, dy] = direction
      let snake = [...snakePosition]
      let newHead = snake[snake.length - 1]

      switch (direction) {
        // left
        case ([0, -1]):
          newHead = [newHead[0] - 1, newHead[1]]
          console.log('moveSnake left')
          break;
        // right
        case [0, 1]:
          newHead = [newHead[0] + 1, newHead[1]]
          console.log('moveSnake right')
          break;
        // up
        case [-1, 0]:
          newHead = [newHead[0], newHead[1] - 1]
          break;
        // down
        case [1, 0]:
          newHead = [newHead[0], newHead[1] + 1]
          break;
        default:
          console.log('moveSnake default')
          newHead = [newHead[0], newHead[1] + 1]
          break;
      }
        snake.push(newHead)
        snake.shift()
        setSnakePosition(snake)  
    }, [direction])

  const squares = () => grid.map((x, i) => x.map((value, j) => <div key={`${i}${j}`} className={value}></div>));

  return (
    <div>
      <div className="box">
        <Header></Header>
      </div>
      <div className='container'>
        {squares()}
      </div>
      <button className='start-game' >Start</button>
    </div>

  );
}

export default App;
