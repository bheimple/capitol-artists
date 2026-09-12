import { artists, type Artist } from "@/data/artists";

const artistPageDetails: Record<string, { description: string; relatedSlugs: string[] }> = {
  "adoration-quartet": {
    description: "Ask about booking Adoration Quartet's Southern Gospel ministry for your church. Share your location and dates with Mike at Capitol Artists.",
    relatedSlugs: ["common-bond-quartet", "southern-plainsmen", "gloryway-music", "daryl-mosley"],
  },
  "adams-voice": {
    description: "Explore Adam's Voice and their Southern Gospel and Christian Country music. Ask Mike at Capitol Artists about booking a visit to your church.",
    relatedSlugs: ["westward-road", "sacred-harmony", "gloryway-music", "daryl-mosley"],
  },
  "common-bond-quartet": {
    description: "Interested in hosting Common Bond Quartet? Ask Capitol Artists about booking their Southern Gospel ministry and share your church's location and dates.",
    relatedSlugs: ["adoration-quartet", "southern-plainsmen", "westward-road", "gloryway-music"],
  },
  "daryl-mosley": {
    description: "Ask about booking Daryl Mosley for a Bluegrass Gospel concert at your church. Mike at Capitol Artists can check travel routes and availability.",
    relatedSlugs: ["adams-voice", "southern-plainsmen", "westward-road", "adoration-quartet"],
  },
  "gloryway-music": {
    description: "Explore Gloryway's Southern Gospel ministry and ask Mike at Capitol Artists about booking a visit. Share your church location and any dates you have in mind.",
    relatedSlugs: ["sacred-harmony", "westward-road", "common-bond-quartet", "adoration-quartet"],
  },
  "sacred-harmony": {
    description: "Ask about booking Sacred Harmony's Progressive Southern Gospel ministry for your church. Talk with Mike at Capitol Artists about dates and travel.",
    relatedSlugs: ["gloryway-music", "westward-road", "adams-voice", "southern-plainsmen"],
  },
  "southern-plainsmen": {
    description: "Ask about booking Southern Plainsmen's Southern Gospel ministry for your church. Share your location and dates so Mike can look at routes and availability.",
    relatedSlugs: ["adoration-quartet", "common-bond-quartet", "adams-voice", "daryl-mosley"],
  },
  "westward-road": {
    description: "Explore Westward Road's Southern Gospel and Modern Worship music. Ask Mike at Capitol Artists about booking a visit to your church and share your preferred dates.",
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
