 <div className="bg-black text-white py-8 px-6">
        <div className="flex justify-between items-center bg-black mb-12">
          <h2 className="text-xl font-semibold">Blog</h2>
          <button className="text-sm text-gray-400 hover:text-white transition cursor-pointer">
            View All &rarr;
          </button>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsBlogHover(true)}
          onMouseLeave={() => setIsBlogHover(false)}
        >
          <div className="relative">
            <div
              ref={blogRef}
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="flex space-x-4 overflow-x-auto no-scrollbar px-1 py-2"
            >
              {blogs.map((item) => (
                <div key={item.id} className="w-80 flex-shrink-0 relative">
                  <div className="group relative rounded-2xl transition-all duration-500 transform-gpu hover:scale-125 hover:z-50"
                    style ={{overflow: "visible"}} 
                  >
                    <div className=" rounded-2xl overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-full z-10">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-xs z-10">
                        {item.duration ??
                          `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(
                            Math.random() * 50
                          )}m`}
                      </div>

                      <div className="absolute inset-0  rounded-2xl bg-grey-700 backdrop-blur-xl opacity-0 group-hover:opacity-100 rounded-2x transition-all duration-00 p-3 flex flex-col justify-center h-72">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear w-full h-full flex items-end justify-center pointer-events-auto">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="bg-white text-black px-3 py-2 rounded-full font-semibold shadow-md flex items-center gap-2">
                              <Play size={14} />
                              <span className="text-xs">Watch Now</span>
                            </div>
                            <button className="bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-md">
                              <SquarePlus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 transition-all duration-300 group-hover:ring-2 group-hover:ring-cyan-400 group-hover:shadow-2xl">
                      <h3 className="text-sm font-semibold truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {item.category}
                      </p>
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollRefByAmt(blogRef, "left")}
              aria-label="scroll blogs left"
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 transition-opacity pointer-events-auto ${
                isBlogHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleArrowLeft className="w-10 h-10" />
              </div>
            </button>

            <button
              onClick={() => scrollRefByAmt(blogRef, "right")}
              aria-label="scroll blogs right"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 transition-opacity pointer-events-auto ${
                isBlogHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleArrowRight className="w-10 h-10" />
              </div>
            </button>
          </div>
        </div>
      </div>