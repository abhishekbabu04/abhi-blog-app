import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../Dashboard/Sidebar'
import MyProfile from '../Dashboard/MyProfile'
import CreateBlog from '../Dashboard/CreateBlog'
import UpdateBlog from '../Dashboard/UpdateBlog'
import MyBlogs from '../Dashboard/MyBlogs'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const {profile,isAuthenticated}=useAuth()
  const [component,setComponent]=useState("My Blogs")
  console.log(profile)
  console.log(isAuthenticated)

  if(!isAuthenticated){
    return <Navigate to={"/"}/>;
  }

   return (
    <div>
       <Sidebar component={component} setComponent={setComponent}/>
       {component==="My Blogs" ? (<MyBlogs/>) : component==="Create Blog"?(<CreateBlog/>): component === "My Profile" ?(<MyProfile />):component==="UpdateBlog"?(<UpdateBlog/>):(<MyBlogs/>)}
    </div>
  )
}

export default Dashboard
