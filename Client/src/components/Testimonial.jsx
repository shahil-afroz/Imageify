import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from "motion/react"
export default function Testimonial() {
  return (
    
    <motion.div 
    initial={{opacity:0.2,y:100}}
     transition={{duration:1}}
     whileInView={{opacity:1,y:0}}
     viewport={{once:true}}
    className='flex flex-col items-center justify-center my-20 py-12 '>
       <h1 className='text-8xl sm:text-4xl font-semibold text-white mb-2'>Customer <span className='text-[#00a3eb]'>testimonials</span></h1>
       <p className='mb-12 text-white '>Whats our users are saying?</p>
       <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((item,index)=>(
            <div key={index} className='bg-white p-12 shadow-md rounded-lg cursor-pointer order w-80 m-auto hover:scale-[1.02]'>
               <div className='flex flex-col items-center'
               > <img src={item.image} alt="" className='rounded-full w-14'/>
                <h2 className='text-xl font-semibold text-[#04a3eb] mt-3'>{item.name}</h2>
                <p className='text-white mb-4'>{item.role}</p>
                <div className='flex mb-4'>
                    {Array(item.stars).fill().map((item,index)=>
                    <img  key={index} src={assets.rating_star} alt="" /> )}
                </div>
                <p className='text-sm text-center'>{item.text}</p></div>
            </div>
        ))}
       </div>
    </motion.div>
  )
}
