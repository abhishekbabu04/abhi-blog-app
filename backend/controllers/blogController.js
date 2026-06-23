
import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";


export const createBlog = async (req, res) => {

    try {
        if (!req.files || !req.files.blogImage) {
            return res.status(400).json({ message: "Blog image  is required" });
        }

        const { blogImage } = req.files;

        const allowedFormats = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(blogImage.mimetype)) {
            return res.status(400).json({ message: "Invalid image format" });
        }

        const { title, category,  about } = req.body;

        if (!title || !category || !about  ) {
            return res.status(400).json({ message: "All fields are required" });
        }

         const adminName = req.user.name;
         const adminPhoto = req.user.photo?.url;
         const createdBy = req.user._id;

        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({error: "Image upload failed" });
        }

        
        const blogData = ({
            title,
            category,
            about,
            adminName,
            adminPhoto,
            createdBy,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        });

      const blog=  await Blog.create(blogData);
         
            
            res.status(201).json({ message: "Blog created successfully", blog });
        
    } catch (error) {
          console.log(error)
           res.status(500).json({ error:"Internal server error" });
    }


};


export const deleteBlog = async (req, res) => {
  try {
    
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllBlogs=async (req,res)=>{
const allBlogs=await Blog.find()
res.status(200).json(allBlogs);
};

export const getSingleBlog = async(req,res)=>{
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({ message: "Invalid Blog id" });
    }
    const blog =await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog)
     
}


export const getMyBlogs = async(req,res)=>{
    const createdBy=req.user._id;
    const myBlogs=await Blog.find({createdBy});
    res.status(200).json(myBlogs);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(updatedBlog);
};