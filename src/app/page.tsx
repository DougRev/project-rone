"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import Footer from "../app/components/Footer";
import Draggable from "react-draggable";
import Image from "next/image";

// Define a type for Side Quests.
interface SideQuest {
  title: string;
  videoId?: string;
  link?: string;
}

const icons = [
  { name: "Youtube", href: "/youtube", img: "/icons/my-computer.png" },
  { name: "Forum", href: "/forum", img: "/icons/folder.png" }, 
  { name: "Music", href: "/music", img: "/icons/music.png" },
  { name: "Parties & Games", href: "/parties-games", img: "/icons/party.png" },
  { name: "Competitions", href: "/competitions", img: "/icons/competition.png" }, 
  { name: "Side Quests", href: "", img: "/icons/list.png" }, 
];

const sideQuests: SideQuest[] = [
  { title: "✅ Try Every Crumble Cookie in NYC", videoId: "vWB5kL1gXwM" },
  { title: "Times Square Rap CD Review", link: "" },
  { title: "Warm Ones", link: "" },
];

function DesktopWindow({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  // Create a ref for the draggable window
  const nodeRef = useRef<HTMLDivElement>(null);

  // Detect screen width to disable dragging on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Draggable
      nodeRef={nodeRef as React.MutableRefObject<HTMLElement>}
      handle=".window-header"
      defaultPosition={{ x: 100, y: 100 }}
      disabled={isMobile} // Disable dragging on mobile
    >
      <div ref={nodeRef} className="absolute w-96 bg-win95gray border border-black shadow-lg z-50">
        {/* Window Header */}
        <div className="window-header bg-win95blue text-white flex items-center justify-between p-2 cursor-move">
          <span className="font-bold">{title}</span>
          <button 
            onClick={onClose} 
            className="bg-red-600 text-white px-2 py-0.5 border border-black"
          >
            X
          </button>
        </div>

        {/* Window Content */}
        <div className="p-4">{children}</div>
      </div>
    </Draggable>
  );
}


export default function Desktop() {
  const [showSideQuestsWindow, setShowSideQuestsWindow] = useState(false);
  const router = useRouter();

  const handleIconClick = (iconName: string, event: React.MouseEvent) => {
    if (iconName === "Side Quests") {
      event.preventDefault();
      setShowSideQuestsWindow((prev) => !prev);
    }
  };

  // Handles clicking a Side Quest
  const handleSideQuestClick = (quest: SideQuest) => {
    setShowSideQuestsWindow(false);
    if (quest.videoId) {
      router.push(`/youtube?video=${quest.videoId}`);
    } else if (quest.link) {
      router.push(quest.link);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div
        className="flex-grow bg-cover bg-center p-4 relative"
        style={{ backgroundImage: "url('/images/windows-95-bg.jpg')" }}
      >
        <h1 className="text-xl font-bold mb-4 text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.7)]">RoneDotCom</h1>
        <div className="grid grid-cols-4 gap-6">
          {icons.map((icon) =>
            icon.name === "Side Quests" ? (
              <div
                key={icon.name}
                onClick={(e) => handleIconClick(icon.name, e)}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="p-2 hover:shadow-xl transition-shadow">
                  <Image 
                    src={icon.img} 
                    alt={icon.name} 
                    width={64} 
                    height={64} 
                    className="w-16 h-16" 
                  />
                </div>
                <span className="mt-2 text-center text-sm text-white">{icon.name}</span>
              </div>
            ) : (
              <Link key={icon.name} href={icon.href} className="flex flex-col items-center">
                <div className="p-2 hover:shadow-xl transition-shadow">
                  <Image 
                    src={icon.img} 
                    alt={icon.name} 
                    width={64} 
                    height={64} 
                    className="w-16 h-16" 
                  />
                </div>
                <span className="mt-2 text-center text-sm text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.7)]">
                  {icon.name}
                </span>
              </Link>
            )
          )}
        </div>

        {/* Draggable Desktop Window (Side Quests) */}
        {showSideQuestsWindow && (
          <DesktopWindow title="Side Quests" onClose={() => setShowSideQuestsWindow(false)}>
            <ul className="space-y-2">
              {sideQuests.map((quest, index) => (
                <li
                  key={index}
                  className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                  onClick={() => handleSideQuestClick(quest)}
                >
                  {quest.title}
                </li>
              ))}
            </ul>
          </DesktopWindow>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
