import Preview from '@/views/Preview'
import React from 'react'

const Page = ({ params }) => {
  return (
    <Preview id={params.id}/>
  )
}

export default Page