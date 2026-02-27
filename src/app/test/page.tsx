"use client"
import PhishingSandbox from '@/components/PhishingSandbox'
import React from 'react'

const Page = () => {
  return (
    <div><PhishingSandbox url='facebook.com' isSecure={false} contentTitle='hihello' onDetect={()=>console.log("hanji")}/ ></div>
  )
}

export default Page