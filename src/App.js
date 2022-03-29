import './App.css'
import { useState, useEffect, useCallback } from 'react';

const rows = 20
const cols = 20

const Header = ({ length, restart }) => {
    // if (state === "loss") {
    //   return (
    //     <div className='header-container'>
    //       <div className='game-over'>You lost. Click here to restart.</div>
    //       <button onClick={restart}>Try again</button>
    //     </div>
    //   )
    // }

    return (
      <div className="header-container">
        <div className='title'>SNAKE</div>
        <div className='score'>Score: {length}</div>
      </div>
    )
}

function App() {
  const createBoard = () => [...Array(cols)].map((_) => [...Array(rows)].map((_) => "empty"));

  const [snakePosition, setSnakePosition] = useState([[5, 5], [5, 6],])
  const [food, setFoodPosition] = useState([getRandomArr()])
  const [direction, setDirection] = useState('DOWN')
  const [grid, setGrid] = useState(createBoard())
  const [loss, setLossState] = useState(false)
  // maybe add state for head if code gets too wet
  
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

  useEffect(() => {
    changeGridTypes()
    checkLossCondition()
    setTimeout(() => moveSnake(snakePosition), 500)
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

  const moveSnake = useCallback(
    (snakePosition) => {
      let snake = snakePosition
      let newHead = snakePosition[snakePosition.length - 1]
      let [x, y] = newHead

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
        default:
          newHead = [newHead[0] + 1, newHead[1]]
          break;
      }

        let eatenFood = false;
        
        if (grid[x][y] === "food") {
          eatenFood = true;
          setFoodPosition([getRandomArr()])
        }
    
        snake.push(newHead)
        eatenFood ? console.log('food eaten') : snake.shift()
        setSnakePosition([...snake])  
    }, [direction, grid])


  const changeGridTypes = () => {
    let newGrid = createBoard();
    snakePosition.forEach(([x, y]) => newGrid[x][y] = "snake")
    food.forEach(([x, y]) => newGrid[x][y] = "food")
    setGrid(newGrid)
  }

  const checkLossCondition = () => {
    let snake = [...snakePosition]
    let head = snakePosition[snakePosition.length - 1]
    let [headX, headY] = head
    // prob something wrong with one of these
    const outOfBounds = (x) => x >= 200 || x < 0
    const collision = (arr) => headX === arr[0] && headY === arr[1]

    if (outOfBounds(headX) || outOfBounds(headY)) {
      setLossState(true)
    }
    if (snake.forEach(s => collision(s))) {
      setLossState(true)
    }
  }

  const restartGame = () => {
    // prob need to redo func for this
    window.location.reload(false)
  }


  // const handleFoodEating = () => {
  //   let head = snakePosition[snakePosition.length - 1]
  //   let [x, y] = [...head]
  //   if (grid[x][y] === "food") {
  //     setFoodPosition([getRandomArr()])
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  const squares = () => grid.map((x, i) => x.map((value, j) => <div key={`${i}${j}`} className={value}></div>));

  if (loss === true) {
    return (
      <div className='header-container'>
        <div className='game-over'>You lost. Click here to restart.</div>
        <button onClick={restartGame}>Try again</button>
      </div>
    )
  }

  return (
    <div>
      <div className="box">
        <Header length={snakePosition.length} restart={restartGame}></Header>
      </div>
      <div className='container'>
        {squares()}
      </div>
      <button className='pause-game' >Pause</button>
    </div>

  );
}

export default App;
