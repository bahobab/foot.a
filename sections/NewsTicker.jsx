import React from 'react'
import Marquee from 'react-fast-marquee'

function NewsTicker({children}) {
  return (
    <div id='news-ticker' className='bg-red-600 mb-16'>
      <Marquee pauseOnHover gradientWidth={80}>
        {children}
      </Marquee>
    </div>
  )
}

export default NewsTicker
