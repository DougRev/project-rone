// src/app/components/FolderPopup.tsx
"use client";

import Draggable from "react-draggable";

export default function FolderPopup({ onClose }: { onClose: () => void }) {
  return (
    <Draggable handle=".popup-header">
      <div className="absolute top-20 left-20 w-[400px] bg-win95gray border border-black shadow-lg">
        {/* Header */}
        <div className="popup-header flex items-center justify-between bg-win95blue text-white px-2 py-1 cursor-move">
          <span className="font-bold">Discussion Items</span>
          <button
            onClick={onClose}
            className="px-2 py-1 bg-red-600 text-white hover:bg-red-700"
          >
            X
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="/forum/1" className="text-blue-600 underline hover:text-blue-800">
                Discussion 1
              </a>
            </li>
            <li>
              <a href="/forum/2" className="text-blue-600 underline hover:text-blue-800">
                Discussion 2
              </a>
            </li>
            <li>
              <a href="/forum/3" className="text-blue-600 underline hover:text-blue-800">
                Discussion 3
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Draggable>
  );
}
