import Container from '@/components/container'

import NewsTicker from 'sections/NewsTicker'

function HeroHeader({heroHeader, news}) { 
  const newsTicker = news?.map((item, index) => (
    <p key={index} className='text-th-tertiary text-lg bg-black'>
      <span className='text-th-secondary font-semibold bg-th-tertiary inline-block mx-2 px-1 h-full'>{item.title}:</span>
      {item.text}
    </p>) 
  )

  // const className = `
  //   w-full bg-cover bg-no-repeat bg-center bgc-pink-50
  // `
  return (
    <Container>
      <div className="hero-header-wrapper">
      {/* bg-[url('public/hero-pole.webp')] */}
        <div className="hero-pix relative h-full flex flex-col justify-end ">
          <div className="hero-pix-overlay absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-500 opacity-30"></div>
          <div className="absolute top-4 md:top-auto md:bottom-16 right-8 p-4 bg-green-400 bg-opacity-50 rounded-lg flex flex-col items-end justify-center">
            <h1 className="flex justify-end text-white text-xl font-extrabold w-60 mb-4">{heroHeader?.heroText}</h1>
            <a href='#news-ticker' className="pointer bg-red-500 text-th-secondary font-semibold my-2 px-4 py-2 rounded-md">{heroHeader?.ctaText}</a>
          </div>
          <NewsTicker>
            {newsTicker}
          </NewsTicker>
        </div>
      </div>
    </Container>
  )
}

export default HeroHeader
