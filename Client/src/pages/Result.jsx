import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';
function Result() {
  const [image, setImgage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [Input, setInput] = useState("")
  const { generateImage } = useContext(AppContext)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (Input) {
      const image = await generateImage(Input);
      if (image) {
        setIsImageLoaded(true);
        setImgage(image)
      }
    }
    setLoading(false)
  }
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex gap-10 items-center justify-center h-screen'>
      <div className="border-2 w-[80vh] h-[90vh] border-[#04a3eb] rounded flex flex-col items-center justify-center">
        <motion.form

          onSubmit={onSubmitHandler} action="" className='flex flex-col items-center justify-center'>
          <div>
            <div className='relative'>
              <img src={image} alt="" className='max-w-sm rounded' />
              <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
            </div>
            <p className={!loading ? 'hidden' : ""}>Loading...</p>
          </div>
          {!isImageLoaded && <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
            <input onChange={e => setInput(e.target.value)} value={Input} type="text" placeholder='Describe What You want to Generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
            <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
          </div >}
          {
            isImageLoaded && <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
              <p onClick={() => { setIsImageLoaded(false) }} className='bg-transparent border border-[#0394d4] text-white px-8 py-3 roundedfull cursor-pointer'>Generate Another</p>
              <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full text-white cursor-pointer'>Downloads</a>
            </div>
          }
        </motion.form>
      </div>
      <img src={image} alt="" className='w-120 h-auto rounded border-2 border-[#0395d4]' />
    </motion.div>
  )
}

export default Result