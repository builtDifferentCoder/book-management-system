import { useState } from "react"
import {AiOutlineHome, AiOutlineLogin} from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useLogoutMutation} from "../../redux/api/users"
import {toast} from "react-toastify"
import {logout} from "../../redux/features/auth/authSlice"
const Navigation = () => {

  const [dropdownOpen,setDropdownOpen]=useState(false)
  const {userInfo}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[logoutApi]=useLogoutMutation()
  const logoutHandler=async()=>{
    try{
      await logoutApi().unwrap()
      dispatch(logout())
      navigate("/login")
    }catch(err){
      toast.error(err.message)
    }
  }
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow-md">
      <section className="flex justify-between items-center px-4 py-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-white transition-all duration-300 hover:translate-x-2">
            <AiOutlineHome className="mr-2" size={26}/>
            <span className="hidden sm:block">Home</span>
          </Link>
        </div>
        <div className="relative flex items-center"
          onMouseEnter={()=>setDropdownOpen(true)}
          onMouseLeave={()=>setDropdownOpen(false)}
        >
          {
            userInfo? (
              <div className="flex items-center text-white cursor-pointer">
                <span className="mr-2">{userInfo.username}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 transform ${dropdownOpen?"rotate-180":""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                 >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={dropdownOpen?"M5 15l7-7 7 7":"M19 9l-7 7-7-7"}
                  />
                 </svg>
              </div>
            ):(<div className="flex space-x-4">
              <Link to="/login" className="flex items-center text-white transition-all duration-300 hover:translate-x-2">
                <AiOutlineLogin className="mr-2" size={26}/>
                <span className="hidden sm:block">Login</span>
              </Link>
               <Link to="/register" className="flex items-center text-white transition-all duration-300 hover:translate-x-2">
                <AiOutlineLogin className="mr-2" size={26}/>
                <span className="hidden sm:block">Register</span>
              </Link>
            </div>)
          }
          {
            dropdownOpen&&userInfo&&(
              <ul className="absolute right-0 mt-[7rem] w-48 bg-white text-gray-700 rounded-lg shadow-xl transition-all duration-300 ease-in-out z-50">
                <li>
                  <Link to="/admin/books/dashboard" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                  Dashboard
                </Link>
                </li>
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded-b-lg">
                    Logout
                  </button>
                </li>
              </ul>
            )
          }
        </div>
      </section>
    </div>
  )
}

export default Navigation
