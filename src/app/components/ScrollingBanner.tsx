"use client";

export default function ScrollingBanner() {
  return (
    <div className="w-full overflow-hidden bg-yellow-300 py-2">
      <div className="whitespace-nowrap animate-scroll">
        <span className="text-lg font-bold px-4">
          RoneDotCom - Live Wednesdays at 9am on Youtube
        </span>
      </div>
    </div>
  );
}
