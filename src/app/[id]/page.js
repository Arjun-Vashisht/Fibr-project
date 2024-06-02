import Live from '@/views/Live'
import React from 'react'

const Page = ({params}) => {
  return (
    <Live id={params.id}/>
  )
}

export default Page