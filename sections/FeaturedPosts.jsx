import React, {useEffect, useState} from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import FeaturedPostCard from '@/components/post/FeaturedPostCard'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
}

function FeaturedPosts({featuredPosts}) {
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    setDataLoaded(true)
  }, [])

  if (!dataLoaded) return null

  const ArrowFix = (arrowProps) => { 
    // https://github.com/YIZHUANG/react-multi-carousel/issues/61
    const {carouselState, children, ...restArrowProps} = arrowProps
    return ( <span {...restArrowProps}> {children} </span> )
  }

  const customLeftArrow = (
    <ArrowFix className="absolute arrow-btn-left arrow-btn text-center py-3 bg-th-tertiary rounded-full ">
      {/* <div className="absolute left-0 arrow-btn text-center py-3 cursor-pointer bg-pink-600 rounded-full"> */}
        <svg xmlns="http://www.w3.org/2000/svg" className=" text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      {/* </div> */}
    </ArrowFix>
  );

  const customRightArrow = (
    <ArrowFix className="absolute arrow-btn arrow-btn-right text-center py-3 bg-th-tertiary rounded-full">
      {/* <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full" > */}
        <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      {/* </div> */}
    </ArrowFix>
  );

  const slides = featuredPosts.map((post, index) => (
          <FeaturedPostCard key={index} post={post} />
        ))

  return (
    <div className="mt-8">

      <Carousel infinite  responsive={responsive} customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} itemClass="px-4 relative">
        {dataLoaded && slides}
      </Carousel>
    </div>
  );
}

export default FeaturedPosts
