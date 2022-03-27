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
  
  const [snakePosition, setSnakePosition] = useState([[11, 11], [11, 12]])
  const [direction, setDirection] = useState([0, 1])
  const [grid, setGrid] = useState(createBoard())
  
  useEffect(() => {
    // figure out how to actually use this hook to change position of snake ever 500 ms 
    onkeydown = changeDirections
    let newGrid = createBoard();
    snakePosition.forEach(([x, y]) => newGrid[x][y] = "snake")
    setGrid(newGrid)
    
  }, [])

  // use useEffect hook for the start game button, generate some food and the snake 
  // useEffect(() => {
  //   let newGrid = createBoard();
  //   snakePosition.forEach(([x, y]) => newGrid[x][y] = "snake")
  //   setGrid(newGrid)
  // }, [snakePosition])


  const moveSnake = () => {
    // setTimeout(() => {
      let [dx, dy] = direction
      let [x, y] = snakePosition[0]
      let newHead = [dx + x, dy + y]

      let snakeCopy = snakePosition.slice(0, 0)
      console.log(snakeCopy)
      snakeCopy.push(newHead)
      console.log(newHead)
      setSnakePosition(snakeCopy)
      setInterval(moveSnake(), 1000)
    // }, speed)
  }
 


    const changeDirections = (event) => {
        let d = direction
          switch (event.key) {
              case 'ArrowLeft':
                d = [0, -1]
                console.log('left pressed')
                // setDirection([0, -1])
                break;
              case 'ArrowRight':
                d = [0, 1]
                console.log('right pressed')
                // setDirection([0, 1])
                break;
              case 'ArrowUp':
                console.log('up pressed')
                d = [-1, 0]
                // setDirection([-1, 0])
                break;
              case 'ArrowDown':
                console.log('down pressed')
                d = [1, 0]
                // setDirection([1, 0])
                break;
              default: 
                break;
            }
          setDirection(d)
      }

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
