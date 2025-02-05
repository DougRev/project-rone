"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminTopicPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Fetch topics from the API
  async function fetchTopics() {
    try {
      const res = await fetch("/api/forum/topics");
      const data = await res.json();
      if (data.success) {
        setTopics(data.topics);
      }
    } catch (error) {
      console.error("Failed to fetch topics", error);
    }
  }

  // Fetch topics on initial load
  useEffect(() => {
    fetchTopics();
  }, []);

  // Show a loading message while session is loading.
  if (status === "loading") {
    return <div className="p-4">Loading...</div>;
  }

  // Check admin access after hooks are called.
  if (!session || session.user.role !== "admin") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Access Required</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  // Create a new topic
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/forum/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Topic created successfully!");
        setTitle("");
        // Refresh topics list
        fetchTopics();
      } else {
        setMessage(data.error || "Failed to create topic.");
      }
    } catch (error) {
      console.error("Error creating topic:", error);
      setMessage("An error occurred while creating the topic.");
    }
  }

  // Start editing a topic
  function startEditing(topicId: string, currentTitle: string) {
    setEditingId(topicId);
    setEditTitle(currentTitle);
    setMessage("");
  }

  // Update a topic
  async function handleUpdate(topicId: string) {
    try {
      const res = await fetch(`/api/forum/topics/${topicId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Topic updated successfully!");
        setEditingId(null);
        fetchTopics();
      } else {
        setMessage(data.error || "Failed to update topic.");
      }
    } catch (error) {
      console.error("Error updating topic:", error);
      setMessage("An error occurred while updating the topic.");
    }
  }

  // Delete a topic
  async function handleDelete(topicId: string) {
    try {
      const res = await fetch(`/api/forum/topics/${topicId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Topic deleted successfully!");
        fetchTopics();
      } else {
        setMessage(data.error || "Failed to delete topic.");
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
      setMessage("An error occurred while deleting the topic.");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Topics</h1>

      {/* New Topic Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-1 font-medium">New Topic Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-black mb-2"
          required
        />
        <button type="submit" className="bg-win95blue text-white px-4 py-2">
          Create Topic
        </button>
      </form>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* List of Topics */}
      <ul className="space-y-4">
        {topics.map((topic: any) => (
          <li key={topic.id} className="border border-black p-3 shadow-md bg-win95paper">
            {editingId === topic.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border border-black mb-2"
                />
                <button
                  onClick={() => handleUpdate(topic.id)}
                  className="bg-win95blue text-white px-4 py-1 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-4 py-1"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="font-bold">{topic.title}</span>
                <div className="mt-2">
                  <button
                    onClick={() => startEditing(topic.id, topic.title)}
                    className="bg-win95blue text-white px-3 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(topic.id)}
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
