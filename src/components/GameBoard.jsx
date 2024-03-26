import React from "react";

const GameBoard = ({handleSelectSquare, board}) => {

  return (
    <div id="game-board">

        <ul>
          {board.map((row, rowIndex) => (
            <li key={rowIndex} row={row} className="eachrow">
              {row.map((playerSymbol, colIndex) => (
                <div className="eachCol" key={rowIndex+colIndex}>
                  <button onClick={()=> handleSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                    {playerSymbol}
                  </button>
                </div>
              ))}
            </li>
          ))}
          
        </ul>
      
    </div>
  );
};

export default GameBoard;
