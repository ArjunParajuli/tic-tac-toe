import React from 'react'

const Log = ({gameBoard}) => {

  return (
    <div id="log">
        {
          gameBoard.map((log)=>(
            <p key={`${log.indexes.row}${log.indexes.col}`} >{log.currPlayer} selected field {log.indexes.col+1}, {log.indexes.row+1} </p>
          ))
        }
    </div>
  )
}

export default Log