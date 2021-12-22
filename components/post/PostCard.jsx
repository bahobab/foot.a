import React from 'react'

function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-0 pb-12 mb-8 lg:p-8">
      <div className="relative overflow-hidden shaddow-md pb-80 mb-6">
        <img
          className="absolute object-top object-cover inset-0 w-full h-80 shaddow-lg rounded-t-lg lg:rounded-lg"
          src={post.featuredImage.url}
          alt={post.title}
        />
      </div>
    </div>
  )
}

export default PostCard
