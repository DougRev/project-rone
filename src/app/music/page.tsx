"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define your tracks. For "Subscriber-Picked Distracks", include a "files" array with each file having a subscriber goal.
const tracks = [
  { title: "Speedrun Genre", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Battle Rapper in Office Dis", url: "" },
  { title: "Themed Karaoke Night", url: "" },
  {
    title: "Subscriber-Picked Distracks",
    files: [
      { title: "Distrack 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", goal: 25000 },
      { title: "Distrack 2", url: "example", goal: 50000 },
      { title: "Distrack 3", url: "example", goal: 75000 },
      { title: "The Dave Diss ", url: "example", goal: 100000 },
      { title: "On The Gaydar", url: "example", goal: 250000 },
    ],
  },
];

export default function Music() {
  const router = useRouter();

  // Set initial subscriber count to 19,900 for testing
  const [subscriberCount, setSubscriberCount] = useState<number>(19900);

  // The selected track is stored as the track object (it may have a "url" or "files" property)
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  // For multi-file tracks, track the currently selected file (if applicable)
  const [selectedFile, setSelectedFile] = useState(
    tracks[0].files ? tracks[0].files[0] : null
  );

  // (Subscriber fetching code is commented out for testing)
  // useEffect(() => {
  //   async function fetchSubscribers() {
  //     try {
  //       const res = await fetch("/api/youtube/channel-stats");
  //       const data = await res.json();
  //       if (data.success) {
  //         setSubscriberCount(parseInt(data.subscriberCount, 10));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching subscribers:", error);
  //     }
  //   }
  //   fetchSubscribers();
  // }, []);

  // Handler for selecting a track from the sidebar.
  function handleSelectTrack(track: typeof tracks[number]) {
    setSelectedTrack(track);
    // If the track contains multiple files, default to the first one.
    if (track.files) {
      setSelectedFile(track.files[0]);
    } else {
      setSelectedFile(null);
    }
  }

  // Determine if valid media is available:
  // For multi-file tracks, check the selected file.
  // For single-track selections, check the track url.
  const mediaAvailable = selectedTrack.files
    ? selectedFile && subscriberCount >= selectedFile.goal && selectedFile.url && selectedFile.url !== "example"
    : selectedTrack.url && selectedTrack.url !== "example";

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
        🎵 My Music
        <div className="ml-auto text-sm">
          Subscribers: {subscriberCount.toLocaleString()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow p-4">
        {/* Sidebar with Track Library */}
        <div className="w-1/4 bg-win95gray border border-black p-3">
          <h2 className="text-md font-bold mb-2">🎼 Track Library</h2>
          <ul className="space-y-2">
            {tracks.map((track, index) => (
              <li
                key={index}
                onClick={() => handleSelectTrack(track)}
                className="p-2 bg-white border border-black cursor-pointer hover:bg-gray-200"
              >
                {track.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Media Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Render the "Now Playing" header only if valid media is available */}
          {mediaAvailable && (
            <h2 className="text-xl font-bold mb-2">Now Playing</h2>
          )}
          {/* If the selected track has a "files" array, render a list of distracks */}
          {selectedTrack.files ? (
            <div className="w-full max-w-md">
              <ul className="space-y-2 mb-4">
                {selectedTrack.files.map((file, index) => {
                  const unlocked = subscriberCount >= file.goal;
                  return (
                    <li
                      key={index}
                      onClick={() => unlocked && setSelectedFile(file)}
                      className={`p-2 border border-black cursor-pointer ${
                        selectedFile?.title === file.title
                          ? "bg-win95blue text-white"
                          : unlocked
                          ? "bg-white hover:bg-gray-200"
                          : "bg-gray-300"
                      }`}
                    >
                      <div className="font-bold">{file.title}</div>
                      <div className="text-xs">
                        {unlocked ? (
                          file.url && file.url !== "example" ? (
                            `Unlocked (Goal: ${file.goal.toLocaleString()} subs)`
                          ) : (
                            `Coming Soon (Goal: ${file.goal.toLocaleString()} subs)`
                          )
                        ) : (
                          `Locked until ${file.goal.toLocaleString()} subs`
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              {selectedFile ? (
                subscriberCount >= selectedFile.goal ? (
                  selectedFile.url && selectedFile.url !== "example" ? (
                    <audio controls className="w-full">
                      <source src={selectedFile.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <p className="text-xl font-bold">Coming Soon</p>
                  )
                ) : (
                  <p className="text-xl font-bold">
                    Track locked until {selectedFile.goal.toLocaleString()} subscribers
                  </p>
                )
              ) : (
                <p className="text-xl font-bold">Select a track</p>
              )}
            </div>
          ) : selectedTrack.url && selectedTrack.url !== "example" ? (
            <audio controls className="w-full max-w-md">
              <source src={selectedTrack.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="text-xl font-bold">Coming Soon</p>
          )}
        </div>
      </div>
    </div>
  );
}
