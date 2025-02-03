// src/app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full h-10 bg-win95gray border-t border-black flex items-center justify-between px-2">
      {/* Start Button */}
      <button className="flex items-center px-2 py-1 bg-win95blue text-white border border-black shadow-sm">
        Start
      </button>

      {/* Social Icons Section */}
      <div className="flex items-center">
        {/* Inset Box for Social Icons */}
        <div className="flex items-center space-x-1 bg-win95gray border border-black px-5 py-1 shadow-inner">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/instagram.png"
              alt="Instagram"
              className="w-4 h-4"
            />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/tiktok.png"
              alt="TikTok"
              className="w-4 h-4"
            />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/x.png"
              alt="X (formerly Twitter)"
              className="w-4 h-4"
            />
          </a>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/other.png"
              alt="Other Social"
              className="w-4 h-4"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
