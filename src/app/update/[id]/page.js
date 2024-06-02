import Update from '@/views/Update'
import React from 'react'

const Page = ({ params }) => {
  return (
    <Update id={params.id}/>
  )
}

export default Page