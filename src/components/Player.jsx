import React, {useState} from 'react'

const Player = ({symbol, isActive, handlePlayersName}) => {
    const [name, setName] = useState('');

    const classname =  isActive ? 'p active' : 'p';

    const inputHandler = (e) =>{
        setName(e.target.value);
    }

    const handleClick = () =>{
      handlePlayersName(symbol, name);
    }

  return (
    <div>
      <li className={classname}>
        <span>{symbol}</span>
        <input 
        type="text"
        required
        placeholder={"Enter Player "+symbol+"'s Name"} 
        onChange={inputHandler}
        value={name}
        ></input>
        <button onClick={handleClick}>Save</button>
    </li>
  
    </div>
    
  )
}

export default Player