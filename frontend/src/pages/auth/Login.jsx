
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useLoginMutation } from '../../redux/api/users'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [login,{isLoading}]=useLoginMutation()
  const {userInfo}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {search}=useLocation()
  const sp=new URLSearchParams(search)
  const redirect=sp.get("redirect")||"/"
  const submitHandler=async(e)=>{
    e.preventDefault()
    try{
      const res=await login({email,password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)
    }catch(e){
      toast.error(e.data.message)
      setEmail("")
      setPassword("")
    }
  }
  useEffect(()=>{
    if(userInfo) navigate(redirect)
  },[navigate,userInfo,redirect])
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <section className="bg-white w-full max-w-md  rounded-lg shadow-lg p-8 ">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={submitHandler}>
          <div className="my-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" className="w-full rounded-lg mt-2 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder='john123@gmail.com' value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="my-4">
            <label htmlFor="password" className="block text-sm text-gray-700 font-medium ">
              Password
            </label>
            <input type="password" id="password" className='w-full rounded-lg mt-2 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500' value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className="text-right mb-4">
            <p className="text-sm text-gray-600">
              New Customer?{" "}
              <Link to={redirect?`/register?redirect=${redirect}`:"/register"} className='text-teal-500 hover:underline'>
                Register
              </Link>
            </p>
          </div>
          <button className="w-full bg-teal-500 text-white py-3 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 transition transform hover:scale-105">
            {isLoading?"Signing in...":"Sign In"}
          </button>
          {isLoading&&<Loader/>}
        </form>
      </section>
    </div>
  )
}

export default Login
