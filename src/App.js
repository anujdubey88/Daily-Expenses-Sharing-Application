import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [value, setValue] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [lastClicked, setLastClicked] = useState(null);

  const checkwinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  useEffect(() => {
    if (lastClicked === null) return;

    const newValue = [...value];
    newValue[lastClicked] = currentTurn;
    setValue(newValue);

    for (let i = 0; i < checkwinner.length; i++) {
      const [a, b, c] = checkwinner[i];
      if (newValue[a] !== null && newValue[a] === newValue[b] && newValue[a] === newValue[c]) {
        alert(`${currentTurn} has won the game`);
        return;
      }
    }

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  }, [lastClicked]);

  const handleClick = (index) => {
    if (value[index] === null) {
      setLastClicked(index);
    }
  };

  return (
    <div className='App'>
      <h1>Tic-Tac-Toe</h1>
      <div className="game-board">
        <div className="row">
          {[0, 1, 2].map(index => (
            <div className="cell" key={index} onClick={() => handleClick(index)}>
              <div className="cell-content">{value[index]}</div>
            </div>
          ))}
        </div>
        <div className="row">
          {[3, 4, 5].map(index => (
            <div className="cell" key={index} onClick={() => handleClick(index)}>
              <div className="cell-content">{value[index]}</div>
            </div>
          ))}
        </div>
        <div className="row">
          {[6, 7, 8].map(index => (
            <div className="cell" key={index} onClick={() => handleClick(index)}>
              <div className="cell-content">{value[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
