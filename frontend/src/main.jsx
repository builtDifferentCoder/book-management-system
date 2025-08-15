import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import {Route,RouterProvider,createRoutesFromElements} from "react-router"
import {createBrowserRouter} from "react-router-dom"
import store from "./redux/store.js"
import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import PrivateRoute from './pages/auth/PrivateRoute.jsx'
import Profile from './pages/user/profile.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<Home/>}></Route>
      <Route  path="/login" element={<Login/>}></Route>
      <Route  path="/register" element={<Register/>}></Route>
      <Route path="" element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}></Route>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
