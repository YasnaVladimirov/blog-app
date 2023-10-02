import axios from 'axios';
import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

function WritePost() {
  const quillRef = useRef(null);
  const post = useLocation().state;
  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [category, setCategory] = useState(post?.category || "");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData(); 
      formData.append("image", image);
      formData.append("title", title);
      const descText = description.replace(/<[^>]*>/g, '');
      formData.append("description", descText);
      formData.append("category", category);

      let response;
      post
        ? response = await axios.put(`http://localhost:8000/posts/${post.id}`, formData, {
          withCredentials: true
        })
        : response = await axios.post("http://localhost:8000/posts", formData, {
          withCredentials: true
      });
      
      navigate(`/posts/${response.data.post.id}`)

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='add'>
      <div className='content'>
        <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

        <div className='editorContainer'>
          <ReactQuill ref={quillRef} theme="snow" value={description} onChange={setDescription} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span><b>Visibility:</b> Public</span>

          <label htmlFor='file'><b>Upload Image:</b></label>
          <input
            id='file'
            type='file'
            onChange={e => setImage(e.target.files[0])}
          />

          <div className='buttons'>
            <button onClick={handleSubmit}>Submit</button>
          </div>

        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <input type='radio' name='cat' value="art" checked={category === "art"} id='art' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
            <input type='radio' name='cat' value="science" checked={category === "science"} id='science' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
            <input type='radio' name='cat' value="technology" checked={category === "technology"} id='technology' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
            <input type='radio' name='cat' value="cinema" checked={category === "cinema"} id='cinema' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='cat'>
            <input type='radio' name='cat' value="design" checked={category === "design"} id='design' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='design'>Design</label>
          </div>
          <div className='cat'>
            <input type='radio' name='cat' value="food" checked={category === "food"} id='food' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='food'>Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WritePost