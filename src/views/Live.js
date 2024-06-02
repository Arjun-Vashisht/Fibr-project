import Footer from '@/components/live/Footer'
import Header from '@/components/live/Header'
import React from 'react'

const Live = (props) => {
  return (
    <>
        <Header />
        <div>{props.id}</div>
        <Footer />
    </>
  )
}

export default Live