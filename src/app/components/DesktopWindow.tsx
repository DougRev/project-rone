// src/app/components/DesktopWindow.tsx
"use client";

import Draggable from "react-draggable";
import { useState } from "react";

interface DesktopWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function DesktopWindow({ title, onClose, children }: DesktopWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <Draggable handle=".window-header" defaultPosition={{ x: 100, y: 100 }}>
      <div
        className={`absolute w-96 h-64 border border-black bg-win95gray shadow-lg ${
          isMinimized ? "hidden" : ""
        }`}
      >
        {/* Window Header */}
        <div className="window-header bg-win95blue text-white flex items-center justify-between p-2 cursor-move">
          <span>{title}</span>
          <div>
            <button
              onClick={() => setIsMinimized(true)}
              className="bg-gray-700 text-white px-2 py-0.5 border border-black mr-1"
            >
              _
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-2 py-0.5 border border-black"
            >
              X
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-2 overflow-auto h-full">{children}</div>
      </div>
    </Draggable>
  );
}
