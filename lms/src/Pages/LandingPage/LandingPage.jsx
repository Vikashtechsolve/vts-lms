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
import PlaylistCard from "../../components/Cards/PlaylistCard.jsx";
import MasterClassCard from "../../components/Cards/MasterClassCard.jsx";
import BlogsCard from "../../components/Cards/BlogsCard.jsx";

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

  const goPrev = () =>
    setCurrent((s) => (s - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((s) => (s + 1) % slides.length);

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

          <p className="text-gray-300 mb-6 text-left whitespace-pre-line">
            {active.subtitle}
          </p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              <Play size={18} />
              {active.cta}
            </button>

            <SquarePlus
              className="cursor-pointer hover:text-gray-300 transition"
              size={46}
            />
          </div>
        </div>

        <div className="absolute right-8 bottom-8 z-20 flex items-center gap-3">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="bg-black/40 text-white p-2 rounded-md hover:bg-black/60 transition"
          >
            ◀
          </button>

          <div className="flex gap-2 items-center px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === current ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next slide"
            className="bg-black/40 text-white p-2 rounded-md hover:bg-black/60 transition"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Continue Watching */}
      <section className="px-16 py-10 bg-black">
        <h2 className="text-xl text-left font-semibold mb-6">
          Continue Watching
        </h2>
        <div className="flex flex-wrap gap-6">
          <div className="w-60 bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
            <img
              src={Machinelearning}
              alt="Machine Learning Basics"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <p className="text-sm font-semibold">Machine Learning Basics</p>
            </div>
          </div>

          <div className="w-60 bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
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
        <div className="flex justify-between items-center bg-black mb-12">
          <h2 className="text-xl mt-8 font-semibold">Playlists</h2>
          <button
            onClick={() => navigate("/Playlist")}
            className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
          >
            View All &rarr;
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
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="flex space-x-4  h-96 z-50 overflow-x-auto no-scrollbar px-1 py-8"
            >
              {playlists.map((item) => (
                <PlaylistCard item={item} />
              ))}
            </div>

            {/* overlay arrows: show when playlist wrapper hovered (state-based) */}
            <button
              onClick={() => scrollRefByAmt(playlistRef, "left")}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 transition-opacity pointer-events-auto ${
                isPlaylistHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleChevronLeft className="w-10 h-10" />
              </div>
            </button>

            <button
              onClick={() => scrollRefByAmt(playlistRef, "right")}
              aria-label="scroll playlists right"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 transition-opacity pointer-events-auto ${
                isPlaylistHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleChevronRight className="w-10 h-10" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Master Classes */}
      <div className="bg-black text-white px-6">
        <div className="flex  justify-between items-center mb-12">
          <h2 className="text-xl font-semibold">Master Classes</h2>
          <button className="text-sm text-gray-400 hover:text-white transition cursor-pointer">
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
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="flex space-x-4 h-96 overflow-x-auto no-scrollbar px-1 py-8 "
            >
              {masterClasses.map((item) => (
                <MasterClassCard item={item} />
              ))}
            </div>

            <button
              onClick={() => scrollRefByAmt(masterRef, "left")}
              aria-label="scroll master left"
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 transition-opacity pointer-events-auto ${
                isMasterHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleArrowLeft className="w-10 h-10" />
              </div>
            </button>

            <button
              onClick={() => scrollRefByAmt(masterRef, "right")}
              aria-label="scroll master right"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 transition-opacity pointer-events-auto ${
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
      <div className="bg-black text-white px-6">
        <div className="flex justify-between items-center bg-black mb-12">
          <h2 className="text-xl mt-8 font-semibold">Blogs</h2>
          <button
            onClick={() => navigate("/Blogs")}
            className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
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
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="flex space-x-4  h-96 z-50 overflow-x-auto no-scrollbar px-1 py-8"
            >
              {blogs.map((item) => (
                <BlogsCard item={item} />
              ))}
            </div>

            {/* overlay arrows: show when playlist wrapper hovered (state-based) */}
            <button
              onClick={() => scrollRefByAmt(blogRef, "left")}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 transition-opacity pointer-events-auto ${
                isBlogHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleChevronLeft className="w-10 h-10" />
              </div>
            </button>

            <button
              onClick={() => scrollRefByAmt(blogRef, "right")}
              aria-label="scroll playlists right"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 transition-opacity pointer-events-auto ${
                isBlogHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow">
                <CircleChevronRight className="w-10 h-10" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
