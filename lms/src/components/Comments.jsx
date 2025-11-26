import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import FormatDate from "../Pages/News/components/FormatDate";

const Comments = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const commentCount = comments.filter((c) => !c.isInput).length;

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: "You",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      text: newComment,
      date: FormatDate(new Date().toISOString()),
      isInput: false,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  return (
    <div className="mt-20 text-left">
      <h3 className="font-roboto font-semibold text-[24px] text-white mb-8 text-left">
        Comments ({commentCount})
      </h3>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="flex gap-4 text-left">
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
              alt="You"
              className="w-[44px] h-[44px] rounded-full object-cover border border-gray-700"
            />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts?"
              className="w-full bg-[#1E1E1E] text-gray-300 text-[14px] font-poppins p-4 pr-12 rounded-[12px] border border-transparent focus:border-gray-600 outline-none transition-colors text-left"
            />
            <button
              onClick={handleAddComment}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Comment List */}
        {comments.map(
          (comment) =>
            !comment.isInput && (
              <div key={comment.id} className="flex gap-4 text-left">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-[44px] h-[44px] rounded-full object-cover border border-gray-700"
                  />
                </div>

                {/* Body */}
                <div className="flex-1 text-left">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h4 className="text-white font-poppins font-medium text-[14px]">
                      {comment.author}
                    </h4>
                    {comment.date && (
                      <span className="text-gray-500 text-[12px]">
                        {comment.date}
                      </span>
                    )}
                  </div>
                  <div className="bg-[#1E1E1E] p-4 rounded-[12px] text-[#B3B3B3] text-[14px] font-poppins font-medium leading-[24px] text-left">
                    {comment.text}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Comments;
