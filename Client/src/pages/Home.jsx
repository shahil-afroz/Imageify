import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GenerateBtn from '../components/GenerateBtn'

function Home() {
  return (
    <div>
      <Header/>
      <Steps/>
      <Description/>
      <div className='h-1 w-240 bg-[#04a3eb] mx-auto'></div>
      <Testimonial/>
      <div className='h-1 w-40 bg-[#04a3eb] mx-auto'></div>
      <GenerateBtn/>
    </div>
  )
}

export default Home
