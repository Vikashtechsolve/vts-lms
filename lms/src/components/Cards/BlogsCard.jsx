import { Play, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const BlogsCard = ({ item }) => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    // navigate to detail page
    navigate(`/app/blogs/${item.id}`);
  };

  return (
    <div
    onClick={handleCardClick}
     key={item.id} className="relative w-[60%] sm:w-[45%] md:w-70 flex-shrink-0 cursor-pointer">
      <div
        className="group relative rounded-2xl transition-all duration-500 transform-gpu hover:scale-125 hover:z-50"
        style={{ overflow: "visible" }}
      >
        {/* IMAGE WRAPPER */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* TITLE */}
        <p className="text-white mt-3 font-semibold text-sm px-1">
          {item.title}
        </p>

        {/* HOVER OVERLAY */}
        <div
          className="
            absolute inset-0 rounded-xl
        bg-neutral-900 backdrop-blur-xl
        opacity-0 group-hover:opacity-100 
        transition-all duration-300
        h-72 z-50 flex flex-col
        "
        >
          {/* IMAGE TOP ON HOVER */}
          <div className="h-40 rounded-t-xl  overflow-hidden ">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3 px-2 mt-2">
            <button className="bg-white text-black font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm w-full">
              <Play size={18} /> Continue Reading
            </button>

           <button onClick={""} className="border border-gray-600 rounded bg-gray-600 p-2 text-white">
                           <Plus size={18} fill="grey" />
                         </button>
          </div>

          {/* DETAILS */}
          <div className="mt-4 text-gray-300 text-sm px-2" >
            {/* <div className="flex justify-between text-white font-medium">
              <span>{item.year || "2025"}</span>
              <span>{item.modules || "6 Modules"}</span>
            </div> */}

            <p className=" text-gray-300 text-xs text-left leading-relaxed">
              {item.description ||
                "This playlist covers modern development with hands-on projects & tutorials"}
            </p>
          </div>
          <div className="mb-2 mt-2 px-2 flex justify-between text-xs font-medium">
              <span>Published By:{item.publishedBy}</span>
              <span>{item.date }</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
