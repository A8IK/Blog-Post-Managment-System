import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/posts'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data: " ,data);
        setPosts(data);
      }
       catch (error) {
        console.error('Error fetching posts:', error.message);
        alert('Error fetching posts');
      }
    };

    const fetchUser = () => {
      const storedUser = localStorage.getItem('user');
      console.log("User object from localStorage:", localStorage.getItem('user'));
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('User object from localStorage inside if:', user); 
        setUserId(user.id);
        console.log('Stored user:', user); 
        setUserId(user.id || user._id);
      }
    }

    fetchPosts();
    fetchUser();
  }, []);

  const handleDelete = async (postId) => {
    if(!window.confirm('Are you sure you want to delete this post?')) return;

    try{
      const response = await fetch(`http://localhost:9000/api/posts/delete/${postId}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Post deleted successfully");
      setPosts(posts.filter((post) => post.id !== postId));
    }

  catch(error){
    console.error("Error deleting post:", error.message);
    alert('Error deleting post');
  }
}

  return (
    <div className="p-4 mt-10">
      {posts.map((post) => (
        <div key={post._id} className="mb-4 p-4 border-b">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <span className="text-gray-500 text-sm">Author: {post.author}</span>
          {userId === post.author &&(
            <div className = "mt-2 flex gap-2">
              <button className = "px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate(`/edit-post/${post._id}`)}>Edit</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(post._id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;

