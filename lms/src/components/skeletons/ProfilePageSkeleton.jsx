import React from "react";
import AvatarSkeleton from "./AvatarSkeleton";
import FormSkeleton from "./FormSkeleton";
import TextSkeleton from "./TextSkeleton";

/**
 * Profile page skeleton - matches ProfilePage.jsx layout
 */
const ProfilePageSkeleton = () => {
  return (
    <div className="flex bg-[#141414] pt-16 text-white min-h-screen">
      {/* Sidebar placeholder */}
      <div className="mt-0 px-0 md:mt-8 md:px-12">
        <div className="w-48"></div>
      </div>

      {/* Center Column */}
      <div className="flex-1 flex flex-col items-center px-4 pt-8">
        {/* Title */}
        <TextSkeleton lines={1} width="1/6" height="h-10" className="mb-8" />

        {/* Avatar */}
        <div className="relative mb-14 flex flex-col items-center">
          <AvatarSkeleton size="w-48 h-48 md:w-56 md:h-56" />
          <div className="absolute bottom-2 right-0 md:bottom-4 md:right-4">
            <div className="bg-black p-2 rounded-full border border-white/25 w-8 h-8"></div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-[650px] flex flex-col px-4 gap-6 ml-0 lg:ml-16">
          <FormSkeleton fields={3} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;

