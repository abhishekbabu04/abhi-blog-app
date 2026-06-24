import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(blogs);

  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="container mx-auto my-10 p-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900">
          Latest
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {" "}Insights & Stories
          </span>
        </h1>
        <p className="mt-4 text-center text-gray-500 max-w-2xl mx-auto pb-11">
          Explore stories, ideas, and insights from the worlds of technology,
          coding, business, and travel.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-4 py-3 border rounded-lg"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-72 px-4 py-3 border rounded-lg"
          >
            <option value="">All Categories</option>

            <option value="Technology">Technology</option>
            <option value="Coding">Coding</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="AI/ML">AI / Machine Learning</option>
            <option value="Cyber Security">Cyber Security</option>

            <option value="Business">Business</option>
            <option value="Startup">Startup</option>
            <option value="Finance">Finance</option>

            <option value="Education">Education</option>

            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>

            <option value="Sports">Sports</option>
            <option value="Health">Health</option>

            <option value="Motivation">Motivation</option>
            <option value="News">News</option>
            <option value="General">General</option>
          </select>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;