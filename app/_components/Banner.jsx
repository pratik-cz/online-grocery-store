import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div>
      <Image src={'/banner.png'} width={400} height={400} className='w-full  mt-10 object-center h-[450px]' />
    </div>
  )
}

export default Banner