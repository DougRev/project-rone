"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface NewPostFormProps {
  topicId: string;
  onPostCreated: () => void;
}

export default function NewPostForm({ topicId, onPostCreated }: NewPostFormProps) {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!session?.user) {
      setError("You must be logged in to create a post.");
      return;
    }

    const res = await fetch("/api/forum/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        topicId,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setSuccess("Post created successfully!");
      setTitle("");
      setContent("");
      onPostCreated();
      // Optionally hide the form after successful submission:
      setShowForm(false);
    } else {
      setError(data.error || "Failed to create post.");
    }
  }

  return (
    <div className="mb-4">
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="bg-win95blue text-white px-4 py-2">
          New Post
        </button>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Create a New Post</h2>
            <button onClick={() => setShowForm(false)} className="text-sm underline">
              Close
            </button>
          </div>
          {!session?.user ? (
            <p>You must be logged in to create a post.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border p-1"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border p-1"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button type="submit" className="bg-win95blue text-white px-4 py-2">
                Create Post
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
