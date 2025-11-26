import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCardH from "../../components/Cards/NewsCardH";
import NewsDetails from "./NewsDetails";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/news.json");
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching News:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (selectedNews) {
    return (
      <NewsDetails news={selectedNews} onBack={() => setSelectedNews(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20 pt-10">
      {/* Page Header */}
      <div className="flex flex-col items-center justify-center mb-10">
        <h2 className="font-playfair font-semibold text-[28px] leading-[100%] text-white tracking-normal">
          News
        </h2>
      </div>

      {/* News List Container */}
      <div className="px-4 md:px-0 max-w-[1110px] mx-auto space-y-6">
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading articles...
          </div>
        ) : (
          news.map((item) => (
            <NewsCardH
              key={item.id}
              data={item}
              onClick={() => setSelectedNews(item)}
            />
          ))
        )}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="text-sm text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1 font-poppins">
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default News;
