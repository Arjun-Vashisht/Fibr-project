'use client'

import Footer from '@/components/live/Footer'
import Header from '@/components/live/Header'
import { get, getDatabase, ref, set, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import '../styles/live.css'

const Live = ({ id }) => {
    const [data, setData] = useState()
    const [views, setViews] = useState()
    const [rating, setRating] = useState()
    const [numberRating, setNumberRating] = useState()

    useEffect(()=>{
      const fetchData = async () => {
        const db = getDatabase(app)
        const dbRef = ref(db, "nature/landing/"+id);
        const snapshot = await get(dbRef)

        if(snapshot.val()){
            setData(snapshot.val())
            setViews(snapshot.val().views)
            setRating(snapshot.val().rating)
            setNumberRating(snapshot.val().numberRating)
        }else{
            console.error('error')
        }
      }

      fetchData()
    },[id])

    const handleRatingChange = (rate) => {
      console.log("Selected rating:", rate);
      if(data && id){
        const db = getDatabase(app)
        const updateRef = ref(db, "nature/landing/"+id);
        console.log(rating)
        update(updateRef, {
          rating: Number(rating)+Number(rate),
          numberRating: Number(numberRating)+1
        })
      }
  };

    useEffect(()=>{
      if(data && id){
        const db = getDatabase(app)
        const updateRef = ref(db, "nature/landing/"+id);
        update(updateRef, {
          views: views+1
        })
      }
    },[data, id])

    return (
      <>
          {!data ? <div style={{textAlign:"center", padding:"20%"}}>Loading...</div> :
          <>
            <Header cta={data.cta} link={data.link} />
            <br />
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
              <div style={{width:"100%", textAlign:"right", padding:"20px 40px"}}>Rating: {" "}
              <select style={{width:"8rem", background:"#262626", color:"white", padding:"5px 12px"}} defaultValue="1" onChange={(e) => handleRatingChange(e.target.value)}>
                <option value="1">1 - Very Bad</option>
                <option value="2">2 - Bad</option>
                <option value="3">3 - Okay</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Very Good</option>
            </select>
              </div>
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