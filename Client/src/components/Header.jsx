import React from 'react'
import { assets } from '../assets/assets'
import { delay, motion } from "motion/react"
import {AppContext} from "../context/AppContext"
import {useContext} from "react"
import {useNavigate} from "react-router-dom"
function Header() {

const {user,setShowLogin}=useContext(AppContext)
const navigate=useNavigate()
  const onClickHandler=()=>{
       if(user){
        navigate("/result")
       }else{
        setShowLogin(true);
       }
  }
  return (
    <motion.div initial={{opacity:0.2,y:100}}
     transition={{duration:1}}
     whileInView={{opacity:1,y:0}}
     viewport={{once:true}}
    className='flex flex-col  items-center justify-center text-center my-20'>
      <img src="" alt="" />
      <motion.div 
       initial={{opacity:0,y:-20}}
       transition={{delay:0.2,duration:0.8}}
       animate={{opacity:1,y:0}}
    
      className='inline-flex text-white bg-[#232a34] text-center gap-2 px-6 py-1 rounded-full border border-[#146086]'>
        <p className='text-2xl'>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
    
      <motion.h1 
       initial={{opacity:0}}
       transition={{delay:0.4,duration:2}}
       animate={{opacity:1}}
      className='text-6xl text-white  max-w-[300px] sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-[#01a1ea]'>image</span>, in seconds.</motion.h1>
       <motion.p 
        initial={{opacity:0,y:20}}
        transition={{delay:0.6,duration:0.8}}
        animate={{opacity:1,y:0}}
       className='text-center text-xl max-w-xl mx-auto mt-5 text-[#6d717a]'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type , and watch the magic happen.</motion.p>
    <motion.button onClick={onClickHandler}
     initial={{opacity:0}}
     whileHover={{scale:1.05}}
     whileTap={{scale:0.95}}
     transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
     animate={{opacity:1}}
    className='sm:text-lg flex text-[#0c76ac] w-auto mt-8 px-12 py-2.5items-center rounded-full gap-2  text-8xl bg-black border border-[#146086]'>Generate Image 
        <img className='h-6' src={assets.star_group} alt="" />
    </motion.button>

    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:1,duration:1}}
    className='flex flex-wrap justify-center mt-16 gap-3'>
        {Array(6).fill('').map((item,index)=>(
               <motion.img 
               whileHover={{scale:1.05,duration:0.1}}
               className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' width={70} src={index%2==0?"./p1.png":assets.sample_img_1} key={index}/>
        )
        )}
    </motion.div>
    <motion.p 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:1.2,duration:0.8}}
    className='mt-2 text-[#767b81] text-xl'>Generated Image from Imgaify</motion.p>
    </motion.div>
  )
}

export default Header
