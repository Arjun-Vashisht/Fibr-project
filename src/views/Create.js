'use client'

import React, { useState } from 'react'
import { db, imageDb } from "../../firebase"
import { ref, set, push } from "firebase/database"
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from '../styles/create.module.css'

const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cta, setCta] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title)
        console.log(description)
        const id = Date.now()
        const newDocRef = push(ref(db, "nature/landing"))
        const imgRef = storageRef(imageDb, `files/${id}`);
        try {
            if (image) {
                await uploadBytes(imgRef, image);
                const imageUrl = await getDownloadURL(imgRef);

                await set(newDocRef, {
                    title: title,
                    description: description,
                    cta: cta,
                    link: link,
                    imageUrl: imageUrl,
                    id: id
                });

                alert('Saved successfully!');
            } else {
                alert('Please select an image.');
            }
        } catch (error) {
            console.error("Error uploading image or saving data:", error);
            alert('Error occurred while saving data.');
        }
    }

    return (
        <div className={styles.container}>
            <div style={{fontSize: "x-large", textAlign: "center"}}>Create a Landing page</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="title" className={styles.label}>Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    required
                />
                <br />
                <label htmlFor="description" className={styles.label}>Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                    required
                ></textarea>
                <br />
                <h1 className={styles.header}>Header</h1>
                <label htmlFor="cta" className={styles.label}>CTA text:</label>
                <input
                    type="text"
                    id="cta"
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                    className={styles.input}
                    required
                />
                <br />
                <label htmlFor="link" className={styles.label}>CTA Link:</label>
                <input
                    type="text"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className={styles.input}
                    required
                />
                <br />
                <label htmlFor="image" className={styles.label}>Image</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={styles.fileInput}
                    required
                />
                <br />
                <h1 className={styles.footer}>Footer</h1>
                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    )
}

export default Create