import React from 'react'
import Marquee from 'react-fast-marquee'

function NewsTicker({children}) {
  return (
    <div className='bg-red-600 my-4'>
      <Marquee pauseOnHover>
        {children}
      </Marquee>
    </div>
  )
}

export default NewsTicker
