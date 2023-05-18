import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Update = (props) => {
    const navigate = useNavigate();

    //Grab id from the URL
    const {id} = useParams();

    //forms state variables
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isImportant, setIsImportant] = useState(false)

    const updateNote = (e) => {
        e.preventDefault();
        // console.log(title, content, isImportant)
        // const tempObjToSendToDB = {
        //     title,
        //     content,
        //     isImportant
        // }
        // axios.post(`http://localhost:8000/api/notes`, {title, content, isImportant})
        axios.put("http://localhost:8000/api/notes/" + id, {title, content, isImportant})
            .then(res => {
                console.log("✅ Client Success")
                console.log(res.data);
                navigate("/notes")
            })
            .catch(err =>{
                console.log("❌ client error")
                console.log(err)
            })
    }



    useEffect(() =>{
        // axios.get("http://localhost:8000/api/notes/" + id)
        axios.get(`http://localhost:8000/api/notes/${id}`)
            .then(res =>{
                console.log(res.data)
                setTitle(res.data.title)
                setContent(res.data.content)
                setIsImportant(res.data.isImportant)

            })
            .catch(err => console.log(err))
    }, [id])



  return (
    <div>
            form state variables: <br />
            {JSON.stringify(title)} <br />
            {JSON.stringify(content)} <br />
            {JSON.stringify(isImportant)} <br />


            <form onSubmit={updateNote}>
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

export default Update