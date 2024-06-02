'use client'

import Footer from '@/components/live/Footer'
import Header from '@/components/live/Header'
import { get, getDatabase, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import '../styles/live.css'

const Live = ({ id }) => {
    const [data, setData] = useState()
    console.log(id)
    useEffect(()=>{
      const fetchData = async () => {
        const db = getDatabase(app)
        const dbRef = ref(db, "nature/landing/"+id);
        const snapshot = await get(dbRef)
        if(snapshot.val()){
            setData(snapshot.val())
            console.log(snapshot.val())
        }else{
            console.error('error')
        }
      }

      fetchData()
    },[id])

    return (
      <>
          {!data ? <div style={{textAlign:"center", padding:"20%"}}>Loading...</div> :
          <>
            <Header cta={data.cta} link={data.link} />
            <br />
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
              <div style={{textAlign:"center", fontSize:"x-large", padding:"30px 0", width:"70%"}}>{data.title}</div>
              <br />
              <div style={{display:"flex", justifyContent:"center"}}>
                <img style={{width: "70%"}} src={data.imageUrl} />
              </div>
              <br />
              <div style={{width:"70%", fontSize:"large", padding: "30px 0", textAlign:"center"}}>{data.description}</div>
            </div>
            <br />
            <Footer insta={data.insta} twitter={data.twitter} madeBy={data.madeBy}/>
          </>}
      </>
    )
}

export default Live