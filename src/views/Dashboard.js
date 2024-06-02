'use client'

import React, { useEffect, useState } from 'react'
import app from "../../firebase"
import { getDatabase, ref, get, remove } from "firebase/database"
import { useRouter } from 'next/navigation'
import styles from '../styles/dashboard.module.css'


const Dashboard = () => {
    const [data, setData] = useState()
    const router = useRouter()

    useEffect(()=>{
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "nature/landing");
            try {
                const getData = await get(dbRef);
                const dataObj = getData.val()
                setData(dataObj)
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    },[])

    const deleteHandler = async (landingId) => {
        try {
            const db = getDatabase(app);
            const dbRef = ref(db, "nature/landing/" + landingId);
            await remove(dbRef);
            console.log("Item deleted successfully.");
            setData(prevData => {
                const updatedData = { ...prevData };
                delete updatedData[landingId];
                return updatedData;
            });
        } catch (error) {
            console.error("Error deleting item:", error);
            setError(error);
        }
    }

    return (
        !data ? <div>Loading...</div> : 
        <div>
            <div>
                <main className={styles.main}>
                    <div className={styles.cardContainer}>
                    {Object.values(data).map((item, index)=>{
                        return(
                                <div key={index} className={styles.card}>
                                    <div className={styles.cardImage}>
                                        <img src={item.imageUrl} alt="Landing Page 1"/>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h2 className={styles.cardTitle}>{item.title}</h2>
                                        <p className={styles.cardDescription}>{item.description}</p>
                                    </div>
                                    <div className={styles.cardFooter}>
                                        <button className={styles.btn}>Update</button>
                                        <button onClick={()=>deleteHandler(item.id)} className={styles.dlBtn}>Delete</button>
                                    </div>
                                </div>
                        )
                    })}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard