'use client'

import React, { useEffect, useState } from 'react'
import app from "../../firebase"
import { getDatabase, ref, get } from "firebase/database"
import { useRouter } from 'next/navigation'


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

    return (
        !data ? <div>Loading...</div> : <div>
            {Object.values(data).map((item, index)=>{
                return (
                    <div key={index} onClick={() => router.push(`/${item.id}`)}>
                        <div>{item.title}</div>
                        <div>{item.description}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard