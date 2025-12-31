import React from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import VideoSkeleton from "./VideoSkeleton";
import TextSkeleton from "./TextSkeleton";
import BaseSkeleton from "./BaseSkeleton";

/**
 * Playlist details page skeleton - matches PlaylistDetails.jsx layout
 */
const PlaylistDetailsSkeleton = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-80 p-4 md:p-6 border-r border-gray-800">
        <SidebarSkeleton />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Title */}
        <TextSkeleton lines={1} width="1/3" height="h-8" className="mb-6" />
        
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <BaseSkeleton key={i} className="w-20 h-10 rounded" />
          ))}
        </div>

        {/* Video Player */}
        <VideoSkeleton className="mb-6" />

        {/* Description */}
        <TextSkeleton lines={3} width="full" height="h-4" gap="gap-2" className="mb-4" />
        
        {/* Additional content skeleton */}
        <div className="space-y-4">
          <TextSkeleton lines={1} width="1/4" height="h-5" />
          <TextSkeleton lines={2} width="full" height="h-4" gap="gap-2" />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailsSkeleton;

