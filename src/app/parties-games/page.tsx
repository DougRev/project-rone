"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define your parties & games videos; for now, URLs are empty.
const partiesGames = [
  { title: "Warm Ones", url: "" },
  { title: "Secret Portnoy", url: "" },
  { title: "Jack Box", url: "" },
  { title: "King of the Hill", url: "" },
  { title: "Trolly Problem Party", url: "" },
  { title: "Spyfall", url: "" },
];

export default function PartiesGames() {
  const router = useRouter();
  // Store the selected video; default to the first video.
  const [selectedVideo, setSelectedVideo] = useState(partiesGames[0]);

  // Handler for selecting a video from the sidebar.
  function handleSelect(video: typeof partiesGames[number]) {
    setSelectedVideo(video);
  }

  return (
    <div className="min-h-screen bg-win95background flex flex-col">
      {/* Header */}
      <div className="bg-win95blue text-white p-3 font-bold text-lg border-b border-black flex items-center">
        <button
          onClick={() => router.push("/")}
          className="mr-3 px-2 py-1 hover:bg-gray-300"
        >
          ←
        </button>
        🎉 Parties & Games
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow p-4">
        {/* Sidebar with Video Library */}
        <div className="w-full md:w-1/4 bg-win95gray border border-black p-3 mb-4 md:mb-0 md:mr-4">
          <h2 className="text-md font-bold mb-2">🎬 Video Library</h2>
          <ul className="space-y-2">
            {partiesGames.map((video, index) => (
              <li
                key={index}
                onClick={() => handleSelect(video)}
                className="p-2 bg-white border border-black cursor-pointer hover:bg-gray-200"
              >
                {video.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Media Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {selectedVideo.url ? (
            <>
              <h2 className="text-xl font-bold mb-2">Now Playing</h2>
              <div className="w-full max-w-md relative pb-[56.25%]">
                {/* The container maintains a 16:9 aspect ratio */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={selectedVideo.url}
                  title="Video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          ) : (
            <p className="text-xl font-bold">Coming Soon</p>
          )}
        </div>
      </div>
    </div>
  );
}
