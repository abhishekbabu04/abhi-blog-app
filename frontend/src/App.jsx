import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useAuth } from './context/AuthProvider'
import Creators from './pages/Creators'
import  { Toaster } from 'react-hot-toast';
import UpdateBlog from './Dashboard/UpdateBlog'
import Detail from './pages/Detail'
import Notfound from './pages/Notfound'

const App = () => {

const location=useLocation()
const hideNavbarFooter=["/dashboard","/login","/register"].includes(location.pathname);

const {blogs,isAuthenticated,loading}=useAuth()
if (loading) {
  return <h1>Loading...</h1>;
}
console.log(blogs)

  return (
    <div>
      {!hideNavbarFooter && <Navbar/>}
      <Routes>
        <Route exact path="/" element={isAuthenticated===true?<Home />:<Navigate to={"/login"}/>} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/creators" element={<Creators/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard/>}/>

        {/* single page route */}
        <Route exact path="/blog/:id" element={<Detail/>}/>

        {/* update page route */}
         
         <Route exact path="/blog/update/:id" element={<UpdateBlog/>}/>

         {/* universal route */}
        <Route  path="*" element={<Notfound/>}/>

       </Routes >
       <Toaster />
       {!hideNavbarFooter && <Footer/>}
       
    </div >
  )
}

export default App
