import React, {useEffect, useRef, useState} from 'react'

import {submitComment} from '@/lib/api'

function CommentForm({post}) {
  const [locaStorage, setLocaStorage] = useState(null)
  const [error, setError] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const commentEl = useRef(null)
  const nameEl = useRef(null)
  const emailEl = useRef(null)
  const storeDataEl = useRef(null)

  useEffect(() => {
    if (window.localStorage.getItem('name')) {
      nameEl.current.value = window.localStorage.getItem('name')
    }
    if (window.localStorage.getItem('email')) {
      emailEl.current.value = window.localStorage.getItem('email')
    }
  }, [])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    setError(false)
    const {value: name} = nameEl.current
    const {value: email} = emailEl.current
    const {value: comment} = commentEl.current
    const {value: storeData} = storeDataEl.current

    if ( !name || !email || !comment ) {
      setError(true)
      return
    }

    const commentObj = {
      name,
      email,
      comment,
      post: post.id,
    }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(commentObj)
    .then(() => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
        commentEl.current.value = ''
      }, 5000)
    }
    )
  }

  return (
    <div className="bg-green-500 rounded-lg p-8 pb-12 mb-8 mt-8">
      <h3 className="text-th-accent-secondary font-semibold mb-8 pb-4 border-b">
        Leave a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl} 
          name="comment" 
          placeholder="Comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          ref={nameEl}
          name="name"
          placeholder="Name"
          type="text" 
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />

        <input
          ref={emailEl}
          name="email"
          placeholder="Email"
          type="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox" 
            ref={storeDataEl}
            name="storeData"
            id="storeData"
            className="mr-2"
            value="true"
          />
          <label htmlFor="storeData" className="text-gray-500 cursor-pointer">Save my name & email for future comments</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button 
          type="button"
          onClick={handleCommentSubmit}
          className="transition duration-500 ease hover:bg-th-accent-secondary inline-block bg-pink-600 text-lg text-white font-semibold rounded-lg px-4 py-2 cursor-pointer border-none outline-none"
        >
          Post Your Comment
        </button>
        {showSuccessMessage && <p className="text-xs float-right text-th-accent-secondary font-semibold">Comment Submitted for Review</p>}
      </div>
    </div>
  )
}

export default CommentForm
