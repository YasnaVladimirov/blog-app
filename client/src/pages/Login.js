import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email, password
      }, {
        withCredentials: true
      });
      setCurrentUser(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error loggind user, " + error);
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type='email'
          placeholder='Email...'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          required
          type='password'
          placeholder='Password...'
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button>Login</button>
        <span>Create an account? <Link to="/register" className='link' style={{color: "rgb(0, 75, 75)"}}>Register</Link></span>
      </form>
    </div>
  )
}

export default Login