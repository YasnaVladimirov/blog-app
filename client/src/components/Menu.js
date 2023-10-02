import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Menu({ cat }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/?cat=${cat}`);
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts, ", error);
      }
    }
    if (cat) getPostsByCategory();
  }, [cat])

  return (
    <div className='menu'>
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <img src={`/uploads/${post.img}`} alt=''></img>
          <h2>{post.title}</h2>
          <button onClick={() => {
            navigate(`/posts/${post.id}`);
          }}>Read More</button>
        </div>
      ))}
    </div>
  )
}

export default Menu