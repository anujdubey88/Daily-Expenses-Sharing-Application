import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [value,setvalue]=useState((Array(9).fill(null)))
  console.log(value)
  const [currentTurn,setcurrentTurn]=useState("X")

  const checkwinner=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  
  const Turn = ((index)=> {
    let Array = value
    console.log("We had clicked on cell",index,value)
    if(Array[index]===null){
      Array[index]=currentTurn
      setvalue(Array)
      for(let i=0; i<checkwinner.length;i++){
        const [a,b,c]=checkwinner[i]
        if(value[a]!==null && value[a]==value[b] && value[c]==value[b]){
          alert(`${currentTurn} is won the game`)
        }
      }

      setcurrentTurn(currentTurn==="X" ? "O" : "X")
    }

  });



  return (
    <div className='App'>
      <h1>Tic-Tac-Toe</h1>
      <div className="game-board">
        <div className="row">
          <div className="cell" >
            <div className="cell-content" onClick={() => Turn(0)}>{value[0]}</div>
            <div className="cell-content" onClick={() => Turn(1)}>{value[1]}</div>
            <div className="cell-content" onClick={() => Turn(2)}>{value[2]}</div>
          </div>
            <div className="cell" >
              <div className="cell-content" onClick={() => Turn(3)}>{value[3]}</div>
              <div className="cell-content" onClick={() => Turn(4)}>{value[4]}</div>
              <div className="cell-content" onClick={() => Turn(5)}>{value[5]}</div>
          </div>
          <div className="cell" >
            <div className="cell-content" onClick={() => Turn(6)}>{value[6]}</div>
            <div className="cell-content" onClick={() => Turn(7)}>{value[7]}</div>
            <div className="cell-content" onClick={() => Turn(8)}>{value[8]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
