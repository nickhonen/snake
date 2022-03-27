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
  
  const [snakePosition, setSnakePosition] = useState([[11, 11], [11, 12]])
  const [direction, setDirection] = useState([0, 1])
  const [grid, setGrid] = useState(createBoard())
  



  useEffect(() => {
    
    setTimeout(() => moveSnake(snakePosition), 500)
  }, [snakePosition])

  useEffect(() => {
    document.addEventListener("onkeydown", changeDirections);
  }, []);

  const changeGridTypes = () => {
    let newGrid = createBoard();
    snakePosition.forEach(([x, y]) => newGrid[x][y] = "snake")
    setGrid(newGrid)
  }

  const moveSnake = useCallback(
    (snakePosition) => {
      let snake = [...snakePosition]
      let newHead = snake[snake.length - 1]

      switch (direction) {
        // left
        case [0, -1]:
          newHead = [newHead[0] - 1, newHead[1]]
          break;
        // right
        case [0, 1]:
          newHead = [newHead[0] + 1, newHead[1]]
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
          break;
      }
      snake.push(newHead)
      snake.shift()
      setSnakePosition([...snake])
    }, [direction])
 


    const changeDirections = useCallback(
      (event) => {
        event = event || window.event
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
              break;
          }
        }, [setDirection])

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
