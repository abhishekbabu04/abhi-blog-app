import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [blogs, setBlogs] = useState()
  const [profile, setProfile] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/users/my-profile",
          {
            withCredentials: true,
          }
        );

        
        setProfile(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error.response?.data);
        setIsAuthenticated(false);
      }finally{
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:4001/api/blogs/all-blogs')
        console.log(data)
        setBlogs(data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchBlogs();
    fetchProfile()
  }, []);

  return (
    <AuthContext.Provider value={{setBlogs, blogs, profile, setProfile, isAuthenticated, setIsAuthenticated,loading }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
