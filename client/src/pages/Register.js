import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Register() {
  const navigate = useNavigate();
  const usernameRef = useRef();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required!")
      .matches(/^[A-z][A-z0-9-_]{3,23}$/, {
        message: "Must start with a letter\nMin length is 3 characters\nHyphen and underscore allowed",
      }),
    password: yup
      .string()
      .required("Password is required!")
      .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/, {
        message: "Must start with a letter\nMin length is 5 characters\nMust contain one number and one character of the following !@#$%",
      }),
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, {
        message: "Invalid Email!",
      }),
    gender: yup
      .string()
      .required("Gender is required!")
  });


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const submit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        gender: data.gender
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error in response," + error);
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(submit)}>
        <input
          ref={usernameRef}
          required
          type='text'
          placeholder='Username...'
          name='username'
          {...register("username")}
        />
        {errors?.username && <p>{errors.username?.message}</p>}

        <input
          required
          type='email'
          placeholder='Email...'
          name='email'
          {...register("email")}
        />
        {errors?.email && <p>{errors.email?.message}</p>}

        <input
          required
          type='password'
          placeholder='Password...'
          name='password'
          {...register("password")}
        />
        {errors?.password && <p>{errors.password?.message}</p>}

        <div className='gender'>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            {...register("gender")}
          />
          <label htmlFor="female">Female</label>
        </div>
        <div className='gender'>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            {...register("gender")}
          />
          <label htmlFor="male">Male</label>
          
        </div>
        {errors?.gender && <p>{errors.gender?.message}</p>}
        <button>Register</button>

        <span>Already have account? <Link to="/login" className='link' style={{color: "rgb(0, 75, 75)"}}>Login</Link></span>
      </form>
    </div>
  )
}

export default Register