// components/Cards/MasterClassCard.jsx
import React from "react";
import { Play, SquarePlus, CalendarCheck2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MasterClassCard = ({ item }) => {
  const navigate = useNavigate();

  const handleOpen = (e) => {
    e?.stopPropagation?.();
    const status = (item.status || "").toLowerCase();

    if (status === "live") {
      navigate(`/app/LiveClass/${item.id}`, { state: { item } });
    } else if (status === "recorded") {
      navigate(`/app/recorded/${item.id}`, { state: { item } });
    } else if (status === "upcoming") {
      navigate(`/app/upcoming/${item.id}`, { state: { item } });
    } else {
      navigate(`/app/master-class/${item.id}`, { state: { item } });
    }
  };

  return (
    <div key={item.id} className="relative w-69 flex-shrink-0">
      <div
        className="group relative rounded-2xl transition-all duration-500 transform-gpu hover:scale-125 hover:z-50 cursor-pointer"
        style={{ overflow: "visible" }}
        onClick={handleOpen}
      >
        <div className="rounded-2xl overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badge */}
          {item.status === "Upcoming" ||
          item.badge === "Upcoming Master Class" ? (
            <div className="absolute left-0 right-0 mx-auto w-[275px] top-40 bg-zinc-700 text-yellow-400 text-sm px-3 py-1 flex items-center justify-center font-bold gap-2 rounded">
              <CalendarCheck2 />
              {item.badge}
            </div>
          ) : item.status === "Live" || item.badge === "Live Now" ? (
            <div className="absolute left-0 right-0 mx-auto w-[275px] top-40 bg-zinc-700 text-white px-3 py-1 flex items-center justify-center  gap-2 rounded">
              <span
                className="inline-block w-3 h-3 bg-red-500 rounded-full"
                aria-hidden="true"
              />
              {item.badge}
            </div>
          ) : item.status === "Recorded" || item.badge === "Recorded" ? (
            <div className="absolute left- top-40 w-[275px] bg-zinc-700 text-white px-3 py-1 rounded">
              {item.badge}
            </div>
          ) : (
            <div className="absolute left-3 bottom-3 bg-slate-700 text-white text-xs px-3 py-1 rounded-full">
              {item.badge}
            </div>
          )}
        </div>

        <p className="text-white mt-3 p-2 text-sm font-semibold">
          {item.title}
        </p>

        {/* Hover overlay - unchanged */}
        <div
          className=" absolute inset-0 rounded-xl
        bg-gray-900 backdrop-blur-xl
        opacity-0 group-hover:opacity-100 
        transition-all duration-300
        h-72 z-50 flex flex-col
        "
        >
          <div className="h-40 overflow-hidden rounded-xl">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-3 ">
            <button
              className="bg-white text-black ml-2 font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm w-full"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
            >
              <Play size={18} fill="black" />
              {item.status === "Live" || item.badge === "Live Now"
                ? "Join Now"
                : item.status === "Recorded" || item.badge === "Recorded"
                ? "Watch"
                : item.status === "Upcoming" ||
                  item.badge === "Upcoming Master Class"
                ? "Upcoming Session"
                : "Watch"}
            </button>

            {/* <button className=" p-2 text-white">
              <SquarePlus size={38} />
            </button> */}
          </div>

          <div className=" text-gray-300 px-3 p-2 text-sm">
            <div className="flex justify-between text-white font-medium">
              <span>{item.year || "2025"}</span>
              <span>{item.modules || "5 Modules"} Modules</span>
            </div>

            <p className="mt-2 text-gray-300 text-xs text-left leading-relaxed">
              {item.description || "Description will appear here."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterClassCard;
