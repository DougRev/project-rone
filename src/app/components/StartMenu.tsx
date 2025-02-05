// src/app/components/StartMenu.tsx
"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

interface StartMenuProps {
  onClose: () => void;
  onProfile: () => void;
}

export default function StartMenu({ onClose, onProfile }: StartMenuProps) {
  const handleProfile = () => {
    onProfile();
    onClose();
  };

  const handleLogout = () => {
    signOut();
    onClose();
  };

  return (
    <div className="absolute bottom-12 left-2 bg-win95gray border border-black shadow-md z-50 min-h-[350px] p-4">
      <ul className="min-w-[200px]">
        {/* Home Button */}
        <li className="px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer">
          <Link href="/" onClick={onClose}>
            🏠 Home
          </Link>
        </li>

        {/* Profile */}
        <li
          onClick={handleProfile}
          className="px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer"
        >
          🧑 Profile
        </li>

        {/* Programs with dropdown */}
        <li className="relative group px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer">
          📂 Programs
          <ul className="absolute left-full top-0 hidden group-hover:block bg-win95gray border border-black shadow-md">
            <li className="px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer">
              <Link href="/youtube" onClick={onClose}>
                My Computer (Videos)
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer">
              <Link href="/parties-games" onClick={onClose}>
                Parties & Games
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer">
              <Link href="/music" onClick={onClose}>
                Music
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer">
              <Link href="/forum" onClick={onClose}>
                Forum
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer">
              <Link href="/competitions" onClick={onClose}>
                Competitions
              </Link>
            </li>
          </ul>
        </li>

        {/* Logout */}
        <li
          onClick={handleLogout}
          className="px-4 py-2 hover:bg-win95blue hover:text-white cursor-pointer"
        >
          🚪 Logout
        </li>
      </ul>
    </div>
  );
}
