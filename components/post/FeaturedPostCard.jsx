import Link from 'next/link'
import Image from 'next/image'

import Date from '@/components/date'


function FeaturedPostCard({ post }) {
  // style={{backgroundImage:`url('${post.coverImage.responsiveImage?.src}')`}}
  const { name } = post.author[0]
  // console.log('featuerdPostCard', post)
  return (
    <div className='relative h-52'>
      {/* <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"  style={{backgroundColor: 'red'}}/> */}
      
      <div className="absolute rounded-lg bg-center w-full h-52 bg-contain bg-no-repeat shaddow-md" style={{backgroundImage:`url('${post.coverImage.responsiveImage?.src}')`}}/>
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-52 z-100"/>
      {/* <div className="absolute flex flex-col rounded-lg p4 items-center justify-center w-full h-full"> */}
        
      {/* </div> */}
      <div className="absolute flex flex-col rounded-lg p4 items-center justify-center w-full h-full">
        <p className="text-white text-xs font-bold mb-4"><Date dateString={post.date} /></p>
        <p className="text-center text-yellow-300 text-xl font-bold mb-4">{post.title}</p>
        <p className='text-white'>by <span className="text-sm font-bold">{name}</span></p>
      </div>
      <Link href={`/posts/${post.slug}`}><a className="cursor-pointer absolute top-0 left-0 h-full w-full">
        </a>
      </Link>
    </div>
  )
}

export default FeaturedPostCard
