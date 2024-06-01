'use client'

import React, { useState } from 'react'
import app from "../../firebase"
import { getDatabase, ref, set, push } from "firebase/database"

const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title)
        console.log(description)

        const db = getDatabase(app)
        const newDocRef = push(ref(db, "nature/landing"))
        set(newDocRef, {
            title: title,
            description: description
        }).then(()=>{
            alert('saved')
        }).catch(()=>{
            alert('error')
        })
    }

    return (
        <div>
            <div>Create a Landing page</div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br />
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <br />
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Create