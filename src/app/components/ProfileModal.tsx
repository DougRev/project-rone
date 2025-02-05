"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

interface ProfileModalProps {
  currentName?: string | null;
  currentEmail?: string | null;
  onClose: () => void;
}

export default function ProfileModal({ currentName, currentEmail, onClose }: ProfileModalProps) {
  const { data: session, update } = useSession();
  const [name, setName] = useState(currentName || "");
  const [message, setMessage] = useState("");

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("Username updated successfully!");

      // 🔄 Manually refresh session from the server
      const updatedSession = await fetch("/api/auth/session").then((res) => res.json());

      // Update the session with new data
      await update({
        user: {
          ...session?.user,
          name: updatedSession?.user?.name, // Force session update with new name
        },
      });
    } else {
      setMessage(data.error || "Failed to update username.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-win95gray border border-black p-4 w-80 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Profile</h2>
        <p className="mb-1"><strong>Email:</strong> {currentEmail}</p>
        <form onSubmit={handleUpdate} className="mb-4">
          <label className="block mb-1">
            <strong>Username:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 border border-black mt-1"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-win95blue text-white py-1 mt-2 border border-black"
          >
            Update Username
          </button>
        </form>
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
        <div className="flex justify-between">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-2 py-1 border border-black"
          >
            Logout
          </button>
          <button onClick={onClose} className="text-sm underline self-center">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
