import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import AuthContext from '../context/AuthContext';

function PostPage() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getPostsById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        console.log("Error fetching post, ", error);
      }
    }
    getPostsById();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/posts/${id}`, {
        withCredentials: true
      })
      navigate("/");
    } catch (error) {
      console.log("Error deleting post, ", error);
    }
  }
  
  
  return (
    <div className='postPage'>
      <div className='content'>
        <img src={`/uploads/${post.postImg}`} alt=''></img>
        <div className='user'>
          {post?.userImg && <img src={`${post.userImg}`} alt='' />}
          <div className='user-info'>
            <span>{post.username}</span>
            <span className='post-date'>Posted {moment(post.date).fromNow()}</span>
          </div>
          {currentUser?.user.username === post.username &&
            <div className='edit'>
              <Link to={`/write?edit=${post.id}`} state={post}><img src={Edit} alt='' /></Link>
              <img src={Delete} alt='' onClick={handleDelete} />
            </div>}
        </div>
        <div className='info'>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </div>
      </div>
      <Menu cat={post.category}/>
    </div>
  )
}

export default PostPage 