// src/app/components/VoteButtons.tsx
"use client";

import { useState } from "react";

interface VoteButtonsProps {
  postId: string;
  initialVote: number;   // +1 for upvote, -1 for downvote, 0 if no vote exists
  initialCount: number;  // The current vote count for the post
}

export default function VoteButtons({ postId, initialVote, initialCount }: VoteButtonsProps) {
  const [userVote, setUserVote] = useState(initialVote);
  const [voteCount, setVoteCount] = useState(initialCount);
  const [error, setError] = useState("");

  async function handleVote(value: number) {
    setError("");
    if (userVote === value) {
      setError("You have already voted this way.");
      return;
    }
    
    // Save previous state for rollback
    const previousVote = userVote;
    const previousCount = voteCount;
    
    // Optimistically update the UI
    const change = userVote === 0 ? value : value - userVote;
    setVoteCount(voteCount + change);
    setUserVote(value);
    
    try {
      const res = await fetch("/api/forum/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, value }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Vote failed");
      }
    } catch (err) {
      // Rollback on error
      setVoteCount(previousCount);
      setUserVote(previousVote);
      setError(err.message || "Vote failed");
    }
  }
  

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleVote(1)}
        className={`px-2 py-1 rounded text-white ${
          userVote === 1 ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        Upvote
      </button>
      <span className="font-bold">{voteCount}</span>
      <button
        onClick={() => handleVote(-1)}
        className={`px-2 py-1 rounded text-white ${
          userVote === -1 ? "bg-red-500" : "bg-gray-400"
        }`}
      >
        Downvote
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
