import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20 '>
    <img src={assets.logo}  width={150} alt="" />
      <p className='flex-1 text-white border-1 border-grey-400 pl-4 text-sm text-grey max-sm:hidden'>Copyright @GreatStack.dev | ALL right reserved.</p>
      <div className='flex gap-2.5 text-white'>
        <img src={assets.facebook_icon} alt="" width={35} />
        <img src={assets.twitter_icon} alt="" width={35} />
        <img src={assets.instagram_icon} alt="" width={35} />
      </div>
    </div>
  )
}

export default Footer
