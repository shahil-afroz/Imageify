import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
function Description() {
    return (
        <motion.div 
        initial={{opacity:0.2,y:100}}
     transition={{duration:1}}
     whileInView={{opacity:1,y:0}}
     viewport={{once:true}}
        className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
            <h1 className='text-3xl sm:text-4xl font-semibold text-white mb-2'>Create <span className='text-[#00a3eb]'>AI Images</span></h1>
            <p className='mb-8 text-white '>Turn your Imagination into visuals</p>

            <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
                <img src="./p2.png" alt="" className='w-80 xl:w-96 rounded-lg' />
                <div>
                    <h2 className='text-3xl text-[#00a3eb] font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
                    <p className='text-white mb-4'>Easily bring your ideas to life with our free AI image Generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks,Imagine it, Describe it , and watch it come to life instantly.</p>
                <p></p>
                </div>
            </div>
        </motion.div>
    )
}

export default Description
