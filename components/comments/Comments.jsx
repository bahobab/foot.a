import React, {useEffect, useState} from 'react'

import {getPostComments} from '@/lib/api'
import CommentDate from '@/components/date'
import { comment } from 'postcss'

function Comments({post}) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getPostComments(post.id).then(comments => setComments(comments))
  }, [post.slug])

  function calcDaysPassed(date) {
    const daysPassed = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24))
    
    if (daysPassed === 0) return 'today'
    if (daysPassed === 1) return 'yesterday'
    if (daysPassed < 7) return `${daysPassed} days ago`

    // const weeksPassed = Math.floor(daysPassed / 7)
    // if (weeksPassed === 1) return 'last week'
    return (
      // date
      <CommentDate dateString={date} />
    )
  }

  return (
    <>
      {
        comments?.length > 0
          ? (
            <div className="bg-white shaddow-lg rounded-lg p-8 pb-8">
              <h3 className="text-xlg text-th-accent-secondary font-semibold border-b pb-4 mb-8">
                {comments.length} Comments
              </h3>
              {
                comments.map(({id, name, comment, createdAt}) => (
                  <div key={id} className="mb-4 pb-4 border-b border-gray-100">
                    <p className="pb-4">
                      <span className="semi-bold text-md">{name}</span> - <span className='text-green-400 text-xs'>{calcDaysPassed(createdAt)}</span>
                    </p>
                    <p className="whitespace-pre-line text-gray-600 w-full">{comment}</p>
                  </div>
              ))
              }
            </div>
          )
          : 'No Comments yet...'
      }
    </>
  )
}

export default Comments
