import './App.css'

const Square = (props) => {
  // const classes = `square-color-${color}`
  return <div className="square"></div>
}

const Board = (props) => {
  const grid = []
  for (let row = 0; row < 20; row++) {
    grid.push([])
    for (let col = 0; col < 20; col++) {
      grid[row].push(<Square key={`${col}${row}`} />)
    }
  }
  return (
    <div className="container">
      {grid}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Board></Board>
    </div>
  );
}

export default App;
