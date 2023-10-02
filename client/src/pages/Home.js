import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const cat = location.search;

  useEffect(() => {
    const getPostsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts${cat}`);
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts, ", error);
      }
    }
    getPostsByCategory();
  }, [cat])

  const navigate = useNavigate();

  return (
    <div className='home'>
      <div className='posts'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className='post' key={post.id}>
              <div className='img'>
                <img src={`/uploads/${post?.img}`} alt='' />
              </div>
              <div className='content'>
                <h1>
                  <Link
                    to={`/posts/${post.id}`}
                    className='link'
                  >
                    {post.title}
                  </Link>
                </h1>
                <p>{post.description}</p>
                <button onClick={() => {
                  navigate(`/posts/${post.id}`)
                }}>Read More</button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts of that category...</p>
        )}
      </div>
    </div>
  )
}

export default Home;