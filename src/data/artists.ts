export type Artist = {
  slug: string;
  name: string;
  genre: string;
  shortBio: string;
  fullBio: string[];
  website: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageFit?: "contain";
  highlights?: string[];
  basedIn?: string;
  founded?: string;
  sources?: { label: string; url: string }[];
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
    shortBio: "A Southern Gospel quartet from Goldsboro, North Carolina, sharing songs of faith through four-part harmony.",
    fullBio: [
      "Adoration Quartet brings Southern Gospel harmony to churches and concert audiences. Based in Goldsboro, North Carolina, the group shares the Christian message through songs about salvation, grace, and hope.",
      "The quartet features Chris Serlick on bass, Derrick Boyd on tenor, Corey Wilson on lead, and Jeff Barker on baritone. Chris joined Adoration after retiring from the U.S. Air Force in 2001. Corey brings experience as a pastor, while Derrick and Jeff have served in other gospel music ministries.",
      "Their recordings include Leave the Light On, with songs such as \"We've Got a Song to Sing,\" \"Mercy Made a Way,\" and \"Just Keep Your Eyes on Jesus.\" The album also includes familiar hymns, giving listeners a mix of newer gospel songs and music they may already know from church.",
    ],
    website: "https://adorationquartet.com",
    image: "/images/artists/adoration-quartet-2026.jpg",
    imageWidth: 3000,
    imageHeight: 2400,
    imageFit: "contain",
    basedIn: "Goldsboro, North Carolina",
    highlights: ["Four-part harmony", "Gospel songs and hymns", "Regional church ministry"],
    sources: [{ label: "Official biography and music", url: "https://adorationquartet.com/home" }],
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
    shortBio: "David and Charlene Adams and their children share hymns, original songs, and family harmonies in a ministry that began in 1997.",
    fullBio: [
      "Adam's Voice is a Christian family music ministry led by David and Charlene Adams. They began ministering together in 1997 and perform with their children Emma, Johnny, Anna, and Luke. Their booking office is in New Castle, Indiana.",
      "Their concerts combine familiar hymns with original music shaped by scripture and the family's experiences. Charlene writes songs and sings, while David sings lead and tenor and directs worship. Their aim is to encourage people who already follow Christ and introduce others to Him.",
      "The family has released eleven albums and has participated in Gaither Homecoming events. Charlene is also the author of Brazen Bravery. Their music draws on several styles, giving churches a program that connects family harmony, personal testimony, and worship.",
    ],
    website: "https://adamsvoice.net",
    image: "/images/artists/adams-voice-2026.png",
    imageWidth: 1111,
    imageHeight: 1415,
    imageFit: "contain",
    founded: "1997",
    highlights: ["Family ministry", "Hymns and original songs", "Ministering since 1997"],
    sources: [
      { label: "Official biography", url: "https://www.adamsvoice.net/about-adams-voice/" },
      { label: "Artist website", url: "https://www.adamsvoice.net/" },
    ],
    social: {
      facebook: "https://www.facebook.com/adamsvoice",
      instagram: "https://www.instagram.com/adamsvoicemusic/",
      youtube: "https://www.youtube.com/channel/UCBNC3TFXqRZ3Yij5nKKbnoA",
    },
  },
  {
    slug: "common-bond-quartet",
    name: "Common Bond Quartet",
    genre: "Southern Gospel",
    shortBio: "A Kentucky Southern Gospel quartet sharing songs, testimony, and a love for church ministry since 2009.",
    fullBio: [
      "Common Bond Quartet is a Southern Gospel group based near Ashland, Kentucky. The ministry began in 2009 when singers from two local church quartets, One Bond and Commissioned, came together to continue sharing the Gospel through music.",
      "Rick Melton sings lead, Jason Morris sings tenor, Ken King sings baritone, and Scott Burnside sings bass. Karen Tate Melton contributes piano and alto vocals and coordinates bookings. Their program combines quartet singing with testimony, encouragement, and humor.",
      "The group's roots in local churches still shape its purpose: encouraging believers and sharing the message of Jesus with people hearing it for the first time. Common Bond selects songs for their Christian message and delivers them with clear lyrics and blended harmonies.",
    ],
    website: "https://commonbondquartet.com",
    image: "/images/artists/common-bond-quartet-2025.jpg",
    imageWidth: 1440,
    imageHeight: 1440,
    imageFit: "contain",
    basedIn: "Ashland, Kentucky",
    founded: "2009",
    highlights: ["Southern Gospel quartet", "Personal testimony", "Church ministry since 2009"],
    sources: [
      { label: "Official member biographies", url: "https://commonbondquartet.com/about-us" },
      { label: "Official press kit", url: "https://commonbondquartet.com/press-kit" },
    ],
    social: {
      facebook: "https://www.facebook.com/commonbondquartet",
      youtube: "https://www.youtube.com/@CommonBondQuartet",
    },
  },
  {
    slug: "daryl-mosley",
    name: "Daryl Mosley",
    genre: "Bluegrass Gospel",
    shortBio: "The writer of \"He Saw It All\" shares gospel songs and stories drawn from faith, family, and small-town life.",
    fullBio: [
      "Daryl Mosley is a singer, songwriter, and storyteller from Waverly, Tennessee. His songs draw on rural churches, family relationships, everyday work, and Christian faith. A conversational singing style gives his performances the feel of hearing a story from someone you know.",
      "Southern Gospel listeners may know his song \"He Saw It All,\" recorded by the Booth Brothers. His own recordings include \"Mama's Bible,\" \"Big God,\" and \"The Bible in the Drawer.\" He has received Songwriter of the Year honors in 2016, 2017, 2023, and 2025, and has performed at the Grand Ole Opry.",
      "Before his solo recording career, Daryl sang and played bass with New Tradition, worked with the Osborne Brothers, and helped form The Farm Hands. He released his first solo album, The Secret of Life, with Pinecastle Records in 2020. Capitol Artists welcomes inquiries about his gospel music ministry for churches.",
    ],
    website: "https://darylmosley.com",
    image: "/images/artists/daryl-mosley.webp",
    imageWidth: 1200,
    imageHeight: 892,
    basedIn: "Waverly, Tennessee",
    highlights: ["Gospel songs and storytelling", "Writer of He Saw It All", "Grand Ole Opry performances"],
    sources: [
      { label: "Official biography", url: "https://darylmosley.com/about" },
      { label: "Awards and song credits", url: "https://darylmosley.com/awards-and-press" },
    ],
    social: {
      facebook: "https://www.facebook.com/darylmosleymusic",
      youtube: "https://www.youtube.com/channel/UCO4WSbqDaYUzKH4uBc4AZDw",
    },
  },
  {
    slug: "gloryway-music",
    name: "Gloryway",
    genre: "Southern Gospel",
    shortBio: "An Ohio Southern Gospel trio combining blues-influenced vocals, close harmony, and an energetic ministry presentation.",
    fullBio: [
      "Gloryway is a Southern Gospel trio founded by Justin Crank in Mansfield, Ohio, in 2002. The group combines harmony singing with encouragement and humor as it shares the Christian message in concerts and church settings.",
      "Justin's blues-influenced lead vocals are joined by Jerry Green on baritone and Bryan Potteiger on tenor. Their three voices give the group a sound that connects Southern Gospel harmony with a lively vocal delivery.",
      "The group's featured recordings include \"God Loves Them All\" and \"The God Who Never Leaves.\" Its ministry centers on sharing God's love and offering encouragement through song, with music that gives congregations an opportunity to listen, worship, and reflect.",
    ],
    website: "https://glorywaymusic.com",
    image: "/images/artists/gloryway-music-2025.jpg",
    imageWidth: 659,
    imageHeight: 425,
    imageFit: "contain",
    basedIn: "Mansfield, Ohio",
    founded: "2002",
    highlights: ["Blues-influenced vocals", "Southern Gospel trio", "Ministry since 2002"],
    sources: [
      { label: "Official group biography", url: "https://glorywaymusic.com/group-bio" },
      { label: "Meet the group", url: "https://glorywaymusic.com/meet-the-group" },
    ],
    social: {
      facebook: "https://www.facebook.com/1532800730328266",
      youtube: "https://www.youtube.com/channel/UC1oHzOJHVNlfwx20M-dqsbQ",
    },
  },
  {
    slug: "sacred-harmony",
    name: "Sacred Harmony",
    genre: "Progressive Southern Gospel",
    shortBio: "A Tennessee Christian trio bringing Southern Gospel harmonies, personal testimony, and worship to churches since 2000.",
    fullBio: [
      "Sacred Harmony is a Christian music trio from Tennessee, founded by Janet Weaver in 2000. Its progressive Southern Gospel style brings together harmony, personal testimony, and worship. The group has ministered in small country churches as well as theaters and larger event settings.",
      "Janet Weaver, Melissa Evans, and John Arnett make up the trio. Their shared purpose is to communicate the hope of the Gospel and encourage people in their faith. The ministry also partners with Deaf Child Hope, which supports deaf children.",
      "Sacred Harmony received the Sunrise Trio of the Year award at the 2017 SGN Scoops Diamond Awards. Its recordings include \"Grave Clothes,\" \"My Surrender,\" and \"Worship My Way Home,\" with \"In His Eyes\" released to radio in 2026.",
    ],
    website: "https://sacredharmony1.com",
    image: "/images/artists/sacred-harmony-2026.jpg",
    imageWidth: 528,
    imageHeight: 682,
    imageFit: "contain",
    basedIn: "Tennessee",
    founded: "2000",
    highlights: ["Progressive Southern Gospel", "2017 Sunrise Trio award", "Deaf Child Hope partners"],
    sources: [
      { label: "Official biography", url: "https://sacredharmony1.com/bio-our-story" },
      { label: "Music recognitions", url: "https://sacredharmony1.com/music-recognitions" },
    ],
    social: {
      facebook: "https://www.facebook.com/sacredharmonymusicministry",
      youtube: "https://www.youtube.com/user/sacredharmony11",
    },
  },
  {
    slug: "southern-plainsmen",
    name: "Southern Plainsmen",
    genre: "Southern Gospel",
    shortBio: "A Louisiana gospel ministry sharing traditional quartet harmony and Christian witness with churches since 1978.",
    fullBio: [
      "The Southern Plainsmen Quartet began in west-central Louisiana in May 1978. Led by founding member Marcelle Slaughter of Hornbeck, the ministry shares the Gospel through traditional quartet music and Christian witness in churches of different denominations.",
      "Marcelle sings tenor and serves as the group's owner and manager. Robert Jackson and Jeremy Glass share lead singing duties; Jeremy also plays piano. Tim Thomas sings baritone and plays bass guitar, and Jeff Bordelon sings bass. This five-member team carries on the group's four-part harmony tradition.",
      "Governor Mike Foster appointed the group Louisiana's Ambassadors of Goodwill in 1998, a distinction renewed in 2008 and 2018. Their recordings include Redeemed and A Southern Plainsmen Christmas: From the Heart. Church ministry remains central to their work, with travel arrangements considered as part of each concert inquiry.",
    ],
    website: "https://southernplainsmen.com",
    image: "/images/artists/southern-plainsmen-2026.jpg",
    imageWidth: 494,
    imageHeight: 377,
    imageFit: "contain",
    basedIn: "Hornbeck, Louisiana",
    founded: "1978",
    highlights: ["Louisiana's Ambassadors of Goodwill", "Traditional four-part harmony", "Touring since 1978"],
    sources: [{ label: "Official history and member biographies", url: "https://www.southernplainsmen.com/about-us" }],
    social: {
      facebook: "https://www.facebook.com/southernplainsmen",
      youtube: "https://www.youtube.com/@spqsouthernplainsmenquarte153",
    },
  },
  {
    slug: "westward-road",
    name: "Westward Road",
    genre: "Southern Gospel · Modern Worship",
    shortBio: "Scott, Kelli, and Garrett Roberts bring family harmonies and a blend of gospel and modern worship to church audiences.",
    fullBio: [
      "Westward Road is a family gospel trio made up of Scott and Kelli Roberts and their son Garrett. Their music combines gospel harmony with modern worship, drawing on Scott's experience as a worship leader and songwriter.",
      "The family has performed in rural churches, theaters, festivals, and fairs. Their concerts focus on Christian hope and trusting God, with an energetic style and family harmonies that invite congregations to worship together.",
      "Their album JOY is featured on the group's official website, alongside performance videos and earlier music. Churches exploring a visit can listen to the group's sound and share their location and possible dates with Capitol Artists so that ministry fit and travel availability can be discussed.",
    ],
    website: "https://westwardroad.com",
    image: "/images/artists/westward-road-yellow.png",
    imageWidth: 1254,
    imageHeight: 1254,
    imageFit: "contain",
    highlights: ["Gospel and modern worship", "Family harmonies", "Scott, Kelli, and Garrett Roberts"],
    sources: [{ label: "Official biography and music", url: "https://westwardroad.com/#about" }],
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
