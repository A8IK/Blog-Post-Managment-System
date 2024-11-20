import React, { useState } from 'react';
// import { createPost } from '../services/blogServices';

const CreatePost = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const contenti = {title, content};
  
  try{

    const response = await fetch("http://localhost:9000/api/blogs",{
      method: 'POST',
      body: JSON.stringify(contenti),
      headers: { 'content-type': 'application/json', 
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    })

    .then(res => res.json())
		.then(data => {
			console.log(data);
      console.log(localStorage.getItem('token'))
		});
 
  }

  catch(error){
    console.log(error.message);
  }
};

  return (
  <form onSubmit={handleSubmit} className="space-y-4 p-4">

<div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
  <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    <input name="title" className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title" type="text"/>
    <textarea name="content" className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="Describe everything about this post here"></textarea>
    
    <div className="icons flex text-gray-500 m-2">
      <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
    </div>

    <div className="buttons flex">
      <button className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</button>
      <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</button>
    </div>
  </div>
</form>
  );
};

export default CreatePost;

  