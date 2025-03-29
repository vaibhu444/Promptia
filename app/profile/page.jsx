'use client'
import { Profile } from '@components/Profile'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const {data: session} = useSession()
    const [post, setPost] = useState([])
    const router = useRouter()
    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async(pt) => {
      const hasConfirmed = confirm('are you sure you want to delete this prompt')
      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${pt._id}`, {
            method: 'DELETE'
          })

          const filterdPosts = post.filter((p)=> p._id!==pt._id)
          console.log("🚀 ~ handleDelete ~ filterdPosts:", filterdPosts)
          setPost(filterdPosts)

        } catch (error) {
          console.log("🚀 ~ handleDelete ~ error:", error)
          
        }
      }
    }

    useEffect(()=>{
        const fetchPost = async()=>{
          const res = await fetch(`/api/user/${session?.user.id}/posts`);
          const data = await res.json();
          setPost(data)
        }
        if(session?.user.id) fetchPost()
      }, [session?.user.id])

  return (
    <Profile 
        name='my'
        desc='Welcome to your personalized profile page'
        data={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;
