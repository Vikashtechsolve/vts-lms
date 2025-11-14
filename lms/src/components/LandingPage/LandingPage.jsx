import React, { useEffect, useRef, useState } from "react";
import { Play, SquarePlus } from "lucide-react";
import LandingPageImageg from "../../assets/pic1.jpg";
import Machinelearning from '../../assets/MachineLearning.jpg';
import DSA from "../../assets/DSA.png";
import pic2 from '../../assets/pic2.png'
import pic3 from '../../assets/pic3.png'
import Playlist from "./Playlist";
import MasterClass from "../MasterClass/MasterClass";
import Blogs from "../../Pages/Blogs";

const INTERVAL_MS = 3500; // 3.5 seconds, change as needed

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
    subtitle: "Join live online session and upgrade your Skills with top Mentors in every field",
    cta: "Watch Now",
  },
  {
    id: 3,
    image: pic3,
    titleLines: ["CRACK THE CODE TO", "YOUR DREAM", "CAREER"],
    subtitle: "Boost your programming skills with interactive coding sessions and Real-Time Projects ",
    cta: "Watch Now",
  },
];

function LandingPage() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // start / restart interval depending on isPaused
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

  // manual nav helpers (optional)
  const goPrev = () => setCurrent((s) => (s - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((s) => (s + 1) % slides.length);

  const active = slides[current];

  return (
    <div className="bg-black text-white min-h-screen w-full overflow-x-hidden">
      {/* Hero Section (carousel) */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative flex items-center px-16 py-24 h-[75vh] w-full"
        aria-roledescription="carousel"
      >
        {/* Background slides (absolute images with fade) */}
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

          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content (on top) */}
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

        {/* Optional small nav (dots + prev/next) */}
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
        <h2 className="text-xl text-left font-semibold mb-6">Continue Watching</h2>
        <div className="flex flex-wrap gap-6">
          {/* Card 1 */}
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

          {/* Card 2 */}
          <div className="w-60 bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
            <img src={DSA} alt="DSA Mastery" className="w-full h-32 object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold">DSA Mastery</p>
            </div>
          </div>
        </div>
      </section>
      <Playlist/>
      <MasterClass/>
      <Blogs/>
    </div>
  );
}

export default LandingPage;
