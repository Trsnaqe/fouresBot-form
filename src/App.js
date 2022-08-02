import React, { useEffect, useState }  from 'react'
const axios=require('axios')

export const AddKey= ()=> {

    const [keys,setKeys]=useState()
    const [games,setGames]=useState('')
    const [click,setClick]=useState(false)
    const [refresh,setRefresh]=useState(false)
    useEffect(() => {
      axios.get("http://localhost:6006/api/steamKey").then(response=>setGames(response.data.map(element=>element.key) ))
      GameList=games!=''?games.map((game) =>
      <li>{game} <button id={game}  key={game} onClick={() => deleteGame(game)}>delete</button></li>
    ):"no key in db or server is offline"
    }, [click,refresh]);
    const keyUpdate=(event)=>{ // Dealing with name field changes to update our state
        setKeys(event.target.value)
    }
    const handleSubmit=(event)=> { // Once the form has been submitted, this function will post to the backend
      event.preventDefault()
      axios.post('http://localhost:6006/api/steamKey', {
      keys:keys
      })
      .then(function (response) {
        alert(`Successfully added the game!`)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const handleClick=()=>{
      setClick(!click)
    }
    const handleRefresh=()=>{
      setRefresh(!refresh)
    }
    function deleteGame(gameKey){
      setGames((items) => items.filter((element) => element !== gameKey));
      axios.post(`http://localhost:6006/api/steamKey/delete/${gameKey}`, {
        })
        .then(function (response) {
          console.log('successfully deleted the game')
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    let GameList=games!=''?games.map((game) =>
    <li>{game} <button id={game}  key={game} onClick={() => deleteGame(game)}>delete</button></li>
  ):"no key in db or server is offline"

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter keys:</label>
                <input required onChange={keyUpdate}></input>
                <button type="submit"> Submit</button>
            </form>
            <button onClick={handleClick}>Show all games!</button>
            <button onClick={handleRefresh}>Refresh the Game List!</button>
          {click&&<ul>{GameList}</ul>}
      

        </div>
    )
    
}

export default AddKey