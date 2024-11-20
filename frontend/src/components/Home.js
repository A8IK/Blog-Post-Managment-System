import { useEffect, useState } from 'react';
import { getPosts } from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();

        console.log("Fetched data:", data);

        setPosts(Array.isArray(data) ? data : []);
      } 
      catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Set to an empty array on error
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <div className="grid gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}
