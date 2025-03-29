'use client'
import { Form } from '@components/Form';
import { useRouter, useSearchParams } from '@node_modules/next/navigation';
import  { useState, useEffect } from 'react'

const updatePrompt = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const editPrompt = async (e)=>{
      e.preventDefault();
      setSubmitting(true)

      if(!promptId) alert('promptId Not Found')

      try {
        const res = await fetch(`/api/prompt/${promptId}`,{
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
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

    useEffect(()=>{
        const fetchPromptDetail =async () =>{
            const res = await fetch(`api/prompt/${promptId}`)
            const data = await res.json()
            setPost(data)
        }

        if(promptId) fetchPromptDetail()
    }, [promptId])

  return (
    <Form 
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
    />
  )
}

export default updatePrompt;
