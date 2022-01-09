import React, {useEffect, useState} from 'react'
import Link from 'next/link'

import Date from './date'
import { getRecentPosts, getSimilarPosts, getAllPostsForHome } from '@/lib/api'

function Widget({slug, categories}) {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    // console.log('USR EFFECT')
    // console.log('<><>cat', categories)
    if (slug) {
      // console.log('categories', categories)
      getSimilarPosts(slug, categories).then(posts => {
        setRelatedPosts(posts)
      })
    } else {
      getRecentPosts().then(posts => {
        setRelatedPosts(posts)
      })
    }
  }, [slug])

  return (
    <div className="bg-opacity-20 bg-gradient-to-b from-th-background-tertiary rounded-lg shadow-lg p-4">
      <h2 className="text-2xl text-th-tertiary tracking-wide font-bold border-b border-b-gray-300 mb-4">{
        slug? 'Related Posts' : 'Recents Posts'
      }</h2>
        {
        relatedPosts.map(post => (
          <div key={post.slug} className="flex items-center w-full mb-2 last:mb-0">
            <div className="flex-none">
              <img
                src={post.coverImage.responsiveImage.src}
                alt={post.title}
                height="60px"
                width="60px"
                className="rounded-full shadow-lg align-middle"
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-white text-sm">
                <Date dateString={post.date} />
              </p>
              <Link href={`/posts/${post.slug}`}>
                  <a className='text-sm text-th-secondary font-semibold'>{post.title}</a>
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Widget

// export const getStaticProps = async () => {
//   const posts = await getRecentPosts()
//   console.log('recent posts', posts)
//   return {
//     props: {
//       posts
//     }
//   }
// }