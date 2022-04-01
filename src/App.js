import './App.css'
import { useState, useEffect, useCallback } from 'react';

const rows = 20
const cols = 20

const Header = ({ length }) => {

    return (
      <div className="header-container">
        <div className='title'>SNAKE</div>
        <div className='score'>Score: {length}</div>
      </div>
    )
}

const LossScreen = (props) => {
  return (
    <div>
      <h1>You lost. Your score was {props.score}</h1>
      <h3>Try again?</h3>
      <button onClick={props.handleRestart}>Restart</button>
    </div>
  )
}

function App() {
  const createBoard = () => [...Array(cols)].map((_) => [...Array(rows)].map((_) => "empty"))

  const [snakePosition, setSnakePosition] = useState([[5, 5],])
  const [food, setFoodPosition] = useState([getRandomArr()])
  const [foodEaten, setFoodEaten] = useState(false)
  const [direction, setDirection] = useState('RIGHT')
  const [grid, setGrid] = useState(createBoard())
  const [lossState, setLossState] = useState(false)
  const [speed, setSpeed] = useState(220)
  // const [snakeHead, setSnakeHead] = useState([snakePosition[snakePosition.length - 1]])
  // maybe add state for head if code gets too wet
  useEffect(() => {
    handleFoodEating()
    checkCollision()
    changeGridTypes(grid)
    setTimeout(() => moveSnake(snakePosition), 200)
  }, [snakePosition])

  useEffect(() => {
    const changeDirections = (event) => {
      event = event || window.Event
        switch (event.key) {
          case 'ArrowLeft':
            setDirection('LEFT')
            break;
          case 'ArrowRight':
            setDirection('RIGHT')
            break;
          case 'ArrowUp':
            setDirection('UP')
            break;
          case 'ArrowDown':
            setDirection('DOWN')
            break;
          default:
            // Would love to add a stop direction
            setDirection('RIGHT')
            break;
        }
      }
    document.addEventListener("keydown", changeDirections);
    //cleanup function
    return () => {
      document.removeEventListener('keydown', changeDirections)
    }
  }, [direction, setDirection]);

  function getRandomArr() {
    let min = 0;
    let max = 20;
    max = Math.floor(max);
    min = Math.ceil(min);
     //The maximum is exclusive and the minimum is inclusive
    let x = Math.floor(Math.random() * (max - min) + min)
    let y = Math.floor(Math.random() * (max - min) + min)
    return [x, y];
  }



  

  const moveSnake = useCallback( 
    (snakePosition) => {
      let snake = snakePosition
      let newHead = snake[snake.length - 1]

      switch (direction) {
        // left
        case 'LEFT':
          newHead = [newHead[0], newHead[1] - 1]
          break;
        // right
        case 'RIGHT':
          newHead = [newHead[0], newHead[1] + 1]
          break;
        // up
        case 'UP':
          newHead = [newHead[0] - 1, newHead[1]]
          break;
        // down
        case 'DOWN':
          newHead = [newHead[0] + 1, newHead[1]]
          break;
        case 'STOP':
          newHead = [newHead[0], newHead[1]]
          break;
        default:
          newHead = [newHead[0] + 1, newHead[1]]
          break;
      }

      if (checkOutOfBounds(newHead)) {
        setLossState(true)
        return;
      } 
    snake.push(newHead)
    let eatenFood = foodEaten
    eatenFood ? console.log('food eaten') : snake.shift()
 

      
    setSnakePosition([...snake])  
    }, [direction, grid, foodEaten]
  )

  const changeGridTypes = useCallback(
    (grid) => {
      let newGrid = createBoard();
      snakePosition.forEach(([x, y]) => newGrid[x][y] = "snake")
      food.forEach(([x, y]) => newGrid[x][y] = "food")
      setGrid(newGrid)
    }, [snakePosition, food]
  )

  const checkOutOfBounds = (head) => {
    // prob something wrong with one of these
    return (head[0] >= 20 || head[0] < 0 || head[1] >= 20 || head[1] < 0)
  }
    
  const checkCollision = () => {
    let snake = [...snakePosition]
    let head = snake[snake.length - 1]
    snake.pop()

    for (const pos of snake) {
      if (head[0] === pos[0] && head[1] === pos[1]) {
        setLossState(true)
        return;
      }
    }
  }

  const handleFoodEating = () => {
    let head = snakePosition[snakePosition.length - 1]
    let [x, y] = head
    if (grid[x][y] === "food") {
      setFoodPosition([getRandomArr()])
      setFoodEaten(true)
    } else {
      setFoodEaten(false)
    }
  }

  const gameOver = () => {
    setSnakePosition([[5, 5], [5, 6]])
    setDirection('STOP')
    setFoodPosition(getRandomArr())
    setGrid(createBoard())
    return (
      <div className='header-container'>
        <div className='game-over'>You lost. Click here to restart.</div>
        <button onClick={restartGame}>Try again</button>
      </div>
    )
  }

  const restartGame = () => {
    // prob need to redo func for this
    window.location.reload(false)
  }

  const squares = () => grid.map((x, i) => x.map((value, j) => <div key={`${i}${j}`} className={value}></div>));

if (lossState === true) {
  return <LossScreen handleRestart={restartGame} score={snakePosition.length}></LossScreen>
}
    return (
      <div>
        <Header length={snakePosition.length} />
          <div className='container'>
            {squares()}
          </div>
      </div>
    )
  }

export default App;
