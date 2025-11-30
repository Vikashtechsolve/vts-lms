import React from "react";

// 1. We now accept 'data' as a prop
const Video = ({ data }) => {
  if (!data) return <div>No video available.</div>;

  return (
    <div className="text-gray-300">
      {/* <hr className="border-gray-700 my-6" /> */}

      {/* 2. Content Body (Now data-driven) */}
      <div>
        <div className="flex">
        <p className="text-xl font-semibold text-gray-200 mb-4">
          {/* Topic : {data.title} */}
        </p><p className="mb-6 text-gray-400">
          {data.descriptio}</p>
        </div>

        {/* 3. YouTube Embed */}
        <div className="aspect-video w-full">
          <iframe
            src={data.url}
            title={data.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Video;
