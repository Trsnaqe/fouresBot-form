import React, { useEffect, useState }  from 'react'
const axios=require('axios')

export const AddKey= ()=> {

    const [keys,setKeys]=useState()
    const [games,setGames]=useState()
    const [click,setClick]=useState(false)
    useEffect(() => {
      axios.get("http://localhost:6006/api/steamKey").then(response=>setGames(response.data.map(element=>element.key) ))
      
    }, [click]);
    const keyUpdate=(event)=>{ // Dealing with name field changes to update our state
        setKeys(event.target.value)
    }
    const handleSubmit=()=> { // Once the form has been submitted, this function will post to the backend
      axios.post('http://localhost:6006/api/steamKey', {
      keys:keys
      })
      .then(function (response) {
        alert(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const handleClick=()=>{
      setClick(!click)
    }
    let GameList=games?games.map((game) =>
    <li>{game}</li>
  ):"no key in db or server is offline"

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter keys:</label>
                <input required onChange={keyUpdate}></input>
                <button type="submit"> Submit</button>
            </form>
            <button onClick={handleClick}>Show all games!</button>

            {click&&
            <ul>{GameList}</ul>
            }
    

        </div>
    )
    
}

export default AddKey