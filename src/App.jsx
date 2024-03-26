import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning_comninations";
import GameOver from "./components/GameOver";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameBoard){
  let player = 'X';

  // if prev player was X then update it to O now
  if(gameBoard.length > 0 && gameBoard[0].currPlayer === 'X'){
    player = 'O';
  }
  return player;
}

function App() {
  // gameboard will store array of objects in which each object stores indexes of the clicked buttons and also the active player  
  const [gameBoard, setGameBoard] = useState([]);
  const [players, setPlayers] = useState({
    'X': '',
    'O': ''
    })
  const activePlayer = deriveActivePlayer(gameBoard);

  const handlePlayersName = (symbol, playerName) =>{
    setPlayers((prevPlayers)=>(
      {
        ...prevPlayers,
        [symbol]: playerName
      }
    ))
    console.log(players)
  }

  const restartGame = () =>{
    setGameBoard([]);
  }

  // board is the 2d array that is rendered on the page
  // make a deep copy of initialBoard arr and assign to board bcoz simply copying initialBoard will make changes to the original initialBoard
  // and won't work while clicking the restart btn
  let board = [...initialBoard.map((innerSqr)=> [...innerSqr])]; 
  let winner = null;
  let isDraw = false;

    // converting the gameboard(array of objects) into a 2d array
    for(const eachBoard of gameBoard){
      const {indexes, currPlayer} = eachBoard;
      const {row, col} = indexes;
      board[row][col] = currPlayer; 
    }

// check for winning conditions
for(const combination of WINNING_COMBINATIONS){
  const firstSqr = board[combination[0].row][combination[0].column];
  const secondSqr = board[combination[1].row][combination[1].column];
  const thirdSqr = board[combination[2].row][combination[2].column];

  if(firstSqr && firstSqr===secondSqr && firstSqr===thirdSqr){
    winner = firstSqr;
  }
}

// all sqrs selected and still winner is null, means draw
if(gameBoard.length === 9 && !winner){
  isDraw = true;
}


  const handleSelectSquare = (rowIndex, colIndex) =>{

    // update gameBoard
    setGameBoard((prevGameBoard)=>{
      
      const player = deriveActivePlayer(prevGameBoard);

      // set the currently object(currently clicked indexes and player) in the first index of the array and copy the previous array after that object
      const updatedGameBoard = [
        {indexes:{row: rowIndex, col:colIndex}, currPlayer: player}, 
        ...prevGameBoard];

      return updatedGameBoard;
    })
  }

  return (
    <div>

      <div>
        <ul id="players">
          <Player symbol="X" isActive={activePlayer === 'X'} handlePlayersName={handlePlayersName} />
          <Player symbol="O" isActive={activePlayer === 'O'} handlePlayersName={handlePlayersName} />
        </ul>
        {
          (winner || isDraw) ? <p></p> : <h2 id="player-turn">Player {activePlayer}'s Turn</h2>
        }
        
      </div>

      <div className="board-parent">
      {
        (winner || isDraw) ? <GameOver winner={winner} isDraw={isDraw} restartGame={restartGame} players={players} /> : <GameBoard handleSelectSquare={handleSelectSquare} board={board} />
      }
      </div>

      <Log gameBoard={gameBoard} />

    </div>
  )
}

export default App
