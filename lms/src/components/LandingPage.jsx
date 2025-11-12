import React from "react";
import { Play, SquarePlus } from "lucide-react";
import LandingPageImageg from "../assets/492f35b752d6c162e0ef744044e865dfd5fc288d.jpg";
import Machinelearning from "../assets/MachineLearning.jpg";
import DSA from "../assets/DSA.png";

function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen w-full">
      {/* ✅ Hero Section with Background Image */}
      <section
        className="relative flex flex-col justify-center px-16 py-24 bg-[length:100%] bg-center bg-no-repeat h-[75vh] w-full"
        style={{
          backgroundImage: `url(${LandingPageImageg})`, // 👈 path to your image
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Text */}
        <div className="relative max-w-lg z-10">
          <h1 className="text-5xl text-left font-extrabold leading-tight tracking-tight mb-4">
            MASTER THE ART <br /> FROM OUR <br /> EXPERTS
          </h1>
          <p className="text-gray-300 mb-6 text-left">
            Dive deep into exclusive masterclasses <br /> designed by our
            Industry Leaders and <br /> Professionals
          </p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              <Play size={18} fill="absolute" />
              Watch Now
            </button>
            <SquarePlus 
              className=" cursor-pointer hover:text-gray-300 transitio"
              size={46} fill="absolute"
            />
          </div>
        </div>
      </section>

      {/* Continue Watching */}
      <section className="px-16 py-10 bg-black">
        <h2 className="text-xl font-semibold mb-6">Continue Watching</h2>
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
    </div>
  );
}

export default LandingPage;
