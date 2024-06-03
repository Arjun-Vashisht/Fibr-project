'use client'

import { getDatabase, ref, get, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { app, db, imageDb } from "../../firebase"
import styles from '../styles/create.module.css'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation'

const Update = ({ id }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cta, setCta] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);
    const [insta, setInsta] = useState();
    const [twitter, setTwitter] = useState();
    const [madeBy, setMadeBy] = useState();
    const [getData, setGetData] = useState()
    const [status, setStatus] = useState('draft');
    const [views, setViews] = useState();
    const [rating, setRating] = useState();
    const [numberRating, setNumberRating] = useState();

    const router = useRouter()

    useEffect(()=>{
        const fetchData = async () => {
            const db = getDatabase(app)
            const dbRef = ref(db, "nature/landing/"+id);
            const snapshot = await get(dbRef)
            if(snapshot.val()){
                setGetData(snapshot.val())
                setTitle(snapshot.val().title || "");
                setDescription(snapshot.val().description || "");
                setCta(snapshot.val().cta || "");
                setLink(snapshot.val().link || "");
                setImage(snapshot.val().imageUrl || "");
                setInsta(snapshot.val().insta || "");
                setTwitter(snapshot.val().twitter || "");
                setMadeBy(snapshot.val().madeBy || "");
                setViews(snapshot.val().views || 0);
                setStatus(snapshot.val().status || "draft");
                setRating(snapshot.val().rating || 0)
                setNumberRating(snapshot.val().numberRating || 0)
            }else{
                console.error('error')
            }
        }
    
        fetchData()
    },[id])

    const handlePreview = async (e) => {
        e.preventDefault()
        let imageUrl
        if(image.onload){
            const imgRef = storageRef(imageDb, `files/${id}`);
            await uploadBytes(imgRef, image);
            imageUrl = await getDownloadURL(imgRef);
        }else{
            imageUrl = getData.imageUrl
        }
        const data = {
            title: title,
            description: description,
            imageUrl: imageUrl,
            cta: cta,
            link: link,
            insta: insta,
            twitter: twitter,
            madeBy: madeBy
        }
        const queryString = new URLSearchParams(data).toString();
        router.push(`/preview/${id}?${queryString}`);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const db = getDatabase(app)
        const updateRef = ref(db, "nature/landing/"+id);
        let imageUrl
        if(image.onload){
            const imgRef = storageRef(imageDb, `files/${id}`);
            await uploadBytes(imgRef, image);
            imageUrl = await getDownloadURL(imgRef);
        }else{
            imageUrl = getData.imageUrl
        }
        set(updateRef, {
            id: id,
            title: title,
            description: description,
            imageUrl: imageUrl,
            cta: cta,
            link: link,
            insta: insta,
            twitter: twitter,
            madeBy: madeBy,
            status: status,
            views: views,
            rating: rating
        }).then(()=>{
            alert('saved')
        }).catch((error)=>{
            alert(error.message)
        })
    }

    return (
        !getData ? <div>Loading...</div> : 
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
                <label htmlFor="image" className={styles.label}>Image</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={styles.fileInput}
                />
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
                
                <h1 className={styles.footer}>Footer</h1>
                <label htmlFor="insta" className={styles.label}>Instagram Link:</label>
                <input
                    type="text"
                    id="insta"
                    value={insta}
                    onChange={(e) => setInsta(e.target.value)}
                    className={styles.input}
                    required
                />
                <br />
                <label htmlFor="twitter" className={styles.label}>Twitter Link:</label>
                <input
                    type="text"
                    id="twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className={styles.input}
                    required
                />
                <br />
                <label htmlFor="madeBy" className={styles.label}>Made by:</label>
                <input
                    type="text"
                    id="madeBy"
                    value={madeBy}
                    onChange={(e) => setMadeBy(e.target.value)}
                    className={styles.input}
                    required
                />
                <br />
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            value="draft"
                            checked={status === 'draft'}
                            onChange={(e) => setStatus('draft')}
                        />
                        Draft
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="publish"
                            checked={status === 'publish'}
                            onChange={(e) => setStatus('publish')}
                        />
                        Publish
                    </label>
                </div>
                <br />
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <button type="submit" className={styles.button}>Submit</button>
                    <button className={styles.button} onClick={handlePreview}>Preview</button>
                </div>
            </form>
        </div>
        
    )
}

export default Update