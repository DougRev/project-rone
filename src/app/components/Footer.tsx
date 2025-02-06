// src/app/components/Footer.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import StartMenu from "./StartMenu";
import ProfileModal from "./ProfileModal";
import AuthModal from "./AuthModal";

export default function Footer() {
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleButtonClick = () => {
    if (session) {
      setShowStartMenu((prev) => !prev);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleProfile = () => {
    setShowProfileModal(true);
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full h-12 bg-win95gray border-t border-black flex items-center justify-between px-4 z-50">
        {/* Start/Login Button on the left */}
        <button
          onClick={handleButtonClick}
          className="flex items-center px-2 py-1 bg-win95blue text-white border border-black shadow-sm"
        >
          {session && (
            <Image
              src="/icons/ronedotcom-logo.jpg"
              alt="Logo"
              width={24}
              height={24}
              className="w-6 h-6 mr-2"
            />
          )}
          {session ? "Start" : "Login"}
        </button>

        {/* "System Tray" area on the right */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-black hidden sm:inline-block border border-black py-1 px-2">
            Network:
          </span>
          <a
            href="https://instagram.com/ronedotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://www.tiktok.com/@_rone"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src="/icons/tiktok.png"
              alt="TikTok"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://x.com/rone"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src="/icons/x.png"
              alt="X"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </a>
        </div>
      </footer>

      {/* Conditionally render modals */}
      {!session && showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {session && showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} onProfile={handleProfile} />}
      {session && showProfileModal && (
        <ProfileModal
          currentName={session.user.name}
          currentEmail={session.user.email}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </>
  );
}
