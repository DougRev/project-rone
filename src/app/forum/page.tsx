"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Topic {
  id: string;
  title: string;
  // add additional fields if needed
}

export default function ForumPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchTopics() {
      const res = await fetch("/api/forum/topics");
      const data = await res.json();
      if (data.success) {
        setTopics(data.topics);
      }
    }
    fetchTopics();
  }, []);

  return (
    <div className="p-4 bg-win95background min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-win95text drop-shadow-[1px_1px_1px_rgba(0,0,0,0.7)]">
        Quest Ideas and Other Shenanigans
      </h1>
      <ul className="space-y-3">
        {topics.map((topic) => (
          <li key={topic.id} className="bg-white border border-black p-3 shadow-md">
            <button
              onClick={() => router.push(`/forum/topic/${topic.id}`)}
              className="w-full text-left text-win95blue font-bold underline hover:text-win95blue-dark"
            >
              {topic.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
