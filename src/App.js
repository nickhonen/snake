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

  const [snakePosition, setSnakePosition] = useState([[11, 11], [11, 12],])
  const [food, setFoodPosition] = useState([getRandomArr()])
  const [direction, setDirection] = useState('LEFT')
  const [grid, setGrid] = useState(createBoard())
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
    setTimeout(() => moveSnake(snakePosition), 100)
  }, [snakePosition])

  useEffect(() => {
    const changeDirections = (event) => {
      event = event || window.Event
        switch (event.key) {
          case 'ArrowLeft':
            console.log('left pressed')
            setDirection('LEFT')
            break;
          case 'ArrowRight':
            console.log('right pressed')
            setDirection('RIGHT')
            break;
          case 'ArrowUp':
            console.log('up pressed')
            setDirection('UP')
            break;
          case 'ArrowDown':
            console.log('down pressed')
            setDirection('DOWN')
            break;
          default:
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
      let snake = [...snakePosition]
      let newHead = snake[snake.length - 1]
      let [x, y] = [...newHead]

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
        
        // let body = snake.slice(0,
        //    snake.length - (eatenFood ? 0 : 1)
        //    );
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
