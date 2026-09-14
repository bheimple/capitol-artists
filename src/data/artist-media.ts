export type ArtistMedia = {
  videoId: string;
  title: string;
  format: "Music video" | "Live performance" | "Audio";
  sourceUrl: string;
};

export const artistMedia: Record<string, ArtistMedia> = {
  "adoration-quartet": {
    videoId: "pDmDkEOzrRI",
    title: "Leave The Light On",
    format: "Music video",
    sourceUrl: "https://adorationquartet.com/",
  },
  "adams-voice": {
    videoId: "-6IE4r6czp4",
    title: "This Family Prays",
    format: "Audio",
    sourceUrl: "https://www.youtube.com/channel/UCBNC3TFXqRZ3Yij5nKKbnoA",
  },
  "common-bond-quartet": {
    videoId: "yeMPo0IK2Lg",
    title: "I've Been Through a Breakthrough",
    format: "Music video",
    sourceUrl: "https://commonbondquartet.com/videos",
  },
  "daryl-mosley": {
    videoId: "JvtK0FeIa7Y",
    title: "Mamas Bible",
    format: "Music video",
    sourceUrl: "https://darylmosley.com/music",
  },
  "gloryway-music": {
    videoId: "bPglBC6pqBE",
    title: "God Loves Them All",
    format: "Music video",
    sourceUrl: "https://glorywaymusic.com/",
  },
  "sacred-harmony": {
    videoId: "jR5x6mTlQ1M",
    title: "In His Eyes — Lyric Video",
    format: "Music video",
    sourceUrl: "https://sacredharmony1.com/videos",
  },
  "southern-plainsmen": {
    videoId: "EQE4kUGjBhU",
    title: "The Cross was His Own",
    format: "Live performance",
    sourceUrl: "https://www.southernplainsmen.com/new-gallery",
  },
  "westward-road": {
    videoId: "4YIw1oS4KeI",
    title: "Love One Another",
    format: "Music video",
    sourceUrl: "https://westwardroad.com/",
  },
};
