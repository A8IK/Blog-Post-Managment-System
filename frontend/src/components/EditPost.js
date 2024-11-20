import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();
        setPost({ title: data.title, content: data.content });
      } 
      catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/api/posts/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to update post');
      alert('Post updated successfully');
      navigate('/posts');
    } 
    catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full p-2 border rounded"
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="w-full p-2 border rounded"
            required/>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
