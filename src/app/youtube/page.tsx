"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";

const videos = [
  { title: "Welcome to RoneDotCom", url: "https://www.youtube.com/embed/oJ9n_VWCMW0" },
  { title: "I Tried Every Single Crumbl Cookie in NYC", url: "https://www.youtube.com/embed/vWB5kL1gXwM" },
];

export default function MyComputerPage() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("video"); // ✅ Get video ID from URL

  // ✅ Auto-select video based on videoId
  const defaultVideo = videos.find((v) => v.url.includes(videoId))?.url || videos[0].url;
  const [selectedVideo, setSelectedVideo] = useState(defaultVideo);
  const router = useRouter(); // ✅ Next.js router for navigation

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
      <div className="bg-win95blue text-white p-3 font-bold text-lg border-b border-black">
      <button 
          onClick={() => router.push("/")} 
          className="mr-3 px-2 py-1 hover:bg-gray-300"
        >
          ←
        </button>
        📺 My Computer - YouTube Content
      </div>

      <div className="flex flex-grow p-4">
        <div className="w-1/4 bg-win95gray border border-black p-3">
          <h2 className="text-md font-bold mb-2">📂 Video Library</h2>
          <ul className="space-y-2">
            {videos.map((video, index) => (
              <li key={index} className="p-2 bg-white border border-black cursor-pointer hover:bg-gray-200" onClick={() => setSelectedVideo(video.url)}>
                {video.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-2">Now Playing</h2>
          <iframe width="640" height="360" src={selectedVideo} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}
