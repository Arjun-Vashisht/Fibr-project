'use client'

import { getDatabase, ref, get } from 'firebase/database'
import React, { useState } from 'react'
import { app } from '../../firebase'

const Update = (props) => {
    const [getData, setGetData] = useState()

    const fetchData = async () => {
        const db = getDatabase(app)
        const dbRef = ref(db, "nature/landing");
        const snapshot = await get(dbRef)
        if(snapshot.exists()){
            setGetData(snapshot.val())
        }
    }

    fetchData()

    return (
        <div>{props.id}</div>
    )
}

export default Update