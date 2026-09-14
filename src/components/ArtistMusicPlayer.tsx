"use client";

import { useEffect, useRef, useState } from "react";

export default function ArtistMusicPlayer({
  videoId,
  title,
  artistName,
}: {
  videoId: string;
  title: string;
  artistName: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isLoaded) player.current?.focus();
  }, [isLoaded]);

  return (
    <div className="min-w-0">
      <div className="relative aspect-video w-full min-h-[200px] overflow-hidden rounded-xl bg-[#062653]">
        {isLoaded ? (
          <iframe
            ref={player}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
            title={`${title} — ${artistName}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#e8bd68]"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            aria-label={`Play music: ${title} by ${artistName}`}
            className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-white hover:bg-[#103b70] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#e8bd68]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8bd68] text-[#062653] group-hover:bg-[#f3cf89] transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-base font-semibold">Play music</span>
          </button>
        )}
      </div>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#062653] underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]"
      >
        Watch on YouTube
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
