import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { artists } from "@/data/artists";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return artists.map(({ slug }) => ({ slug }));
}

export default async function ArtistShareImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = artists.find((entry) => entry.slug === slug);
  if (!artist) return new Response("Artist not found", { status: 404 });

  // Satori needs PNG/JPEG; fit the complete approved photo inside the card.
  const [photo, logo] = await Promise.all([
    sharp(join(process.cwd(), "public", artist.image))
      .resize({ width: 610, height: 550, fit: "inside" })
      .png()
      .toBuffer({ resolveWithObject: true }),
    readFile(join(process.cwd(), "public/brand/capitol-cross.png")),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#062653", color: "#ffffff", fontFamily: "sans-serif", borderBottom: "12px solid #d3aa4b" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 510, padding: "46px 36px 42px 44px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#eed9a7", fontSize: 27 }}>
            {/* Native images are required by ImageResponse's rendering engine. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={50} height={60} style={{ objectFit: "contain", background: "#fffaf0", padding: 6, borderRadius: 6 }} />
            <span>CAPITOL ARTISTS</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: artist.name.length > 20 ? 55 : 62, fontWeight: 700, lineHeight: 1.08, marginBottom: 22 }}>{artist.name}</div>
            <div style={{ display: "flex", fontSize: 25, lineHeight: 1.35, color: "#eed9a7" }}>{artist.genre}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", fontSize: 25, fontWeight: 700 }}>Church concert booking</div>
            <div style={{ display: "flex", fontSize: 21, color: "#d0dbea" }}>capitol-artists.com</div>
          </div>
        </div>
        <div style={{ display: "flex", width: 690, padding: "34px 40px", alignItems: "center", justifyContent: "center", background: "#f6f1e7" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${photo.data.toString("base64")}`} alt={artist.name} width={photo.info.width} height={photo.info.height} />
        </div>
      </div>
    ),
    size,
  );
}
