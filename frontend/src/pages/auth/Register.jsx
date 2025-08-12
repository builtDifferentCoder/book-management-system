import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from "react-router"
import {useRegisterMutation} from "../../redux/api/users"
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from "react-toastify"
import {setCredentials} from "../../redux/features/auth/authSlice"

const Register = () => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")

  const [register,{isLoading}]=useRegisterMutation()

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {userInfo}=useSelector(state=>state.auth)
  const search=useLocation()
  const sp=new URLSearchParams(search)
  const redirect=sp.get("/redirect")||""
  const submitHandler=async(e)=>{
    e.preventDefault()
    if(password!==confirmPassword) toast.error("Passwords do not match")
    else{
      try {
          const res=await register({username,email,password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate(redirect)
          toast.success("User registered successfully")
      } catch (error) {
        console.log(error)
        toast.error(error.data.message)
      }
  }
  }
  useEffect(()=>{
    if(userInfo) navigate(redirect)
  },[navigate,userInfo,redirect])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-50">
      <section className="w-full max-w-md bg-white p-8 mt-[5rem] mb-[5rem] h-[36rem] rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Register
        </h1>
        <form onSubmit={submitHandler}>
          <div className="my-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input type="text" id="name" className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 " placeholder='Enter your name' value={username} onChange={(e)=>setUsername(e.target.value)}  />
          </div>
          <div className="my-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" className='mt-2 p-3 border border-gray-300 shadow-lg rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='john123@gmail.com' value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="my-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" placeholder='password' className='mt-2 p-3 border border-gray-300 shadow-lg rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500' value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className="my-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder='Confirm Password' className='mt-2 p-3 w-full border border-gray-300 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
          </div>
          <div className="mt-4 text-right">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to={redirect?`/login?redirect=${redirect}`:"/login"} className='text-teal-500 hover:underline'>Login</Link>
            </p>
          </div>
          <button disabled={isLoading} type='submit' className='w-full bg-teal-500 text-white py-3 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 transition transform hover:scale-105 my-4'>
            {isLoading?"Registering...":"Register"}
          </button>
          {isLoading&&<Loader/>}
        </form>
      </section>
    </div>
  )
}

export default Register
