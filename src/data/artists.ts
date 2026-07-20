export type Artist = {
  slug: string;
  name: string;
  genre: string;
  shortBio: string;
  fullBio: string[];
  website: string;
  image: string;
  highlights?: string[];
  basedIn?: string;
  founded?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
};

export const artists: Artist[] = [
  {
    slug: "adoration-quartet",
    name: "Adoration Quartet",
    genre: "Southern Gospel",
    shortBio: "A spirit-filled vocal group from Goldsboro, NC, spreading the message of Christ through powerful four-part harmonies since 2001.",
    fullBio: [
      "Adoration Quartet is a spirit-filled Christian vocal group based in Goldsboro, North Carolina. Founded in 2001 by Chris Serlick after his active-duty military service, the group is dedicated to spreading the message of Jesus Christ and seeing the lost saved through powerful four-part harmonies and heart-stirring performances.",
      "The group features Chris Serlick (Owner/Manager and Bass vocalist), Derrick Boyd (Tenor), Corey Wilson (Lead, a Liberty University graduate and former pastor), and Jeff Barker (Baritone). They travel regionally, ministering at churches, revivals, and gospel concerts.",
      "Their discography includes the acclaimed album Leave the Light On (2022), along with fan favorites like \"Mercy Made a Way,\" \"That's Enough for Me,\" and \"Just Keep Your Eyes on Jesus.\"",
    ],
    website: "https://adorationquartet.com",
    image: "/images/artists/adoration-quartet.jpg",
    basedIn: "Goldsboro, North Carolina",
    founded: "2001",
    highlights: ["Four-part harmonies", "Founded 2001", "Regional touring ministry"],
    social: {
      facebook: "https://www.facebook.com/adorationqt",
      instagram: "https://instagram.com/adoration_qt",
      youtube: "https://www.youtube.com/user/adorationqt",
    },
  },
  {
    slug: "adams-voice",
    name: "Adam's Voice",
    genre: "Southern Gospel · Christian Country",
    shortBio: "A family Christian recording and ministry team from Nashville, ministering together since 1997.",
    fullBio: [
      "Adam's Voice is a family Christian recording and ministry team led by the husband-and-wife duo David and Charlene Adams. Originally from New Castle, Indiana, and now operating as Nashville Christian Recording Artists, they have been ministering together since 1997.",
      "Their primary mission is to glorify Jesus Christ and guide audiences to a personal, life-changing encounter with a loving Savior. Over time, their four children, Emma, twins Johnny and Anna, and Luke, joined the group, transitioning them into a touring family band.",
      "They have released 9 studio albums and a book by Charlene Adams titled Brazen Bravery, sharing their family's journey of faith and ministry.",
    ],
    website: "https://adamsvoice.net",
    image: "/images/artists/adams-voice.jpg",
    basedIn: "Nashville, Tennessee",
    founded: "1997",
    highlights: ["Family ministry", "9 studio albums", "Touring since 1997"],
    social: {
      facebook: "https://www.facebook.com/adamsvoicemusic",
      youtube: "https://www.youtube.com/channel/UCBNC3TFXqRZ3Yij5nKKbnoA",
    },
  },
  {
    slug: "common-bond-quartet",
    name: "Common Bond Quartet",
    genre: "Southern Gospel",
    shortBio: "A nationally recognized male Southern Gospel group from Kentucky, carrying the Gospel to the highways and hedges since 2009.",
    fullBio: [
      "Common Bond Quartet is a nationally recognized male Southern Gospel group based near Ashland and Lexington, Kentucky. Formed in 2009 by four friends with a deep love for quartet music, the ministry focuses on carrying the Gospel to the \"highways and hedges.\"",
      "The group features Rick Melton (Owner, Manager, and Lead), Karen Tate Melton (Alto/Piano and Booking Coordinator), Ken King (Baritone, a retired US Army veteran), Scott Burnside (Bass), and Jason Morris (Tenor). They deliver a signature sound using tight harmonies, personal testimonies, and a versatile, spirit-led stage presence.",
      "The group was formed from the merger of two local church quartets, \"One Bond\" and \"Commissioned\", both short on members but united under God's guidance to create something greater together.",
    ],
    website: "https://commonbondquartet.com",
    image: "/images/artists/common-bond-quartet.jpg",
    basedIn: "Ashland, Kentucky",
    founded: "2009",
    highlights: ["Tight harmonies", "Personal testimonies", "National touring"],
    social: {
      facebook: "https://www.facebook.com/commonbondquartet",
      youtube: "https://www.youtube.com/channel/UCvRSRch7Yb5fPA9RQM5O79g",
    },
  },
  {
    slug: "daryl-mosley",
    name: "Daryl Mosley",
    genre: "Bluegrass Gospel",
    shortBio: "A 4-time Songwriter of the Year with over twenty #1 songs, blending warm southern baritone with picturesque storytelling.",
    fullBio: [
      "Daryl Mosley is a highly acclaimed singer, songwriter, and storyteller from Waverly, Tennessee. For over three decades, his warm southern baritone, laid-back conversational style, and picturesque songwriting have captured the hearts of music lovers worldwide. He writes about what he knows best: small towns, rural churches, family, and his deep-seated Christian faith.",
      "He is a 4-time industry Songwriter of the Year, with over twenty #1 songs and three Song of the Year awards. His albums have ranked in the Top 10 on the Billboard charts, and he has been nominated for multiple SPBGMA awards. He is also a veteran of the Grand Ole Opry.",
      "His career spans decades, from the regional gospel group \"Daybreak\" in 1986, to the celebrated bluegrass gospel group \"New Tradition\" in 1989, the legendary Osborne Brothers in 2001, and co-founding the highly awarded band \"The Farm Hands\" in 2010. In 2020, he launched a successful solo career with Pinecastle Records.",
      "His famous song \"(Ask The Blind Man) He Saw It All\" was a massive #1 hit for the Booth Brothers and is widely considered one of the top Southern Gospel songs of all time.",
    ],
    website: "https://darylmosley.com",
    image: "/images/artists/daryl-mosley.jpg",
    basedIn: "Waverly, Tennessee",
    founded: "1986",
    highlights: ["4-time Songwriter of the Year", "20+ #1 songs", "Grand Ole Opry veteran"],
    social: {
      facebook: "https://www.facebook.com/darylmosleymusic",
      youtube: "https://www.youtube.com/channel/UCO4WSbqDaYUzKH4uBc4AZDw",
    },
  },
  {
    slug: "gloryway-music",
    name: "Gloryway",
    genre: "Southern Gospel",
    shortBio: "A dynamic, nationally known Southern Gospel trio with blues-influenced vocals and high-energy stage presence since 2002.",
    fullBio: [
      "Gloryway is a dynamic, nationally known Southern Gospel trio founded in Mansfield, Ohio in 2002. Known for their powerful, blues-influenced vocals and high-energy stage presence, they travel the country tirelessly sharing the Gospel.",
      "The group features Justin Crank (Founder, Lead Singer, and Manager), Jerry Green (Baritone, from Hillsboro, Ohio), and Bryan Potteiger (Tenor). Their performances feature a unique blend of tight four-part style harmony delivered with spirit-filled enthusiasm.",
      "They have been nominated for fan favorite group at the Absolutely Gospel Music Awards and are frequently featured in Singing News magazine. Popular songs include \"God You're Amazing\" and \"World of Peace.\"",
    ],
    website: "https://glorywaymusic.com",
    image: "/images/artists/gloryway-music.jpg",
    basedIn: "Mansfield, Ohio",
    founded: "2002",
    highlights: ["Blues-influenced vocals", "High-energy stage presence", "National touring"],
    social: {
      facebook: "https://www.facebook.com/1532800730328266",
      youtube: "https://www.youtube.com/channel/UC1oHzOJHVNlfwx20M-dqsbQ",
    },
  },
  {
    slug: "sacred-harmony",
    name: "Sacred Harmony",
    genre: "Progressive Southern Gospel",
    shortBio: "An award-winning progressive Christian trio from Tennessee, blending traditional Southern Gospel with modern worship since 2000.",
    fullBio: [
      "Sacred Harmony is an award-winning progressive Christian music trio based in Elizabethton, Tennessee. Established in 2000, the group has developed a distinctive, progressive sound that blends traditional Southern Gospel with modern worship elements.",
      "The group features Janet Weaver (Owner, Founding Member, high tenor/alto), Melissa Evans (Soprano/Lead), and John Arnett (Baritone). Janet's brother, Wayne Little, was a tenor for the legendary Blackwood Brothers Quartet for over 20 years, connecting the group to a deep Southern Gospel legacy.",
      "They are SGMScoops Diamond Award Winners (Horizon Trio) with numerous hits in the Singing News Radio Top 40, including \"Grave Clothes,\" \"My Surrender,\" \"Worship My Way Home,\" and their 2026 radio release \"In His Eyes.\" They are also proud mission partners with Deaf Child Hope, a ministry supporting deaf children around the world.",
    ],
    website: "https://sacredharmony1.com",
    image: "/images/artists/sacred-harmony.png",
    basedIn: "Elizabethton, Tennessee",
    founded: "2000",
    highlights: ["Diamond Award Winners", "Singing News Top 40 hits", "Deaf Child Hope partners"],
    social: {
      facebook: "https://www.facebook.com/sacredharmonymusicministry",
      youtube: "https://www.youtube.com/user/sacredharmony11",
    },
  },
  {
    slug: "southern-plainsmen",
    name: "Southern Plainsmen",
    genre: "Southern Gospel",
    shortBio: "Louisiana's Ambassadors of Goodwill, carrying the message of Christ with traditional four-part harmony since 1978.",
    fullBio: [
      "The Southern Plainsmen Quartet is an acclaimed Southern Gospel ministry based in Hornbeck, Louisiana. Originally formed in 1978, the group has traveled millions of miles across the country, sharing the message of Christ with their trademark style of traditional four-part gospel harmony.",
      "The group features Marcelle Slaughter (Owner, Manager, Tenor, MC, the sole remaining founding member), Robert Jackson (Lead), Tim Thomas (Baritone, Bass Guitar, Sound, an ordained Baptist minister), and Jeff Bordelon (Bass).",
      "In 1998, they were officially appointed \"Louisiana's Ambassadors of Goodwill\" by Governor Mike Foster. In 2012, the group members were honored by being commissioned as Kentucky Colonels. They have been recognized by the Southern Texas Gospel Music Association for their ministry contributions.",
    ],
    website: "https://southernplainsmen.com",
    image: "/images/artists/southern-plainsmen.jpg",
    basedIn: "Hornbeck, Louisiana",
    founded: "1978",
    highlights: ["Louisiana's Ambassadors of Goodwill", "Traditional four-part harmony", "Touring since 1978"],
    social: {
      facebook: "https://www.facebook.com/pages/The-Southern-Plainsmen-Quartet/1341085952691733",
    },
  },
  {
    slug: "westward-road",
    name: "Westward Road",
    genre: "Southern Gospel · Modern Worship",
    shortBio: "A dynamic family gospel trio blending modern worship with country and Southern Gospel, with a Dove Award-considered single.",
    fullBio: [
      "Westward Road is a dynamic family gospel trio based in Pendleton, Indiana. Led by veteran worship leader Scott Roberts and his wife Kelli, the group blends modern worship elements with traditional country and Southern Gospel styles.",
      "The group features Scott Roberts (Lead/Tenor, Songwriter, and 20-year veteran worship leader), Kelli Roberts (Soprano), and Garrett Roberts (Baritone, their son). Their mission is to provide an uplifting, family-friendly ministry that shares a powerful message of hope and joy.",
      "Their single \"Love One Another\" was placed in consideration for a prestigious GMA Dove Award. Their music has been featured on the Singing News Radio Cafe and Chapel Valley network. Notable albums include City of Light (2023) and Love Has Won (2023), with hit singles like \"Jesus Can.\"",
    ],
    website: "https://westwardroad.com",
    image: "/images/artists/westward-road.png",
    basedIn: "Pendleton, Indiana",
    founded: "Family ministry",
    highlights: ["Dove Award consideration", "Modern worship blend", "Family trio"],
    social: {
      facebook: "https://www.facebook.com/westwardroadmusic",
      instagram: "https://www.instagram.com/westwardroadmusic",
      youtube: "https://www.youtube.com/@westwardroadmusic",
    },
  },
];

export const getArtistBySlug = (slug: string): Artist | undefined => {
  return artists.find((artist) => artist.slug === slug);
};
