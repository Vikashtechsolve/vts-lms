// src/components/playlistDetailsTabs/PPT/PPT.jsx
import React, { useState, useEffect } from "react";
import {
  FaShareSquare,
  FaDownload,
  FaPencilAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/**
 * PPT component is defensive:
 * - Accepts either `data` prop or `pptUrl` prop.
 * - `pptUrl` can be an object (full PPT metadata) or a string (single slide URL or file path).
 * - Normalizes input into { topic, slides: [], downloadUrl }
 */
const PPT = ({ data, pptUrl }) => {
  // Normalize incoming props into a single `ppt` object
  const normalize = () => {
    // Prefer explicit data prop
    if (data && typeof data === "object") {
      return {
        topic: data.topic ?? data.title ?? "Presentation",
        slides: Array.isArray(data.slides) ? data.slides : data.slides ? [data.slides] : [],
        downloadUrl: data.downloadUrl ?? data.pdfUrl ?? data.embedUrl ?? null,
      };
    }

    // If pptUrl is provided
    if (pptUrl) {
      // If it's an object, assume same shape as data
      if (typeof pptUrl === "object") {
        return {
          topic: pptUrl.topic ?? pptUrl.title ?? "Presentation",
          slides: Array.isArray(pptUrl.slides) ? pptUrl.slides : pptUrl.slides ? [pptUrl.slides] : [],
          downloadUrl: pptUrl.downloadUrl ?? pptUrl.pdfUrl ?? pptUrl.embedUrl ?? null,
        };
      }

      // If it's a string, heuristics:
      // - If it's a .pptx/.pdf/.ppt link, expose as downloadUrl
      // - Else treat as a single slide image/URL
      if (typeof pptUrl === "string") {
        const lower = pptUrl.toLowerCase();
        if (lower.endsWith(".pptx") || lower.endsWith(".ppt") || lower.endsWith(".pdf")) {
          return { topic: "Presentation", slides: [], downloadUrl: pptUrl };
        }
        // otherwise treat as single slide image / embed url
        return { topic: "Presentation", slides: [pptUrl], downloadUrl: null };
      }
    }

    // fallback empty
    return { topic: "Presentation", slides: [], downloadUrl: null };
  };

  const [ppt, setPpt] = useState(() => normalize());
  const [currentPage, setCurrentPage] = useState(0);

  // If props change, update normalized PPT
  useEffect(() => {
    setPpt(normalize());
    setCurrentPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, pptUrl]);

  const { slides, topic, downloadUrl } = ppt;
  const totalSlides = slides?.length ?? 0;

  // If there are no slides but there's a downloadUrl (pptx/pdf), still show a message + download
  if ((!slides || slides.length === 0) && !downloadUrl) {
    return <div className="text-gray-400">No presentation slides available.</div>;
  }

  // Navigation functions
  const nextSlide = () => {
    setCurrentPage((prev) => (totalSlides ? (prev + 1) % totalSlides : 0));
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (totalSlides ? (prev - 1 + totalSlides) % totalSlides : 0));
  };

  return (
    <div className="text-gray-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{topic ?? "Presentation"}</h2>
          <p className="text-xs p-2 text-left text-gray-400">Released on: 10 November, 2025</p>
        </div>
        <div className="flex space-x-3">
          <button className="text-gray-400 hover:text-white" aria-label="Share">
            <FaShareSquare size={18} />
          </button>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="text-gray-400 hover:text-white"
              aria-label="Download PPT"
            >
              <FaDownload size={18} />
            </a>
          )}
          <button className="text-gray-400 hover:text-white" aria-label="Edit">
            <FaPencilAlt size={18} />
          </button>
        </div>
      </div>

      {/* <p className="text-sm text-left text-gray-400 mb-2">
       PPT Topic: This presentation covers essential DSA topics. Use the controls below to navigate the slides.
      </p> */}

      {/* <hr className="border-gray-700 my-6" /> */}

      {/* Content */}
      <div>
        {/* Topic */}
        <p className="text-xl text-left  font-semibold text-gray-200 mb-6">
          <span className="font-medium text-gray-400">PPT Topic :</span> {topic ?? "Presentation"}
        </p>

        {/* If we have slide images, show viewer */}
        {totalSlides > 0 ? (
          <div className="relative bg-zinc-900 p-4 rounded-lg">
            <div className="bg-white rounded-md shadow-lg overflow-hidden">
              {/* Slide as image or iframe if embed URL looks like iframe source */}
              {(() => {
                const src = slides[currentPage];
                // If src is a YouTube embed or iframe-able link, show in iframe
                const isIframe = typeof src === "string" && (src.includes("youtube.com/embed") || src.includes("docs.google.com") || src.includes("slideshare.net") || src.endsWith(".html"));
                if (isIframe) {
                  return (
                    <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
                      <iframe
                        src={src}
                        title={`Slide ${currentPage + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  );
                }
                // fallback: treat as an image
                return (
                  <img
                    src={src}
                    alt={`PPT Slide ${currentPage + 1}`}
                    className="w-full h-auto aspect-video object-contain bg-black"
                  />
                );
              })()}
            </div>

            {/* Pagination Controls */}
            <div className="absolute inset-x-0 bottom-10 flex justify-center items-center space-x-4">
              <button
                onClick={prevSlide}
                className="bg-gray-800 bg-opacity-70 p-2 rounded-full text-white hover:bg-opacity-100 transition-opacity"
                aria-label="Previous slide"
              >
                <FaChevronLeft size={20} />
              </button>

              <span className="bg-gray-800 bg-opacity-70 text-white p-2 px-4 rounded-full text-lg">
                {currentPage + 1} / {totalSlides}
              </span>

              <button
                onClick={nextSlide}
                className="bg-gray-800 bg-opacity-70 p-2 rounded-full text-white hover:bg-opacity-100 transition-opacity"
                aria-label="Next slide"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          // No slide images but download available
          <div className="p-6 rounded-lg bg-gray-900">
            <p className="text-gray-300">This presentation is available to download.</p>
            {downloadUrl && (
              <div className="flex justify-end mt-6">
                <a
                  href={downloadUrl}
                  download
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg"
                >
                  <FaDownload className="mr-2" />
                  Download PPT
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PPT;
