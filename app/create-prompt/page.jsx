'use client'
import { Form } from '@components/Form';
import { useSession } from '@node_modules/next-auth/react';
import { useRouter } from '@node_modules/next/navigation';
import  { useState } from 'react'

const createPrompt = () => {
    const {data: session} = useSession()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const createPrompt = async (e)=>{
      e.preventDefault();
      setSubmitting(true)

      try {
        const res = await fetch('/api/prompt/new',{
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
          })
        });
        if(res.ok){
          router.push('/')
        }
      } catch (error) {
        console.log("🚀 ~ createPrompt ~ error:", error)
      } finally{
        setSubmitting(false)
      }

    }


  return (
    <Form 
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default createPrompt;
