// src/app/page.tsx
import Link from "next/link";
import Footer from "../app/components/Footer";

const icons = [
  {
    name: "My Computer",
    href: "/my-computer",
    img: "/icons/my-computer.png",
  },
  {
    name: "Barstool Things",
    href: "/barstool-things",
    img: "/icons/barstool.png",
  },
  {
    name: "Trash Bin",
    href: "/trash-bin",
    img: "/icons/trash-bin-full.png",
  },
  {
    name: "Music",
    href: "/placeholder",
    img: "/icons/music.png",
  },
  {
    name: "Folder",
    href: "/folder",
    img: "/icons/folder.png",
  },

];

export default function Desktop() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div
        className="flex-grow bg-cover bg-center p-4"
        style={{ backgroundImage: "url('/images/windows-95-bg.jpg')" }}
      >
        <h1 className="text-xl font-bold mb-4 text-white">My Computer</h1>
        <div className="grid grid-cols-4 gap-6">
          {icons.map((icon) => (
            <Link
              key={icon.name}
              href={icon.href}
              className="flex flex-col items-center"
            >
              <div className="p-2 hover:shadow-xl transition-shadow">
                <img src={icon.img} alt={icon.name} className="w-16 h-16" />
              </div>
              <span className="mt-2 text-center text-sm text-white">
                {icon.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
