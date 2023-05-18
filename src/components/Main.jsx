import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import noteStyle from "./Main.module.css"


const Main = (props) => {

  const [notes, setNotes] = useState([])
  const navigate = useNavigate();

  //trigger when the component has finished loading
  useEffect(() => {
    //get all the notes from server
    axios.get(`http://localhost:8000/api/notes`)
      .then(res => {
        console.log(res.data)
        setNotes(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  //Go to the Update Route
  const goToUpdate = (noteMongoID) =>{
    navigate("/notes/" + noteMongoID + "/edit")
  }

  // DELETE
  const deleteNote = (deleteID) =>{

    if(window.confirm("Really??")){

    axios.delete("http://localhost:8000/api/notes/" + deleteID)
      .then(res =>{
        console.log("DELETE SUCCESS", res.data)
        //remove from the DOM after a successful delete
        setNotes(notes.filter((note) => note._id !== deleteID))
      })
      .catch(err => console.log(err))
  }

}
  return (
    <fieldset>
      <legend>Main.jsx</legend>
      {/* {JSON.stringify(notes)} */}
      {
        notes.map((oneNote) => {
          return (
            <div key={oneNote._id} className = {noteStyle.note}>
              <Link to = {`/notes/${oneNote._id}`}>
              <h5>{oneNote.isImportant ? "📌" : ""}{oneNote.title}</h5>
              </Link>
              <p/>
              <p>{oneNote.content}</p>
              <button onClick = {() => goToUpdate(oneNote._id)}>Edit</button>
              <button onClick = {() => deleteNote(oneNote._id)}>Delete</button>

            </div>
          )
        })
      }
    </fieldset>
  )
}

export default Main