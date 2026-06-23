import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../../utils";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const { setBlogs } = useAuth();

  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double click

    if (!title || !category || !about) {
    toast.error("Please fill all required fields");
    return;
  }

  if (!blogImage) {
    toast.error("Please upload a blog image");
    return;
  }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("about", about);
      formData.append("blogImage", blogImage);

      const { data } = await axios.post(
        `${BACKEND_URL}/api/blogs/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);
      toast.success("blog created successfully");

      setBlogs((prev) => [data.blog, ...prev]);

      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");

    } catch (error) {
       console.log("Backend Error:", error.response?.data);

    toast.error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-5">Create Blog</h3>

          <form onSubmit={handleCreateBlog} className="space-y-6">

            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-[0.4rem] border border-gray-400 rounded-md outline-none"
              >
                <option value="">Select Category</option>

                <optgroup label="💻 Technology">
                  <option value="Technology">Technology</option>
                  <option value="Coding">Coding</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="AI/ML">AI / Machine Learning</option>
                  <option value="Cyber Security">Cyber Security</option>
                </optgroup>

                <optgroup label="💼 Business">
                  <option value="Business">Business</option>
                  <option value="Startup">Startup</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Digital Marketing</option>
                  <option value="Career">Career Guidance</option>
                </optgroup>

                <optgroup label="🎓 Education">
                  <option value="Education">Education</option>
                  <option value="Learning">Learning</option>
                  <option value="Tutorials">Tutorials</option>
                </optgroup>

                <optgroup label="🎬 Entertainment">
                  <option value="Entertainment">Entertainment</option>
                  <option value="Movies">Movies</option>
                  <option value="Music">Music</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Travel">Travel</option>
                </optgroup>

                <optgroup label="🏃 Sports & Health">
                  <option value="Sports">Sports</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Health">Health</option>
                </optgroup>

                <optgroup label="✨ Others">
                  <option value="Devotion">Devotion</option>
                  <option value="Motivation">Motivation</option>
                  <option value="News">News</option>
                  <option value="General">General</option>
                  <option value="Other">Other</option>
                </optgroup>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-[0.4rem] border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Blog Image</label>

              <div className="flex items-center justify-center">
                <img
                  src={blogImagePreview ? blogImagePreview : "/imgPL.webp"}
                  alt="Image"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>

              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-[0.4rem] border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>

              <textarea
                rows="5"
                placeholder="Write something about your blog ( more than 200 characters)"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-[0.4rem] border border-gray-400 rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-white rounded-md transition-colors duration-200 cursor-pointer ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Posting Blog..." : "Post Blog"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;