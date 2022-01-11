import React, {useState, useEffect} from 'react'
import Link from 'next/link'

// import {getHeroHeader} from '@/lib/api'
// import { getNews } from '@/lib/api';

import Container from '@/components/container'

import NewsTicker from 'sections/NewsTicker'

function HeroHeader({heroHeader, news}) {
  // const [heroHeader, setHeroHeader] = useState({})
  // const [news, setNews] = useState([])

  // useEffect(() => {
  //   getHeroHeader().then(data => {
  //     setHeroHeader(data)
  //   })
  // }, [])


  // useEffect(() => {
  //   getNews().then(data => {
  //     setNews(data)
  //   }) 
  // }, []) 

  const newsTicker = news?.map((item, index) => (
    <p key={index} className='text-th-tertiary text-lg'>
      <span className='text-th-secondary font-semibold bg-th-tertiary inline-block mx-2 px-1 h-full'>{item.title}:</span>
      {item.text}
    </p>) 
  )

  const className = `
    w-full bg-cover bg-no-repeat bg-center bgc-pink-50
  `
  return (
    <Container>
    {/*
      <div className="absolute top-10 left-5 right-5 md:top-20 md:left-20 md:right-20  text-center">
      <h1 className='inline-block text-white bg-opacity-50 bg-gray-500 p-2'>{heroHeader.heroText}</h1>
      </div>
      <button className="absolute right-10 bottom-5 md:right-20 md:bottom-20 bg-red-500 text-yellow-400 font-semibold p-2 rounded-md">{heroHeader.ctaText}</button>
      <img className="w-full" src={heroHeader?.heroImage?.responsiveImage.src} alt="Hero Header" />
    */}

    <div className="hero-header-wrapper">
      {/* bg-[url('public/hero-pole.webp')] */}
      <div className="hero-pix relative h-full md:h-full ">
        <div className="hero-pix-overlay absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-500 opacity-30"></div>
        {/* <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-50 h-full w-full"></div> */}
        {/* <div className=""> */}
          {/* <img className="w-auto lg:h-98" src={heroHeader?.heroImage?.responsiveImage.src} alt="Hero Header" /> */}
        <div className="absolute top-4 md:top-auto md:bottom-16 right-8 p-4 bg-green-400 bg-opacity-50 rounded-lg flex flex-col items-end justify-center">
          <h1 className="flex justify-end text-white text-xl font-extrabold w-60 mb-4">{heroHeader?.heroText}</h1>
          <a className="bg-red-500 text-th-secondary font-semibold my-2 px-4 py-2 rounded-md">{heroHeader?.ctaText}</a>
        </div>
        </div>
        {/* <div className="absolute flex flex-col justify-center items-end top-0 left-0 bg-gray-600 bg-opacity-50 w-full p-4">
          
          <Link href="">
            <a className="bg-red-500 text-yellow-400 font-semibold p-2 rounded-md">{heroHeader.ctaText}</a>
          </Link>
        </div> */}
        
      {/* </div> */}
        <NewsTicker>
          {newsTicker}
        </NewsTicker>
    </div>
    </Container>
  )
}

export default HeroHeader
