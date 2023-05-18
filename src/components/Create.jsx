import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Create = (props) => {

    const navigate = useNavigate();

    //forms state variables
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isImportant, setIsImportant] = useState(false)

    //DB Error Array
    const [errors, setErrors] = useState([]);

    const createNote = (e) => {
        e.preventDefault();
        // console.log(title, content, isImportant)
        const tempObjToSendToDB = {
            title,
            content,
            isImportant
        }
        // axios.post(`http://localhost:8000/api/notes`, {title, content, isImportant})
        axios.post(`http://localhost:8000/api/notes`, tempObjToSendToDB)
            .then(res => {
                console.log("✅ Client Success")
                console.log(res.data);
                navigate("/notes")
            })
            .catch(err =>{
                console.log("❌ client error")
                console.log(err)
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <div>
                {errors.map((err, index) => <p key = {index}>{err}</p>)}
            </div>
            form state variables: <br />
            {JSON.stringify(title)} <br />
            {JSON.stringify(content)} <br />
            {JSON.stringify(isImportant)} <br />


            <form onSubmit={createNote}>
                Title:<input onChange={e => setTitle(e.target.value)} value={title} /> <br />
                Content: <textarea
                    rows="5" cols="25"
                    onChange={e => setContent(e.target.value)} value={content} /> <br />
                Important: <input type="checkbox" onChange={e => setIsImportant(e.target.checked)} checked={isImportant} /> <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Create