import './App.css'

const Header = (props) => {
    return (
      <div className="header-container">
        <div className='title'>SNAKE</div>
        <div className='score'>Score</div>
      </div>
    )
}

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
    <div className="box">
      <Header></Header>
      <Board></Board>
    </div>
  );
}

export default App;
