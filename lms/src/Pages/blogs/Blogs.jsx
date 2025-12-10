import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogsCardH from "../../components/Cards/BlogsCardH";
import BlogDetails from "./BlogDetails";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs.json");
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (selectedBlog) {
    return (
      <BlogDetails blog={selectedBlog} onBack={() => setSelectedBlog(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20 pt-10">
      {/* Page Header */}
      <div className="flex flex-col items-center justify-center mb-10">
        <h2 className="font-playfair font-semibold text-[28px] leading-[100%] text-white tracking-normal">
          Blogs
        </h2>
      </div>

      {/* Blog List Container */}
      <div className="px-4 md:px-0 max-w-[1110px] mx-auto space-y-6">
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading articles...
          </div>
        ) : (
          blogs.map((item) => (
            <BlogsCardH
              key={item.id}
              data={item}
              onClick={() => setSelectedBlog(item)}
            />
          ))
        )}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="text-sm text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1 font-poppins">
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default Blogs;
