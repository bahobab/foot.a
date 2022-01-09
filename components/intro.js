import { CMS_NAME, CMS_URL } from '@/lib/constants'
import { useEffect, useCallback, useState } from 'react'
import markdownToHtml from '@/lib/markdownToHtml'
import Image from 'next/image'

import {getIntro} from '@/lib/api'
import SectionSeparator from './section-separator'
import Container from '@/components/container'

export default function Intro() {
const [intro, setIntro] = useState({})

let content, quote

const fetchIntro = useCallback(async () => {
  const intro = await getIntro()
  quote = await markdownToHtml(intro.quote || '')
  content = await markdownToHtml(intro.content || '')

  // <Image src="/quotes.svg" width="20" height="20"/> 
  const quoteEl = document.querySelector('#quote').innerHTML = `
    
    <div className="text-sm">${quote}</div><br>  <cite> > Kongo Kongo</cite>
  `

  // document.querySelector('#quote').style = `dangerouslySetInnerHTML={{
  // __html: [
  //    '.my-special-div:after {',
  //    '  content: "./public/quotes.svg";',
  //    '  position: absolute',
  //    '}'
  //   ].join('\n')
  // }}`

//   <blockquote dangerouslySetInnerHTML={{
//   __html: [
//      '.my-special-div:after {',
//      '  content: "Hello";',
//      '  position: absolute',
//      '}'
//     ].join('\n')
//   }}>
// </blockquote>

  const contentEl = document.querySelector('#content').innerHTML = content

  setIntro({...intro})
})

useEffect(() => {
  fetchIntro()
}, [])
  
  return (
    <>
      <section className="flex-col flex items-center md:justify-between mt-16 mb-8 md:mb-12">
        <h1 className="text-center text-white text-4xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          {intro?.heading}
        </h1>
        <h2 className='text-white text-sm md:text-xl md:font-semibold tracking-wide md:tracking-widest mb-8'>{intro?.subheading}</h2>
        {/* <Image src="/quotes.png" height="50" width="50" /> */}
        <Container >
          <div className="flex flex-col md:flex-row items-center justify-around md:px-16">
            <div id="quote" className='bg-black text-md text-white p-4 mb-4 rounded-lg shadow-lg'></div>
            <p id="content" className="text-center text-white md:tracking-wide md:text-left text-lg mt-5 md:pl-8 flex-shrink max-w-sm"></p>
          </div>
        </Container>
      </section>
      <SectionSeparator />
    </>
  )
}

{/* <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}