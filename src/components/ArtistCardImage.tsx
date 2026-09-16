import Image from "next/image";
import type { Artist } from "@/data/artists";

export default function ArtistCardImage({ artist, sizes }: { artist: Artist; sizes: string }) {
  // In a 3:4 card, a top-aligned contained photo ends at this percentage.
  const photoBottom = Math.min(100, (75 * artist.imageHeight) / artist.imageWidth);
  const mask = artist.imageFit === "contain" && photoBottom < 100
    ? `linear-gradient(to bottom, black ${photoBottom - 10}%, transparent ${photoBottom}%)`
    : undefined;

  return (
    <div className="absolute inset-0" style={{ backgroundColor: artist.cardBackground }}>
      <Image
        src={artist.image}
        alt={artist.name}
        fill
        sizes={sizes}
        style={{
          objectFit: artist.imageFit,
          objectPosition: artist.imageFit ? "top" : undefined,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
        className={`object-cover transition-transform duration-700 ${artist.imageFit ? "" : "group-hover:scale-110"}`}
      />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </div>
  );
}
