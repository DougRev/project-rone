"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "../components/Footer";

const videos = [
  { title: "Welcome to RoneDotCom", url: "https://www.youtube.com/embed/oJ9n_VWCMW0" },
  { title: "I Tried Every Single Crumbl Cookie in NYC", url: "https://www.youtube.com/embed/vWB5kL1gXwM" },
  { title: "Live from New Orleans", url: "https://www.youtube.com/embed/5dpkLOobJAk?si=neyFRGJLNINsDVg-" },

];

function YouTubeContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("video"); // Get video ID from URL

  // Auto-select video based on videoId (if present)
  const defaultVideo = videoId 
    ? videos.find((v) => v.url.includes(videoId))?.url || videos[0].url
    : videos[0].url;

  const [selectedVideo, setSelectedVideo] = useState(defaultVideo);
  const router = useRouter();

  useEffect(() => {
    if (videoId) {
      const matchedVideo = videos.find((v) => v.url.includes(videoId));
      if (matchedVideo) {
        setSelectedVideo(matchedVideo.url);
      }
    }
  }, [videoId]);

  return (
    <div className="min-h-screen bg-win95background flex flex-col">
      <div className="bg-win95blue text-white p-3 font-bold text-lg border-b border-black flex items-center">
        <button 
          onClick={() => router.push("/")} 
          className="mr-3 px-2 py-1 hover:bg-gray-300"
        >
          ←
        </button>
        📺 YouTube Content
      </div>

      {/* Responsive container: stacks vertically on small screens, row on md and up */}
      <div className="flex flex-col md:flex-row flex-grow p-4">
        {/* Video Library */}
        <div className="w-full md:w-1/4 bg-win95gray border border-black p-3 mb-4 md:mb-0 md:mr-4">
          <h2 className="text-md font-bold mb-2">📂 Video Library</h2>
          <ul className="space-y-2">
            {videos.map((video, index) => (
              <li 
                key={index} 
                className="p-2 bg-white border border-black cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedVideo(video.url)}
              >
                {video.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Video Player */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-2">Now Playing</h2>
          <div className="w-full relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src={selectedVideo} 
              title="YouTube video player" 
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function YoutubePage() {
  return (
    <Suspense fallback={<div>Loading YouTube content...</div>}>
      <YouTubeContent />
    </Suspense>
  );
}
