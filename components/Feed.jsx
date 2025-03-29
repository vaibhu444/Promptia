'use client'
import React, { useEffect, useState } from 'react'
import { PromptCard } from './PromptCard'


const PromptCardList = ({data, handleTagClick}) =>{
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post)=>(
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}


export const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [post, setPost] = useState([])
  const handleSearchChange = () => {

  }

  useEffect(()=>{
    const fetchPost = async()=>{
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPost(data)
    }
    fetchPost()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={post}
        handleTagClick={()=>{}}
      />
    </section>
  )
}
