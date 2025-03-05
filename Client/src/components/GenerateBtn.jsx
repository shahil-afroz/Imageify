import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import {AppContext} from "../context/AppContext"
import {useContext} from "react"
import {useNavigate} from "react-router-dom"
function GenerateBtn() {
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
    <motion.div 
    initial={{opacity:0.2,y:100}}
     transition={{duration:1}}
     whileInView={{opacity:1,y:0}}
     viewport={{once:true}}
    className='pb-16 text-center'>
      <h1 className='text-2xl md:text-3xl text-white lg:text-4xl mt-4 fontsemibold  py-6 md:py-16'>See the magic.Try now</h1>
      <button onClick={onClickHandler} className='inline-flex sm:text-lg items-center hover:scale:105 transition-all duration-500 text-[#0c76ac] w-auto mt-8 px-12 py-2.5items-center rounded-full gap-2  text-8xl bg-[#232a34] border border-[#146086]'>Generate <img className='h-6' src={assets.star_group} alt="" /></button>
    </motion.div>
  )
}

export default GenerateBtn
