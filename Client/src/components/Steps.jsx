import React from 'react'
import { assets, stepsData } from '../assets/assets'
import { motion } from "motion/react"
const Steps = () => {
  return (
    <motion.div 
    initial={{opacity:0.2,y:100}}
     transition={{duration:1}}
     whileInView={{opacity:1,y:0}}
     viewport={{once:true}}
      className='border-2 border-[#1081b6] rounded-md'>
      <div className='flex flex-col items-center justify-center my-8'>
        <h1 className='text-5xl text-[#04a3eb] sm:text-4xl font-semibold mb-1'>How Its Works</h1>
        <p className='text-2xl text-white mb-4'>Transform Words into Stunning Images</p>
        <div className='space-y-2 w-full max-w-3xl text-xl px-2'>
          {stepsData.map((item,index)=>(
            <div 
              key={index} 
              className='flex items-center gap-4 p-3 px-4 bg-[#04a3eb] shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-large'
            >
              <img width={40} src={item.icon} alt="" />
              <div>
                <h2 className='text-xl font-medium text-white'>{item.title}</h2>
                <p className='text-md'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Steps