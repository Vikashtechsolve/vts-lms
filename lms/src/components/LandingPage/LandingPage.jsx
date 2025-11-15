import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  SquarePlus,
  CircleChevronLeft,
  CircleChevronRight,
  CircleArrowLeft,
  CircleArrowRight,
} from "lucide-react";
import LandingPageImageg from "../../assets/pic1.jpg";
import Machinelearning from "../../assets/MachineLearning.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DSA from "../../assets/DSA.png";
import pic2 from "../../assets/pic2.png";
import pic3 from "../../assets/pic3.png";

const INTERVAL_MS = 3500; // 3.5 seconds

const slides = [
  {
    id: 1,
    image: LandingPageImageg,
    titleLines: ["MASTER THE ART", "FROM OUR", "EXPERTS"],
    subtitle:
      "Dive deep into exclusive masterclasses designed by our Industry Leaders and Professionals",
    cta: "Watch Now",
  },
  {
    id: 2,
    image: pic2,
    titleLines: ["LEARN LIVE WITH", "THE BEST", "MENTORS"],
    subtitle:
      "Join live online session and upgrade your Skills with top Mentors in every field",
    cta: "Watch Now",
  },
  {
    id: 3,
    image: pic3,
    titleLines: ["CRACK THE CODE TO", "YOUR DREAM", "CAREER"],
    subtitle:
      "Boost your programming skills with interactive coding sessions and Real-Time Projects ",
    cta: "Watch Now",
  },
];

function LandingPage() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Separate states for each section 
  const [playlists, setPlaylists] = useState([]);
  const [masterClasses, setMasterClasses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [loadingMaster, setLoadingMaster] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // separate refs for each scroll container
  const playlistRef = useRef(null);
  const masterRef = useRef(null);
  const blogRef = useRef(null);

  const navigate = useNavigate();

  // carousel interval (start/stop on hover)
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrent((s) => (s + 1) % slides.length);
      }, INTERVAL_MS);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused]);

  const goPrev = () => setCurrent((s) => (s - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((s) => (s + 1) % slides.length);

  // fetch playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await axios.get("/dummy.json");
        setPlaylists(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load playlist data:", err);
        setPlaylists([]);
      } finally {
        setLoadingPlaylists(false);
      }
    };
    fetchPlaylists();
  }, []);

  // fetch master classes
  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const res = await axios.get("/masterClass.json");
        setMasterClasses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load master class data:", err);
        setMasterClasses([]);
      } finally {
        setLoadingMaster(false);
      }
    };
    fetchMaster();
  }, []);

  // fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/dummy.json"); // <-- your blogs source
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load blogs data:", err);
        setBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  // unified loading check (optional)
  const loading = loadingPlaylists || loadingMaster || loadingBlogs;

  const scrollRefByAmt = (ref, direction, amt = 320) => {
    const el = ref && ref.current;
    if (!el) return;
    el.scrollLeft += direction === "left" ? -amt : amt;
  };

  if (loading) {
    return (
      <div className="bg-black text-white py-8 px-6">
        <div className="text-sm text-gray-400">Loading content...</div>
      </div>
    );
  }

  const active = slides[current];

  return (
    <div className="bg-black text-white min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative flex items-center px-16 py-24 h-[75vh] w-full"
        aria-roledescription="carousel"
        role="region"
        aria-label="Main hero carousel"
      >
        <div className="absolute inset-0">
          {slides.map((slide, idx) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.titleLines.join(" ")}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-linear
                ${idx === current ? "opacity-100" : "opacity-0"}
              `}
              style={{ objectPosition: "center" }}
            />
          ))}

          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl text-left font-extrabold leading-tight tracking-tight mb-4">
            {active.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="text-gray-300 mb-6 text-left whitespace-pre-line">{active.subtitle}</p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              <Play size={18} />
              {active.cta}
            </button>

            <SquarePlus className="cursor-pointer hover:text-gray-300 transition" size={46} />
          </div>
        </div>

        <div className="absolute right-8 bottom-8 z-20 flex items-center gap-3">
          <button onClick={goPrev} aria-label="Previous slide" className="bg-black/40 text-white p-2 rounded-md hover:bg-black/60 transition">◀</button>

          <div className="flex gap-2 items-center px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
              />
            ))}
          </div>

          <button onClick={goNext} aria-label="Next slide" className="bg-black/40 text-white p-2 rounded-md hover:bg-black/60 transition">▶</button>
        </div>
      </section>

      {/* Continue Watching (static cards) */}
      <section className="px-16 py-10 bg-black">
        <h2 className="text-xl text-left font-semibold mb-6">Continue Watching</h2>
        <div className="flex flex-wrap gap-6">
          <div className="w-60 bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
            <img src={Machinelearning} alt="Machine Learning Basics" className="w-full h-32 object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold">Machine Learning Basics</p>
            </div>
          </div>

          <div className="w-60 bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
            <img src={DSA} alt="DSA Mastery" className="w-full h-32 object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold">DSA Mastery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Playlists */}
      <div className="bg-black text-white py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Playlists</h2>
          <button onClick={() => navigate("/Playlist")} className="text-sm text-gray-400 hover:text-white transition cursor-pointer">View All &rarr;</button>
        </div>

        <div className="relative">
          <div ref={playlistRef} className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth px-1 py-2">
            <style>{`#playlist-scroll::-webkit-scrollbar { display: none; }`}</style>

            {playlists.map((item) => (
              <div key={item.id} className="bg-zinc-900 rounded-2xl w-72 flex-shrink-0 overflow-hidden shadow-lg hover:scale-105 transform transition-transform duration-200">
                <div className="relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-full">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-xs">{item.duration ?? `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 50)}m`}</div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 truncate">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={() => scrollRefByAmt(playlistRef, "left")} aria-label="scroll left" className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow transition">
              <CircleChevronLeft className="w-10 h-10" />
            </button>
            <button onClick={() => scrollRefByAmt(playlistRef, "right")} aria-label="scroll right" className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow transition">
              <CircleChevronRight className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>

      {/* Master Classes */}
      <div className="bg-black text-white py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Master Classes</h2>
          <button className="text-sm text-gray-400 hover:text-white transition cursor-pointer">View All &rarr;</button>
        </div>

        <div className="relative">
          <div ref={masterRef} className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth px-1 py-2">
            {masterClasses.map((item) => (
              <div key={item.id} className="bg-zinc-900 rounded-2xl w-72 flex-shrink-0 overflow-hidden shadow-lg hover:scale-105 transform transition-transform duration-200">
                <div className="relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-full">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-xs">{item.duration ?? `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 50)}m`}</div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 truncate">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={() => scrollRefByAmt(masterRef, "left")} aria-label="scroll left" className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow transition">
              <CircleArrowLeft className="w-10 h-10" />
            </button>
            <button onClick={() => scrollRefByAmt(masterRef, "right")} aria-label="scroll right" className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow transition">
              <CircleArrowRight className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div className="bg-black text-white py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Blog</h2>
          <button className="text-sm text-gray-400 hover:text-white transition cursor-pointer">View All &rarr;</button>
        </div>

        <div className="relative">
          <div ref={blogRef} className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth px-1 py-2">
            {blogs.map((item) => (
              <div key={item.id} className="bg-zinc-900 rounded-2xl w-72 flex-shrink-0 overflow-hidden shadow-lg hover:scale-105 transform transition-transform duration-200">
                <div className="relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-full">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-xs">{item.duration ?? `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 50)}m`}</div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 truncate">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={() => scrollRefByAmt(blogRef, "left")} aria-label="scroll left" className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow transition">
              <CircleArrowLeft className="w-10 h-10" />
            </button>
            <button onClick={() => scrollRefByAmt(blogRef, "right")} aria-label="scroll right" className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow transition">
              <CircleArrowRight className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
