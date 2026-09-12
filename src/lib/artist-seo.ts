import { artists, type Artist } from "@/data/artists";

const artistPageDetails: Record<string, { description: string; relatedSlugs: string[] }> = {
  "adoration-quartet": {
    description: "Book Adoration Quartet for a Southern Gospel church concert. Read the artist profile and contact Capitol Artists about dates and booking for your church.",
    relatedSlugs: ["common-bond-quartet", "southern-plainsmen", "gloryway-music", "daryl-mosley"],
  },
  "adams-voice": {
    description: "Bring Adam's Voice to your church for Southern Gospel and Christian Country music. Explore the artist profile and ask Capitol Artists about concert booking.",
    relatedSlugs: ["westward-road", "sacred-harmony", "gloryway-music", "daryl-mosley"],
  },
  "common-bond-quartet": {
    description: "Plan a Southern Gospel church concert with Common Bond Quartet. Find artist information and send your concert booking inquiry to Capitol Artists.",
    relatedSlugs: ["adoration-quartet", "southern-plainsmen", "westward-road", "gloryway-music"],
  },
  "daryl-mosley": {
    description: "Book Daryl Mosley for a Bluegrass Gospel concert at your church. Read his artist profile and contact Capitol Artists with your church concert details.",
    relatedSlugs: ["adams-voice", "southern-plainsmen", "westward-road", "adoration-quartet"],
  },
  "gloryway-music": {
    description: "Explore Gloryway's Southern Gospel music for your next church concert. Read the artist profile and ask Capitol Artists about booking Gloryway for your church.",
    relatedSlugs: ["sacred-harmony", "westward-road", "common-bond-quartet", "adoration-quartet"],
  },
  "sacred-harmony": {
    description: "Bring Sacred Harmony's Progressive Southern Gospel music to your church. View the artist profile and contact Capitol Artists to discuss a concert booking.",
    relatedSlugs: ["gloryway-music", "westward-road", "adams-voice", "southern-plainsmen"],
  },
  "southern-plainsmen": {
    description: "Book Southern Plainsmen for a Southern Gospel concert at your church. Explore the artist profile and share your dates with Capitol Artists to discuss booking.",
    relatedSlugs: ["adoration-quartet", "common-bond-quartet", "adams-voice", "daryl-mosley"],
  },
  "westward-road": {
    description: "Explore Westward Road's Southern Gospel and Modern Worship music for your church. Contact Capitol Artists with dates and details for a church concert booking.",
    relatedSlugs: ["adams-voice", "sacred-harmony", "gloryway-music", "daryl-mosley"],
  },
};

export function getArtistPageDetails(artist: Artist) {
  const details = artistPageDetails[artist.slug];

  return {
    title: `${artist.name} Church Concert Booking`,
    description: details.description,
    // Start with shared quartet, trio, family or gospel styles, then offer
    // other roster formats. Every artist appears on at least three pages.
    relatedArtists: details.relatedSlugs
      .map((slug) => artists.find((related) => related.slug === slug))
      .filter((related): related is Artist => related !== undefined),
  };
}
