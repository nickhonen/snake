import './App.css'

const Board = (props) => {
  return (
    <div className="container">
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
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
