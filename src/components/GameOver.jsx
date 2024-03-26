import React from 'react'

const GameOver = ({winner, isDraw, restartGame, players}) => {
  const handleClick = () =>{
    restartGame();
  }

  return (
    <div className='game-over'>
        <h1>Game Over!</h1>
        {
          isDraw ?
          <h2>Its a Draw</h2> :
          <h2>{ (winner==='X') ? players.X : players.O } won!</h2>
        }
        <button onClick={handleClick}>Restart</button>
    </div>
  )
}

export default GameOver