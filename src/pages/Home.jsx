import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
  const authStatus = useSelector((state) => state.auth?.status ?? false)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authStatus) {
      appwriteService.getPosts().then((response) => {
        if (response) {
          setPosts(response.documents)
        }
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [authStatus])

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (!authStatus) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <h1 className='text-2xl font-bold'>Login to read posts</h1>
        </Container>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <h1 className='text-xl'>No posts available.</h1>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard
                slug={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
