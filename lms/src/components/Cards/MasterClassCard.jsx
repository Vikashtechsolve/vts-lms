import { Play, SquarePlus } from "lucide-react";

const MasterClassCard = ({ item }) => {
  return (
    <div key={item.id} className="relative w-80 flex-shrink-0 relative">
      <div
        className="
                group relative rounded-2xl transition-all duration-500 transform-gpu
                hover:scale-125 hover:z-50"
        style={{ overflow: "visible" }}
      >
        {/* IMAGE */}
        <div className=" rounded-2xl overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* DEFAULT — PLAY & TIME */}
        <div className="absolute bottom-3 right-3 bg-black/60 px-3 py-1 rounded-full text-xs">
          {item.duration || "1h 45m"}
        </div>

        <div className="absolute bottom-3 left-3 bg-white/30 backdrop-blur-md p-2 rounded-full">
          <Play size={16} className="text-white" />
        </div>

        {/* DEFAULT TITLE BELOW CARD */}
        <p className="text-white mt-3 p-2 text-sm font-semibold">
          {item.title}
        </p>

        {/* HOVER OVERLAY FULL CARD */}
        <div
          className="absolute inset-0 rounded-2xl bg-grey-700 backdrop-blur-xl
  opacity-0 group-hover:opacity-100 rounded-2x
  transition-all duration-00 p-3
  flex flex-col justify-center  h-72 z-50
  "
        >
          <div className="h-40 overflow-hidden rounded-xl">
            {/* TITLE TOP */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className=" w-full h-full object-cover h-8"
            />
          </div>

          {/* BUTTON ROW */}
          <div className="flex items-center gap-3">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded-full flex items-center gap-2 text-sm">
              <Play size={18} /> Watch Master Class
            </button>

            <button className="bg-white/20 border border-white rounded-full p-2 text-white">
              <SquarePlus size={20} />
            </button>
          </div>

          {/* DETAILS BOTTOM */}
          <div className="mt-4 text-gray-300 text-sm">
            <div className="flex justify-between text-white font-medium">
              <span>{item.year || "2025"}</span>
              <span>{item.modules || "5 Modules"}</span>
            </div>

            <p className="mt-2 text-gray-300 text-xs leading-relaxed">
              {item.description ||
                "Build scalable, high-performance mobile apps with advanced React Native architecture, hooks & state management."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterClassCard;
