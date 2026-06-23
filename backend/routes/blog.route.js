import express from "express";
import {} from "../controllers/userController.js";
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlog, updateBlog } from "../controllers/blogController.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";
const router=express.Router()



router.post("/create" ,isAuthenticated,isAdmin("admin"), createBlog)
router.delete("/delete/:id",isAuthenticated,isAdmin("admin"), deleteBlog)
router.get("/all-blogs",getAllBlogs)
router.get("/single-blog/:id",isAuthenticated,getSingleBlog)
router.get("/my-blogs/",isAuthenticated,isAdmin("admin"),getMyBlogs)
router.put("/update/:id",isAuthenticated,isAdmin("admin"),updateBlog)



export default router;