import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  SquarePlus,
  Plus,
  // CircleChevronLeft,
  // CircleChevronRight,
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
import PlaylistCard from "../../components/Cards/PlaylistCard.jsx";
import MasterClassCard from "../../components/Cards/MasterClassCard.jsx";
import BlogsCard from "../../components/Cards/BlogsCard.jsx";

const INTERVAL_MS = 3500; // 3.5 seconds

const slides = [
  {
    id: 1,
    image: LandingPageImageg,
    titleLines: ["MASTER THE ART FROM", " OUR EXPERTS"],
    subtitle:
      "Dive deep into exclusive masterclasses designed by our Industry Leaders and Professionals",
    cta: "Watch Now",
  },
  {
    id: 2,
    image: pic2,
    titleLines: ["LEARN LIVE WITH", "THE BEST MENTORS"],
    subtitle:
      "Join live online session and upgrade your Skills with top Mentors in every field",
    cta: "Watch Now",
  },
  {
    id: 3,
    image: pic3,
    titleLines: ["CRACK THE CODE TO", "YOUR DREAM CAREER"],
    subtitle:
      "Boost your programming skills with interactive coding sessions and Real-Time Projects ",
    cta: "Watch Now",
  },
];

function LandingPage() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [playlistScrolled, setPlaylistScrolled] = useState(false);
  const [masterScrolled, setMasterScrolled] = useState(false);
  const [blogScrolled, setBlogScrolled] = useState(false);

  const timerRef = useRef(null);

  // data states
  const [playlists, setPlaylists] = useState([]);
  const [masterClasses, setMasterClasses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [loadingMaster, setLoadingMaster] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // refs for scrolling
  const playlistRef = useRef(null);
  const masterRef = useRef(null);
  const blogRef = useRef(null);

  // hover state for each carousel wrapper (controls overlay arrows)
  const [isPlaylistHover, setIsPlaylistHover] = useState(false);
  const [isMasterHover, setIsMasterHover] = useState(false);
  const [isBlogHover, setIsBlogHover] = useState(false);

  const navigate = useNavigate();

  // hero carousel autoplay
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

  // const goPrev = () =>
  //   setCurrent((s) => (s - 1 + slides.length) % slides.length);
  // const goNext = () => setCurrent((s) => (s + 1) % slides.length);

  // fetch data
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/dummy.json");
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

  const loading = loadingPlaylists || loadingMaster || loadingBlogs;

  const scrollRefByAmt = (ref, direction, amt = 320) => {
    const el = ref && ref.current;
    if (!el) return;
    // use smooth programmatic scrolling; user scroll (wheel/touch) is prevented on the container
    el.scrollBy({
      left: direction === "left" ? -amt : amt,
      behavior: "smooth",
    });
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
    <div className="bg-black text-white min-h-screen  overflow-x-hidden">
      {/* Hero Section */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative flex items-center px-4 md:px-16 py-12 md:py-24 w-full h-[62vh] md:h-[75vh]"
        aria-roledescription="carousel"
        role="region"
        aria-label="Main hero carousel"
      >
        <div className="absolute inset-0">
          {slides.map((slide, idx) => (
            <img
              key={slide.id ?? idx}
              src={slide.image}
              alt={slide.titleLines.join(" ")}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-linear ${
                idx === current
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{ objectPosition: "center" }}
            />
          ))}

          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content container - centered for mobile like your screenshot */}
        <div
          className="
            relative z-10 w-full max-w-2xl 
            flex flex-col justify-center-end
           md:text-left
            mx-auto md:mx-0
            mt-52 md:mt-0
          "
        >
          {/* Title */}
          <h1 className="text-2xl  sm:text-4xl  md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-white drop-shadow-md mb-3">
            {active.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mb-6 whitespace-pre-line">
            {active.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex items-center md:justify-start gap-3">
            <button className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded font-semibold hover:bg-gray-200 transition text-sm sm:text-base">
              <Play size={16} fill="black" />
              {active.cta}
            </button>

            <button className="flex items-center gap-2 bg-gray-600 text-white px-3 py-2 rounded bord border-white/20 text-sm hover:bg-white/5 transition">
              <Plus size={20} />
              Watchlist
            </button>
          </div>
        </div>

        {/* (Optional) hide controls on smallest screens to match screenshot feel */}
        {/* If you want them back, uncomment and/or adjust breakpoints */}
      </section>

      {/* Continue Watching */}
      <section className="px-4 md:px-16 py-10 bg-black">
  <h2 className="text-xl text-left font-semibold mb-6">
    Continue Watching
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
    {/* Card 1 */}
    <div className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={Machinelearning}
        alt="Machine Learning Basics"
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <p className="text-sm font-semibold">Machine Learning Basics</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={DSA}
        alt="DSA Mastery"
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <p className="text-sm font-semibold">DSA Mastery</p>
      </div>
    </div>
  </div>
</section>


      {/* Playlists */}
      <div className="bg-black text-white px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl mt-8 font-semibold">Playlists</h2>
          <button
            onClick={() => navigate("/app/playlist")}
            className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
          >
            View All →
          </button>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPlaylistHover(true)}
          onMouseLeave={() => setIsPlaylistHover(false)}
        >
          <div className="relative">
            <div
              ref={playlistRef}
              onScroll={() => {
                const el = playlistRef.current;
                if (!el) return;
                setPlaylistScrolled(el.scrollLeft > 0);
              }}
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="flex space-x-4 h-96 z-50 overflow-x-auto overflow-y-visible no-scrollbar px-6 py-8"
            >
              {playlists.map((item) => (
                <PlaylistCard key={item.id} item={item} />
              ))}
            </div>

            {/* Left arrow */}
            {playlistScrolled && (
              <button
                onClick={() => scrollRefByAmt(playlistRef, "left")}
                className={`absolute left-4 top-34 cursor-pointer -translate-y-1/2 z-50 transition-opacity ${
                  isPlaylistHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                  <CircleArrowLeft className="w-10 h-10" />
                </div>
              </button>
            )}

            {/* Right arrow */}
            <button
              onClick={() => scrollRefByAmt(playlistRef, "right")}
              className={`absolute right-4 top-34 -translate-y-1/2 z-50 transition-opacity ${
                isPlaylistHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleArrowRight className="w-10 h-10" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Master Classes */}
      <div className="bg-black text-white px-6 ">
        <div className="flex  justify-between items-center mb-1">
          <h2 className="text-xl z-100 relative font-semibold">
            Master Classes
          </h2>
          <button
            onClick={() => navigate("/app/MasterClass")}
            className="text-sm z-100 relative text-gray-400 hover:text-white transition cursor-pointer"
          >
            View All &rarr;
          </button>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsMasterHover(true)}
          onMouseLeave={() => setIsMasterHover(false)}
        >
          <div>
            <div
              ref={masterRef}
              onScroll={() => {
                const el = masterRef.current;
                if (!el) return;
                setMasterScrolled(el.scrollLeft > 0);
              }}
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="flex space-x-4 h-96 overflow-x-auto overflow-y-visible no-scrollbar px-6 py-8"
            >
              {masterClasses.map((item) => (
                <MasterClassCard item={item} />
              ))}
            </div>

            {masterScrolled && (
              <button
                onClick={() => scrollRefByAmt(masterRef, "left")}
                className={`absolute left-4 top-32 -translate-y-1/2 z-50 transition-opacity ${
                  isMasterHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                  <CircleArrowLeft className="w-10 h-10" />
                </div>
              </button>
            )}

            <button
              onClick={() => scrollRefByAmt(masterRef, "right")}
              className={`absolute right-4 top-32 -translate-y-1/2 z-50 transition-opacity ${
                isMasterHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleArrowRight className="w-10 h-10" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div className="bg-black text-white px-4">
        <div className="flex justify-between items-center bg-black">
          <h2 className="text-xl z-100 relative mt-8 font-semibold">Blogs</h2>
          <button
            onClick={() => navigate("/app/Blogs")}
            className="text-sm z-100 relative text-gray-400 hover:text-white transition cursor-pointer"
          >
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
              onScroll={() => {
                const el = blogRef.current;
                if (!el) return;
                setBlogScrolled(el.scrollLeft > 0);
              }}
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="flex space-x-4 h-96 z-50 overflow-x-auto overflow-y-visible no-scrollbar px-6 py-8"
            >
              {blogs.map((item) => (
                <BlogsCard item={item} />
              ))}
            </div>

            {/* overlay arrows: show when playlist wrapper hovered (state-based) */}
            {blogScrolled && (
              <button
                onClick={() => scrollRefByAmt(blogRef, "left")}
                className={`absolute -left-1 top-32 -translate-y-1/2 z-50 transition-opacity ${
                  isBlogHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                  <CircleArrowLeft className="w-10 h-10" />
                </div>
              </button>
            )}

            <button
              onClick={() => scrollRefByAmt(blogRef, "right")}
              aria-label="scroll playlists right"
              className={`absolute -right-1 top-32 -translate-y-1/2 z-50 transition-opacity pointer-events-auto cursor-pointer bg-black h-4/4 rounded ${
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
    </div>
  );
}

export default LandingPage;
