'use client'

import React, { useEffect, useState } from 'react'
import '../app/(root)/globals.css'
import Header from '@/components/live/Header'
import Footer from '@/components/live/Footer'
import { useSearchParams } from 'next/navigation';

const Preview = ({ id }) => {
  const [data, setData] = useState()
    const searchParams = useSearchParams();
    const fetchedData = {
      title: searchParams.get('title'),
      description: searchParams.get('description'),
      imageUrl: searchParams.get('imageUrl'),
      cta: searchParams.get('cta'),
      link: searchParams.get('link'),
      insta: searchParams.get('insta'),
      twitter: searchParams.get('twitter'),
      madeBy: searchParams.get('madeBy')
    };

    useEffect(()=>{
      const fetchData = async () => {
        const data = {
            title: fetchedData.title,
            description: fetchedData.description,
            imageUrl: fetchedData.imageUrl,
            cta: fetchedData.cta,
            link: fetchedData.link,
            insta: fetchedData.insta,
            twitter: fetchedData.twitter,
            madeBy: fetchedData.madeBy
        };
        if(data){
            setData(data)
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

export default Preview