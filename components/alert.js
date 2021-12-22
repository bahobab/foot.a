import {useState, useEffect} from 'react';

import Container from './container'
import cn from 'classnames'
import { EXAMPLE_PATH } from '@/lib/constants'

import FearturedPosts from 'sections/FearturedPosts'
// import NewsTicker from 'sections/NewsTicker'
// import { getNews } from '@/lib/api';

// const news = [
//   {
//     title: 'Senegal',
//     text: 'Le Senegal qualifie pour la CAN 2022',
//   },
//   {
//     title: "Cote d’Ivoire",
//     text: "Fin de parcour pour les Elephants",
//   },
//   {
//     title: 'Cameroun',
//     text:'Eto Fils nouveau President de la FCF'
//   },
// ].map((item, index) => <p key={index} className='text-white text-lg'><span className='font-semibold bg-black inline-block mx-2 px-1 h-full'>{item.title}:</span>{item.text}</p> )

export default function Alert({ preview }) {
  // const [news, setNews] = useState([])

  // useEffect(() => {
  //   getNews().then(data => {
  //     setNews(data)
  //   }) 
  // }, [])  

  // const newsTicker = news.map((item, index) => (
  //   <p key={index} className='text-white text-lg'>
  //     <span className='font-semibold bg-black inline-block mx-2 px-1 h-full'>{item.title}:</span>
  //     {item.text}
  //   </p>) 
  // )

  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              {/* The source code for this blog is{' '} */}
              {/* <NewsTicker>
                {newsTicker}
              </NewsTicker> */}
              <FearturedPosts />
              {/* <a
                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                className="underline hover:text-success duration-200 transition-colors"
              >
                available on GitHub
              </a> */}
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
