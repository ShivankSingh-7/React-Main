import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ slug, title, featuredImage }) {
  // Fallback to a default image if featuredImage is missing or invalid
  const previewUrl =
    featuredImage && typeof featuredImage === 'string'
      ? appwriteService.getFilePreview(featuredImage)
      : '/default-image.jpg'; // make sure this exists in your `public` folder

  return (
    <Link to={`/post/${slug}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img
            src={previewUrl}
            alt={title || "Post image"}
            className='rounded-xl'
          />
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
