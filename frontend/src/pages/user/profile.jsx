

import  { useState } from 'react'
import { useProfileMutation } from '../../redux/api/users'
import Loader from "../../components/Loader"
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router"
import {toast} from "react-toastify"
import {setCredentials} from "../../redux/features/auth/authSlice"

const Profile = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const {userInfo}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [updateProfile,{isLoading}]=useProfileMutation()
    const submitHandler=async(e)=>{
        e.preventDefault()
        if(password!==confirmPassword)toast.error("Passwords do not match")
        try{
            const res=await updateProfile({_id:userInfo._id,username,email,password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Profile updated successfully")
            navigate("/")
        }catch(e){
            toast.error(e.message)
            setUsername("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }
    }
  return (
    <div className='min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-50 flex items-center justify-center '>
        <section className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white mt-[5rem]">
            <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                Update Profile
            </h2>
            <form onSubmit={submitHandler}>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                     type="text"
                     className="mt-2 p-3 border border-gray-300 w-full rounded-lg 
                     shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     value={username}
                     onChange={e=>setUsername(e.target.value)}
                     placeholder='Enter your name'
                     />
                </div>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input 
                    type="email" 
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 
                    shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder='john123@gmail.com'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                     />
                </div>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input type="password" className="w-full mt-2 p-3 shadow-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input type="password" className="w-full mt-2 p-3 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder='Confirm password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
                </div>
                <div className="flex justify-center mt-6">
                    <button type='submit' disabled={isLoading} className='bg-teal-500 text-white px-3 py-3 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 w-full hover:bg-teal-600 transition transform hover:scale-105 ' >
                        {isLoading?"Updating...":"Update Profile"}
                    </button>
                </div>
                {isLoading&&<Loader/>}
            </form>
        </section>
    </div>
  )
}

export default Profile
