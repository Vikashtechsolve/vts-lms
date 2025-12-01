import React, { useState } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { Plus, Check, MessageCircle, Share2 } from "lucide-react";


const BlogDetails = ({ blog, onBack }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const comments = blog.comments || [];

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-black text-white pb-20 animate-fade-in">
      {/* Back Navigation */}
      <div className="max-w-[1110px] mx-auto px-4 pt-6 mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors group font-poppins"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Blogs
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-[1110px] mx-auto px-4">
        {/* 1. Top Image */}
        <div className="w-full h-[250px] md:h-[420px] rounded-[12px] overflow-hidden mb-[28px]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. Title */}
        <h1 className="font-roboto font-semibold text-[22px] md:text-[26px] leading-[1.2] md:leading-[24px] text-white mb-6 text-left">
          {blog.title}
        </h1>

        {/* 3. Description & Actions Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-[#333] pb-8">
          {/* LEFT: Description */}
          <p className="font-poppins font-medium text-[14px] leading-[24px] text-[#B3B3B3] md:max-w-[760px] text-left">
            {blog.description}
          </p>

          {/* RIGHT: Actions (Watchlist, Comment, Share) */}
          <div className="flex items-center gap-4 self-start">
            {/* Watchlist Button */}
            <button
              onClick={() => setInWishlist(!inWishlist)}
              className={`
                  h-[36px] px-4 rounded-[8px] flex items-center gap-2 transition-colors
                  ${
                    inWishlist
                      ? "bg-vts-red text-white"
                      : "bg-[#2A2A2A] text-gray-300 hover:bg-[#333] hover:text-white"
                  }
                `}
            >
              {inWishlist ? <Check size={16} /> : <Plus size={16} />}
              <span className="text-[12px] font-poppins font-medium">
                Watchlist
              </span>
            </button>

            {/* Icons */}
            <div className="flex items-center gap-3 text-gray-400">
              <button className="p-2 hover:text-white transition-colors bg-[#2A2A2A] rounded-[8px] hover:bg-[#333]">
                <MessageCircle size={18} />
              </button>
              <button className="p-2 hover:text-white transition-colors bg-[#2A2A2A] rounded-[8px] hover:bg-[#333]">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Author & Date */}
        <div className="flex items-center gap-4 mb-12">
          {/* Avatar Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-sm font-bold">
              {blog.author.charAt(0)}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-[14px] font-poppins">
            <span className="text-white font-semibold">{blog.author}</span>
            <span className="hidden md:inline text-gray-600">•</span>
            <span className="text-gray-500">{blog.date}</span>
          </div>
        </div>

        {/* 5. Main Content */}
        <div className="font-roboto font-normal text-[16px] leading-[26px] text-[#E0E0E0] mb-20 space-y-6 text-left">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* 6. Comments Section */}
        <Comments comments={comments} />
      </div>
    </div>
  );
};

export default BlogDetails;
