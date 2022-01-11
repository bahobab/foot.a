import React, {useEffect, useState} from 'react'

import {getPostComments} from '@/lib/api'
import Date from '../date'
import { comment } from 'postcss'

function Comments({comments}) {
  // const [comments, setComments] = useState([])

  // useEffect(() => {
  //   getPostComments(post.id).then(comments => setComments(comments))
  // }, [post.slug])

  return (
    <>
      {
        comments?.length > 0
          ? (
            <div className="bg-white shaddow-lg rounded-lg p-8 pb-8">
              <h3 className="text-xlg font-semi-bold border-b pb-4 mb-8">
                {comments.length} Comments
              </h3>
              {
                comments.map(({id, name, comment, createdAt}) => (
                  <div key={id} className="mb-4 pb-4 border-b border-gray-100">
                    <p className="pb-4">
                      <span className="semi-bold text-md">{name}</span> <span className='text-gray-500'>on <Date dateString={createdAt} /></span>
                    </p>
                    <p className="whitespace-pre-line text-gray-600 w-full">{comment}</p>
                  </div>
              ))
              }
            </div>
          )
          : 'No Comments'
      }
    </>
  )
}

export default Comments
