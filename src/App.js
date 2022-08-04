import React, { useEffect, useState }  from 'react'
import './App.css'

const axios=require('axios')

export const AddKey= ()=> {

    const [keys,setKeys]=useState()
    const [games,setGames]=useState('')
    const [click,setClick]=useState(false)
    const [allSubsClick,setAllSubsClick]=useState(false)
    const [activeSubsClick,setActiveSubsClick]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [allSubsRefresh,setAllSubsRefresh]=useState(false)
    const [activeSubsRefresh,setActiveSubsRefresh]=useState(false)

    const [allSubs,setAllSubs]=useState([])
    const [activeSubs,setActiveSubs]=useState([])
    useEffect(() => {
      axios.get("http://localhost:6006/api/steamKey").then(response=>setGames(response.data ))
      GameList=games!=''?games.map((game) =>
      <li>{game.key} <button id={game}  key={game} onClick={() => deleteGame(game.key)}>
<i class="fa-solid fa-xmark"></i>
      </button></li>
    ):"no key in db or server is offline"
    }, [click,refresh]);
    const keyUpdate=(event)=>{ // Dealing with name field changes to update our state
        setKeys(event.target.value)
    }
    useEffect(() => {
      axios.get("http://localhost:6006/api/subs/all").then(response=>setAllSubs(response.data))
   
    }, [allSubsClick,allSubsRefresh]);
    
    useEffect(() => {
      axios.get("http://localhost:6006/api/subs/active").then(response=>setActiveSubs(response.data))
      
    }, [activeSubsClick,activeSubsRefresh]);

  
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
      setGames((items) => items.filter((element) => element.key !== gameKey));
      axios.post(`http://localhost:6006/api/steamKey/delete/${gameKey}`, {
        })
        .then(function (response) {
          console.log('successfully deleted the game')
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    //<li>{game} <button id={game}  key={game} onClick={() => deleteGame(game)}>delete</button></li>)
    let GameList=games!=''? games.map(game=><li>{game.key} <button id={game}  key={game} onClick={() => deleteGame(game.key)}>
<i class="fa-solid fa-xmark"></i>
    </button></li>):"no key in db or server is offline"
let ActiveSubsList=activeSubs[0]!=undefined?activeSubs.map(element=><li key={element}>{element}</li>):"You have no active subs or server is offline"
let AllSubsList=allSubs[0]!=undefined?allSubs.map(element=><li key={element}>{element}  </li>):"You have no subs or server is offline"
return (
        <div className="wrapper">
        <div className='game-section'>
        <div className='buttons'>
            <form className='input-form' onSubmit={handleSubmit}>
                <label>Enter keys:</label>
                <input required onChange={keyUpdate}></input>
                <button type="submit"> Submit</button>
            </form>
            <div className='buttons'>
            <button className="showKeys"onClick={handleClick}>Show all games!</button>
            <button className="refreshButton"onClick={handleRefresh}>Refresh the Game List!</button>
            </div>
            </div>
            <div className='gameListDiv'>
            {click&&<ul className='gameList'>{GameList}</ul>}
            </div>
          </div>
          <div className='activeSubs-section'>
          <div className='buttons'>
          <button onClick={()=>setActiveSubsClick(!activeSubsClick)}>Show Active Subcribers</button>
            <button onClick={()=>setActiveSubsRefresh(!activeSubsRefresh)}>Refresh Active Subscribers</button>
          </div>
          <div className='activeSubs-list'>
          {activeSubsClick&&<ul className='activeSubsList'>{ActiveSubsList}</ul>}
          </div>
          </div>
          <div className='allSubs-section'>
          <div className='buttons'> 
          <button onClick={()=>setAllSubsClick(!allSubsClick)}>Show All Subcribers</button>
          <button onClick={()=>setAllSubsRefresh(!allSubsRefresh)}>Refresh All Subscribers</button>

          </div>
          <div className='allSubs-list'>
          {allSubsClick&&<ul className='allSubsList'>{AllSubsList}</ul>}

          </div>

          </div>
        </div>
    )
    
}

export default AddKey