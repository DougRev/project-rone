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
      // Toggle the Start menu when logged in.
      setShowStartMenu((prev) => !prev);
    } else {
      // Show login modal when not authenticated.
      setShowAuthModal(true);
    }
  };

  // Function passed to StartMenu to open the Profile modal
  const handleProfile = () => {
    setShowProfileModal(true);
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full h-10 bg-win95gray border-t border-black flex items-center justify-between px-2 z-50">
        {/* Start/Login Button on the left */}
        <button
          onClick={handleButtonClick}
          className="flex items-center px-2 py-1 bg-win95blue text-white border border-black shadow-sm"
        >
          {session && (
            <Image
              src="/icons/ronedotcom-logo.jpg"
              alt="Logo"
              width={16}
              height={16}
              className="w-4 h-4 mr-2"
            />
          )}
          {session ? "Start" : "Login"}
        </button>

        {/* "System Tray" area on the right */}
        <div className="flex border items-center space-x-2">
          {/* Optionally add a label to mimic network settings */}
          <span className="text-xs text-black hidden border-black py-2 px-2 sm:inline-block">
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
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </a>
          <a
            href="https://tiktok.com/ronedotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src="/icons/tiktok.png"
              alt="TikTok"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </a>
          <a
            href="https://x.com/ronedotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src="/icons/x.png"
              alt="X"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </a>
        </div>
      </footer>

      {/* Conditionally render modals */}
      {!session && showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {session && showStartMenu && (
        <StartMenu onClose={() => setShowStartMenu(false)} onProfile={handleProfile} />
      )}

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
